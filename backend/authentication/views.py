from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer, RegisterSerializer, UserSerializer
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser

User = get_user_model()

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer

class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]

class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


class UserStatsView(APIView):
    permission_classes = [IsAdminUser]  # seul un admin peut voir ces stats 

    def get(self, request):
        total = User.objects.count()
        actifs = User.objects.filter(is_active=True).count()
        inactifs = User.objects.filter(is_active=False).count()
        admins = User.objects.filter(role="ADMIN").count()

        return Response({
            "total": total,
            "actifs": actifs,
            "inactifs": inactifs,
            "admins": admins
        })

#delete user 
class DeleteUserView(APIView):
    permission_classes = [IsAdminUser]

    def delete(self, request, pk, format=None):
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response({'error': 'Utilisateur non trouvé'}, status=status.HTTP_404_NOT_FOUND)

        user.delete()
        return Response({'message': 'Utilisateur supprimé'}, status=status.HTTP_204_NO_CONTENT)

#admin cree un user 
class AdminCreateUserView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        if request.user.role != 'ADMIN':
            return Response({"detail": "Permission refusée."}, status=status.HTTP_403_FORBIDDEN)

        data = request.data
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        role = data.get('role', 'USER')

        if not all([username, email, password]):
            return Response({"detail": "Tous les champs sont obligatoires."}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, email=email, password=password, role=role)
        return Response({"detail": "Utilisateur créé avec succès."}, status=status.HTTP_201_CREATED)