from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import logout

from .base.viewsets import BaseGenericViewSet
from .base.mixins import BaseListModelMixin


class LogOutViewSet(BaseListModelMixin, BaseGenericViewSet):
    """
    API endpoint to perform CRUD operations with patients
    """

    def list(self, request, *args, **kwargs):
        logout(request)
        return Response(status=status.HTTP_204_NO_CONTENT)
