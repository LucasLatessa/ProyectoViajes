from django.urls import path, include
from rest_framework import routers
from usuarios import views

router = routers.DefaultRouter()
router.register(r"Usuario",views.UsuarioView)
urlpatterns = [
    path('', include(router.urls)),
    path('Usuario/nick/<str:nickname>/', views.get_usuario_by_nickname, name='get_usuario_by_nickname'),
]