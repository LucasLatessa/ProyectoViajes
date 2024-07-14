from django.contrib import admin
from .models import Viaje, Postulacion

@admin.register(Viaje)
class ViajeAdmin(admin.ModelAdmin):
    list_display = ('viaje_id','asientos_disponibles','costo_por_asiento', 'descripcion', 'organizador', 'origen_direccion', 'destino_direccion')
    search_fields = ('viaje_id','asientos_disponibles','costo_por_asiento', 'descripcion', 'organizador', 'origen_direccion', 'destino_direccion')

@admin.register(Postulacion)
class PostulacionAdmin(admin.ModelAdmin):
    list_display = ('usuario','estado','viaje')
    search_fields = ('usuario','estado', 'viaje')
