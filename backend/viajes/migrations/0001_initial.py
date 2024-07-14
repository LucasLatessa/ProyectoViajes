# Generated by Django 5.0.6 on 2024-06-20 18:57

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('usuarios', '0003_usuario_dni'),
    ]

    operations = [
        migrations.CreateModel(
            name='Viaje',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha_hora', models.DateTimeField()),
                ('asientos_disponibles', models.IntegerField()),
                ('costo_por_asiento', models.DecimalField(decimal_places=2, max_digits=10)),
                ('descripcion', models.TextField()),
                ('origen_direccion', models.CharField(blank=True, max_length=255, null=True)),
                ('origen_latitud', models.DecimalField(blank=True, decimal_places=6, max_digits=9, null=True)),
                ('origen_longitud', models.DecimalField(blank=True, decimal_places=6, max_digits=9, null=True)),
                ('destino_direccion', models.CharField(blank=True, max_length=255, null=True)),
                ('destino_latitud', models.DecimalField(blank=True, decimal_places=6, max_digits=9, null=True)),
                ('destino_longitud', models.DecimalField(blank=True, decimal_places=6, max_digits=9, null=True)),
                ('organizador', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='usuarios.usuario')),
            ],
        ),
    ]
