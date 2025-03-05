from rest_framework import serializers
from .models import Viaje, Postulacion, Lugar

class ViajeSerializer(serializers.ModelSerializer):
    origen = serializers.SerializerMethodField()
    destino = serializers.SerializerMethodField()
    organizador = serializers.CharField(source="organizador.nickname")  # Mostrar el nickname del organizador

    class Meta:
        model = Viaje
        fields = [
            "viaje_id",
            "fecha_hora",
            "asientos_disponibles",
            "costo_por_asiento",
            "descripcion",
            "organizador",
            "origen",
            "destino",
        ]

    def get_origen(self, obj):
        return obj.origen.descripcion 

    def get_destino(self, obj):
        return obj.destino.descripcion  
class LugarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lugar
        fields = '__all__'
class PostulacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Postulacion
        fields = '__all__'