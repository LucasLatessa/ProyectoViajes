from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r"Viaje",views.ViajeView)
router.register(r"Postulacion",views.PostulacionView, "postulacion")
urlpatterns = [
    path('', include(router.urls)),
    path('Viaje/create', views.create, name='create'),
    path('Viaje/postularse', views.postularse_viaje, name='postularse_viaje'),
    path('Viaje/viajes_por_organizador/<str:nickname>/', views.viajes_por_organizador, name='viajes-por-organizador'),
    path('Viaje/postulaciones_por_viaje/<int:viaje_id>/', views.postulaciones_por_viaje, name='postulaciones_por_viaje'),
    path('Viaje/cambiar_estado_postu/<int:postu_id>/', views.cambiar_estado_postu, name='cambiar_estado_postu'),
]