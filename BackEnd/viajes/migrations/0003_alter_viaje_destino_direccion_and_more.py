# Generated by Django 5.0.6 on 2024-06-21 02:24

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0004_alter_usuario_dni'),
        ('viajes', '0002_remove_viaje_id_viaje_viaje_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='viaje',
            name='destino_direccion',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='viaje',
            name='destino_latitud',
            field=models.DecimalField(blank=True, decimal_places=6, max_digits=20, null=True),
        ),
        migrations.AlterField(
            model_name='viaje',
            name='destino_longitud',
            field=models.DecimalField(blank=True, decimal_places=6, max_digits=20, null=True),
        ),
        migrations.AlterField(
            model_name='viaje',
            name='origen_direccion',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='viaje',
            name='origen_latitud',
            field=models.DecimalField(blank=True, decimal_places=6, max_digits=20, null=True),
        ),
        migrations.AlterField(
            model_name='viaje',
            name='origen_longitud',
            field=models.DecimalField(blank=True, decimal_places=6, max_digits=20, null=True),
        ),
        migrations.CreateModel(
            name='Postulacion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('estado', models.CharField(choices=[('pendiente', 'Pendiente'), ('aceptada', 'Aceptada'), ('rechazada', 'Rechazada')], default='pendiente', max_length=10)),
                ('fecha_hora_postulacion', models.DateTimeField(auto_now_add=True)),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='usuarios.usuario')),
                ('viaje', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='viajes.viaje')),
            ],
        ),
    ]
