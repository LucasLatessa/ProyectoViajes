from django.urls import URLPattern, path, include
from django.contrib import admin
from django.urls import path, re_path
from django.views.generic import TemplateView
from django.views.generic import RedirectView
from . import views

urlpatterns =[
    path(
        route="",
        view=RedirectView.as_view(permanent=False, url="/api/public"),
        name="index",
    ),
    path(route="api/public", view=views.public, name="public"),
    
    path('admin/', admin.site.urls),
    path('usuarios/',include('usuarios.urls')),
    path('viajes/',include('viajes.urls')),
]