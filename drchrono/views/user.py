from rest_framework import status, views, exceptions
from rest_framework.response import Response
from django.contrib.auth import logout
from django.http import QueryDict

from .base.viewsets import BaseGenericViewSet
from .base.mixins import BaseListModelMixin
from drchrono.models import ClientApp


class UserViewSet(BaseListModelMixin, BaseGenericViewSet):
    """
    API endpoint to retrieve the logged in user
    """
    endpoint = 'doctors'

    @classmethod
    def before_list_request(cls, request):
        """
        Performs validations and edits the query params
        """
        cls.app_token = request.COOKIES['apptoken']
        if len(request.GET) > 0:
            request.GET = QueryDict()

    @classmethod
    def get_list_response(cls, response):
        """
        Specifies the data and the status a method should return
        """
        result = response.json()['results'][0]
        try:
            result['app'] = ClientApp.objects.get(app_token=cls.app_token).app
        except ClientApp.DoesNotExist:
            raise exceptions.PermissionDenied('Please, select which application you want to access in /setup/')
        return Response(result, status.HTTP_200_OK)


class LogoutView(views.APIView):
    """
    API view to logout the user
    """

    @classmethod
    def get(cls, request):
        logout(request)
        return Response(status=status.HTTP_204_NO_CONTENT)


class LoginView(views.APIView):
    """
    API view to set the client app
    """

    @classmethod
    def get(cls, request, pk):
        app_token = request.COOKIES['apptoken']
        try:
            client_app = ClientApp.objects.get(app_token=app_token)
        except ClientApp.DoesNotExist:
            client_app = ClientApp(app_token=app_token)
        client_app.app = pk
        client_app.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
