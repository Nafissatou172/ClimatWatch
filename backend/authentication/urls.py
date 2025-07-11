from django.urls import path
from .views import (
    MyTokenObtainPairView,
    RegisterView,
    UserListView,
    UserDetailView,
    UserStatsView,
    DeleteUserView,
    AdminCreateUserView
)

urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('users/', UserListView.as_view(), name='user-list'),
    path('users/<pk>/', UserDetailView.as_view(), name='user-detail'),
    path('users/me/', UserDetailView.as_view(), {'pk': 'me'}, name='user-me'),
    path('admin/user-stats/', UserStatsView.as_view(), name='user-stats'),
    path('delete-user/<int:pk>/', DeleteUserView.as_view(), name='delete-user'),
    path('create-user-byadmin/', AdminCreateUserView.as_view(), name='create_user'),
]
