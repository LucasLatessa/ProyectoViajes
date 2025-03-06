from django.http import HttpRequest, JsonResponse
from utils.authorization import RequestToken, authorized
from rest_framework.decorators import api_view
from django.core.files.storage import default_storage


def public(request: HttpRequest) -> JsonResponse:

    return JsonResponse(
        data={
            "message": "Hello from a public endpoint! You don't need to be authenticated to see this.",
        }
    )


@authorized
def private(request: HttpRequest, token: RequestToken) -> JsonResponse:
    return JsonResponse(
        data={
            "message": "Hello from a private endpoint! You need to be authenticated to see this.",
            "token": token.dict(),
        }
    )
