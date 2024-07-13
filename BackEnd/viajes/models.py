from django.db import models
from usuarios.models import Usuario

class Viaje(models.Model):
    viaje_id= models.AutoField(primary_key=True)
    fecha_hora = models.DateTimeField()
    asientos_disponibles = models.IntegerField()
    costo_por_asiento = models.DecimalField(max_digits=10, decimal_places=2)
    descripcion = models.TextField()
    organizador = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    
    # Campos adicionales para integración con Google Maps, por ejemplo
    origen_direccion = models.CharField(max_length=500, blank=True, null=True)
    origen_latitud = models.DecimalField(max_digits=20, decimal_places=6, blank=True, null=True)
    origen_longitud = models.DecimalField(max_digits=20, decimal_places=6, blank=True, null=True)
    destino_direccion = models.CharField(max_length=500, blank=True, null=True)
    destino_latitud = models.DecimalField(max_digits=20, decimal_places=6, blank=True, null=True)
    destino_longitud = models.DecimalField(max_digits=20, decimal_places=6, blank=True, null=True)

    def __str__(self):
        return f"Viaje el {self.fecha_hora} de {self.origen_direccion} a {self.destino_direccion}"

class Postulacion(models.Model):
    ESTADOS = (
        ('pendiente', 'Pendiente'),
        ('aceptada', 'Aceptada'),
        ('rechazada', 'Rechazada'),
    )
    postulacion_id= models.AutoField(primary_key=True)
    viaje = models.ForeignKey(Viaje, on_delete=models.CASCADE)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    estado = models.CharField(max_length=10, choices=ESTADOS, default='pendiente')
    fecha_hora_postulacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.usuario.nickname} - {self.viaje}'