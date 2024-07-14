from django.shortcuts import render
from rest_framework import viewsets
from django.http import JsonResponse
from .serializer import UsuarioSerializer
from .models import Usuario

# Create your views here.
class UsuarioView(viewsets.ModelViewSet):
    serializer_class = UsuarioSerializer
    queryset = Usuario.objects.all()


def get_usuario_by_nickname(request, nickname):
    try:
        usuario = Usuario.objects.get(nickname=nickname)

        usuario_data = {
            'user_id': usuario.user_id,
            'nickname': usuario.nickname,
            'dni': usuario.dni,
            'nombre': usuario.nombre,
            'apellido': usuario.apellido,
            'email': usuario.email
        }
        return JsonResponse({'usuario': usuario_data})
    except Usuario.DoesNotExist:
        return JsonResponse({'error': 'Usuario no encontrado'}, status=404)
