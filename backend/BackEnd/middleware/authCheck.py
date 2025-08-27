from django.http import HttpResponseForbidden

class CheckFrontendSecretMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        self.secret = "mi_clave_secreta_segura"

    def __call__(self, request):
        if request.path.startswith("/viajes") or request.path.startswith("/usuarios"):
            header_secret = request.headers.get("X-Frontend-Secret")
            if header_secret != self.secret:
                return HttpResponseForbidden("Acceso no autorizado")

        return self.get_response(request)
