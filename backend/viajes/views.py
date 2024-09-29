from django.shortcuts import render
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets
from rest_framework.decorators import api_view
from django.utils.timezone import localtime
from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from django.core.mail import send_mail
from django.conf import settings
from datetime import datetime
import pytz
from zoneinfo import ZoneInfo
from .serializer import ViajeSerializer, PostulacionSerializer
from .models import Viaje, Usuario, Postulacion


# Create your views here.
class ViajeView(viewsets.ModelViewSet):
    serializer_class = ViajeSerializer
    queryset = Viaje.objects.all()
class PostulacionView(viewsets.ModelViewSet):
    serializer_class = PostulacionSerializer
    queryset = Postulacion.objects.all()

@csrf_exempt
@api_view(['POST'])
def create(request):
    try:
        data = json.loads(request.body.decode('utf-8'))
        
        # Buscar y validar los datos necesarios
        # Por ejemplo:
        fecha_hora = data.get('fecha_hora')
        if not fecha_hora:
            return JsonResponse({'error': 'El campo fecha_hora es requerido'}, status=400)
        
        # Aquí se realizaría la creación del objeto Viaje con los datos recibidos
        nuevo_viaje = Viaje.objects.create(
            fecha_hora=fecha_hora,
            asientos_disponibles=data.get('asientos_disponibles', 0),
            costo_por_asiento=data.get('costo_por_asiento', 0.0),
            descripcion=data.get('descripcion', ''),
            origen_direccion=data.get('origen_direccion', ''),
            origen_latitud=data.get('origen_latitud', None),
            origen_longitud=data.get('origen_longitud', None),
            destino_direccion=data.get('destino_direccion', ''),
            destino_latitud=data.get('destino_latitud', None),
            destino_longitud=data.get('destino_longitud', None),
            organizador=Usuario.objects.get(nickname=data.get('organizador_nickname'))
        )
        
        # Devolver una respuesta JSON de éxito
        return JsonResponse({'mensaje': 'Viaje creado correctamente', 'viaje_id': nuevo_viaje.viaje_id}, status=201)
    
    except Usuario.DoesNotExist:
        return JsonResponse({'error': 'El usuario especificado no existe'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    
@csrf_exempt
@api_view(['POST'])
def postularse_viaje(request):
    try:
        data = json.loads(request.body.decode('utf-8'))
        viaje_id = data.get('viaje_id')
        nickname = data.get('nickname')

        if not viaje_id:
            return JsonResponse({'error': 'El ID del viaje es requerido'}, status=400)

        if not nickname:
            return JsonResponse({'error': 'El nickname del usuario es requerido'}, status=400)

        try:
            viaje = Viaje.objects.get(pk=viaje_id)
        except Viaje.DoesNotExist:
            return JsonResponse({'error': 'Viaje no encontrado'}, status=404)
        
        try:
            usuario = Usuario.objects.get(nickname=nickname)
        except Usuario.DoesNotExist:
            return JsonResponse({'error': 'Usuario no encontrado'}, status=404)

        postulacion = Postulacion.objects.create(
            viaje=viaje,
            usuario=usuario,
            estado='pendiente'
        )

        return JsonResponse({'mensaje': 'Postulación realizada con éxito'}, status=201)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)


def viajes_por_organizador(request, nickname):
    try:
        organizador = Usuario.objects.get(nickname=nickname)
        viajes = Viaje.objects.filter(organizador=organizador)
        
        serializer = ViajeSerializer(viajes, many=True)
        return JsonResponse(serializer.data, safe=False, status=200)
    except ObjectDoesNotExist:
        return JsonResponse({'error': 'Organizador no encontrado'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

@csrf_exempt
@api_view(['PUT'])
def cambiar_estado_postu(request, postu_id):
    try:
        postulacion = get_object_or_404(Postulacion, pk=postu_id)
        
        # Obtener el viaje asociado a la postulación
        viaje = postulacion.viaje
        
        # Cambiar el estado de la postulación (por ejemplo, de 'pendiente' a 'aceptada' o 'rechazada')
        nuevo_estado = request.data.get('estado')  # Asegúrate de que 'estado' esté incluido en la solicitud POST
        
        if nuevo_estado == 'aceptada':
            # Verificar si hay asientos disponibles antes de aceptar la postulación
            if viaje.asientos_disponibles > 0:
                postulacion.estado = nuevo_estado
                postulacion.save()
                
                # Decrementar el número de asientos disponibles en el viaje
                viaje.asientos_disponibles -= 1
                viaje.save()
                # Obtener el usuario y el viaje relacionados con la postulación
                usuario = postulacion.usuario

                # Enviar el correo al usuario
                enviar_correo_postulacion_aceptada(usuario.email, usuario.nickname, viaje)
                
                return JsonResponse({'mensaje': 'Estado de postulación actualizado correctamente'}, status=200)
            else:
                return JsonResponse({'error': 'No hay asientos disponibles para aceptar más postulaciones'}, status=400)
        elif(nuevo_estado == 'rechazada' and postulacion.estado == 'aceptada'):
            postulacion.estado = nuevo_estado
            postulacion.save()
                
            # Incrementar el número de asientos disponibles en el viaje
            viaje.asientos_disponibles += 1
            viaje.save()
            return JsonResponse({'mensaje': 'Estado de postulación actualizado correctamente'}, status=200)
        else:
            postulacion.estado = nuevo_estado
            postulacion.save()
            
            return JsonResponse({'mensaje': 'Estado de postulación actualizado correctamente'}, status=200)
    
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)
    
def enviar_correo_postulacion_aceptada(usuario_email, nombre_usuario, viaje):
    asunto = 'CarShare - ¡Tu postulación ha sido aceptada!'
    fecha_hora_viaje = viaje.fecha_hora.astimezone(ZoneInfo('America/Argentina/Buenos_Aires'))

    # Formatear la fecha y hora
    fecha_formateada = fecha_hora_viaje.strftime("%d/%m/%Y %H:%M").lstrip("0").replace(" 0", " ")
    mensaje = (
    f'Hola {nombre_usuario},\n\n'
    f'Tu postulación ha sido aceptada. ¡Felicitaciones!\n\n'
    'Información del viaje:\n'
    f'Organizador: {viaje.organizador}\n'
    f'Origen: {viaje.origen_direccion}\n'
    f'Destino: {viaje.destino_direccion}\n'
    f'Fecha y hora de viaje: {fecha_formateada}\n'  # Usa la fecha formateada aquí
    f'Descripción: {viaje.descripcion}\n'
    f'Costo por asiento: ${viaje.costo_por_asiento}\n\n'
    'Si vas a viajar con alguien que no conoces, cuéntales a familiares y amigos adónde vas. '
    'Usa la función de compartir la ubicación en tiempo real directamente con un amigo o familiar '
    'durante el viaje.\n\n'
    'Atentamente, el equipo de CarShare.'
    )
    remitente = settings.DEFAULT_FROM_EMAIL
    destinatario = [usuario_email]

    send_mail(asunto, mensaje, remitente, destinatario)

def postulaciones_por_viaje(request, viaje_id):
    try:
        postulaciones = Postulacion.objects.filter(viaje_id=viaje_id)
        
        postulaciones_list = []
        for postulacion in postulaciones:
            usuario_data = {
                'usuario_id': postulacion.usuario.user_id,
                'nickname': postulacion.usuario.nickname,
                'nombre': postulacion.usuario.nombre,  # Ajusta según los campos de tu modelo Usuario
                'apellido': postulacion.usuario.apellido,  # Ajusta según los campos de tu modelo Usuario
                'email': postulacion.usuario.email,  # Ajusta según los campos de tu modelo Usuario
                # Incluir otros campos del usuario según sea necesario
            }
            
            postulacion_data = {
                'id': postulacion.postulacion_id,
                'viaje_id': postulacion.viaje.viaje_id,
                'usuario': usuario_data,
                'estado': postulacion.estado,
                'fecha_hora_postulacion': localtime(postulacion.fecha_hora_postulacion).strftime('%Y-%m-%d %H:%M:%S'),
                # Incluir otros campos de la postulación según sea necesario
            }
            
            postulaciones_list.append(postulacion_data)
        
        return JsonResponse(postulaciones_list, safe=False, status=200)
    
    except ObjectDoesNotExist:
        return JsonResponse({'error': 'No se encontraron postulaciones para el viaje especificado'}, status=404)
    
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)