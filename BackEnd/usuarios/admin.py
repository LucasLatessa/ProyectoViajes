from django.contrib import admin
from .models import Usuario

@admin.register(Usuario)
class UsuarioAdmin(admin.ModelAdmin):
    list_display = ('user_id','dni','nombre', 'apellido', 'email', 'nickname', 'fecha_creacion')
    search_fields = ('user_id','dni','nombre', 'apellido', 'email', 'nickname')
