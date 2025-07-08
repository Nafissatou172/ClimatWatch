from django.urls import path
from .views import (
    MyTokenObtainPairView,
    RegisterView,
    UserListView,
    UserDetailView
)

urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('users/', UserListView.as_view(), name='user-list'),
    path('users/<pk>/', UserDetailView.as_view(), name='user-detail'),
    path('users/me/', UserDetailView.as_view(), {'pk': 'me'}, name='user-me'),
]