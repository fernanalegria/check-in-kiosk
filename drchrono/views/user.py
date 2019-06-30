from rest_framework import status
from rest_framework.response import Response

from .base.viewsets import BaseGenericViewSet
from .base.mixins import BaseListModelMixin


class UserViewSet(BaseListModelMixin, BaseGenericViewSet):
    """
    API endpoint to retrieve the logged in user
    """
    endpoint = 'doctors'

    @classmethod
    def get_list_response(cls, response):
        """
        Specifies the data and the status a method should return
        """
        result = response.json()['results'][0]
        return Response(result, status.HTTP_200_OK)
