from django.http import HttpResponseForbidden

class RestrictToFrontendMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        self.allowed_origin = "https://carsharee.vercel.app"

    def __call__(self, request):
        if request.path.startswith('/admin') or request.path.startswith('/static'):
            return self.get_response(request)

        origin = request.META.get("HTTP_ORIGIN") or request.META.get("HTTP_REFERER")
        if origin and self.allowed_origin not in origin:
            return HttpResponseForbidden("Acceso no permitido desde este origen")
        return self.get_response(request)
