from django.contrib import admin
from .models import Viaje, Postulacion, Lugar

@admin.register(Viaje)
class ViajeAdmin(admin.ModelAdmin):
    list_display = ('viaje_id','asientos_disponibles','costo_por_asiento', 'descripcion', 'organizador', 'origen', 'destino')
    search_fields = ('viaje_id','asientos_disponibles','costo_por_asiento', 'descripcion', 'organizador', 'origen', 'destino')

@admin.register(Postulacion)
class PostulacionAdmin(admin.ModelAdmin):
    list_display = ('usuario','estado','viaje')
    search_fields = ('usuario','estado', 'viaje')

@admin.register(Lugar)
class LugarAdmin(admin.ModelAdmin):
    list_display = ('descripcion',)
    search_fields = ('descripcion',)
