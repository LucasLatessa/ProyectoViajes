import os
from pathlib import Path
from dotenv import load_dotenv

# Construye las rutas dentro del proyecto como BASE_DIR / 'subdirectorio'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Cargar las variables de entorno desde el archivo .env
load_dotenv()

# Definición de las aplicaciones instaladas
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'webpack_loader',
    'rest_framework',
    'usuarios',
    'viajes',
]

# Middleware de la aplicación
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]

# Configuración de las URLs raíz
ROOT_URLCONF = 'BackEnd.urls'

# Configuración de plantillas
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# Configuración de la aplicación WSGI
WSGI_APPLICATION = 'BackEnd.wsgi.application'

# Configuración de la base de datos
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Validación de contraseñas
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# Configuración de localización
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'America/Argentina/Buenos_Aires'
USE_I18N = True
USE_TZ = True

# Archivos estáticos (CSS, JavaScript, Imágenes)
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')  
#Tipo de campo primario por defecto
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Configuración de seguridad
SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure-9hx6=5g-73)h%$&d4q$gg^v7bo85%w4=y@0s127j(^i@h)zktb')
DEBUG = os.environ.get('DEBUG', 'True')

ALLOWED_HOSTS = [
    'carsharee.vercel.app', 'proyectoviajes.onrender.com', '127.0.0.1', 'localhost', 'proyectoviajes-production.up.railway.app'
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:4040", "http://localhost:3000", "http://localhost:8000", "https://localhost:4040",
    "https://192.168.0.111:4040", "https://carsharee.vercel.app"
]

CORS_ALLOW_METHODS = ["GET", "OPTIONS", "POST", "PUT", "DELETE"]
CORS_ALLOW_HEADERS = ["Accept", "Content-Type", "Authorization", "X-CSRFToken"]

CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True
CORS_ALLOW_CREDENTIALS = True
CSRF_COOKIE_SAMESITE = 'None'
CSRF_TRUSTED_ORIGINS = [
    f"https://{os.environ.get('NGROK_URL')}",
    "http://localhost:8000", "https://localhost:8000", "http://localhost:80", "https://localhost:80",
    "http://localhost:3000", "https://localhost:3000", "https://carsharee.vercel.app", "https://proyectoviajes.onrender.com"
]

# Configuración de correo electrónico
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = os.environ.get('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD')
DEFAULT_FROM_EMAIL = os.environ.get('DEFAULT_FROM_EMAIL')

# Configuración del Django Rest Framework
REST_FRAMEWORK = {
    'DEFAULT_SCHEMA_CLASS': 'rest_framework.schemas.coreapi.AutoSchema'
}

# Añadir barra al final de las URLs
APPEND_SLASH = True
