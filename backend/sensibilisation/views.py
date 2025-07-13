from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, RetrieveAPIView
from .models import Sensibilisation
from .serializers import SensibilisationSerializer

class ArticleListAPIView(APIView):
    def get(self, request):
        articles = Sensibilisation.objects.filter(type='article').order_by('-date_publication')
        serializer = SensibilisationSerializer(articles, many=True)
        return Response(serializer.data)

class ArticleDetailView(RetrieveAPIView):
    queryset = Sensibilisation.objects.filter(type='article')
    serializer_class = SensibilisationSerializer
