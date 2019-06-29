import requests
from rest_framework import status
from rest_framework.response import Response

from .base.viewsets import BaseGenericViewSet
from .base.mixins import BaseListModelMixin


class UserViewSet(BaseListModelMixin, BaseGenericViewSet):
    """
    API endpoint to retrieve the logged in user
    """
    endpoint = 'doctors'

    def list(self, request, *args, **kwargs):
        self.logger.debug("list()")
        url = self.url()
        self.auth_headers(kwargs, request.access_token)
        # Response will be one page out of a paginated results list
        response = requests.get(url, params=request.data, **kwargs)
        return self.get_json_response(response, 'list')

    @classmethod
    def get_method_response(cls, response):
        """
        Specifies the data and the status a method should return
        """
        result = response.json()['results'][0]
        return Response(result, status.HTTP_200_OK)
