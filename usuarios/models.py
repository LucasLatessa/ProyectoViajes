from django.db import models

class Usuario(models.Model):
    user_id = models.AutoField(primary_key=True)
    dni = models.CharField(max_length=20, blank=True)  # Asumiendo que el DNI es único y tiene hasta 20 caracteres
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    email = models.EmailField()
    nickname = models.CharField(max_length=50)
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nombre} {self.apellido} ({self.nickname})"