from django.db.models.signals import post_migrate
from django.dispatch import receiver
from .models import Lugar

@receiver(post_migrate)
def create_default_lugares(sender, **kwargs):
    # Verificar si los lugares ya existen
    if not Lugar.objects.filter(descripcion='Chivilcoy').exists():
        Lugar.objects.create(descripcion='Chivilcoy')
    if not Lugar.objects.filter(descripcion='Mercedes').exists():
        Lugar.objects.create(descripcion='Mercedes')
    if not Lugar.objects.filter(descripcion='Bragado').exists():
        Lugar.objects.create(descripcion='Bragado')
    if not Lugar.objects.filter(descripcion='Buenos Aires').exists():
        Lugar.objects.create(descripcion='Buenos Aires')
    if not Lugar.objects.filter(descripcion='La Plata').exists():
        Lugar.objects.create(descripcion='La Plata')
