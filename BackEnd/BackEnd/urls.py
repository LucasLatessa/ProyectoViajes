from django.urls import URLPattern, path, include
from django.contrib import admin
from django.urls import path, re_path
from django.views.generic import TemplateView

urlpatterns =[
    path('admin/', admin.site.urls),
    path('usuarios/',include('usuarios.urls')),
    path('viajes/',include('viajes.urls')),
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),
]