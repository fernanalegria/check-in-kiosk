import logging

from rest_framework import mixins, status, viewsets
from rest_framework.exceptions import (APIException, PermissionDenied, NotFound, ValidationError)
from rest_framework.response import Response
import requests

from drchrono.exceptions import Conflict

ERROR_CODES = {
    400: ValidationError,
    403: PermissionDenied,
    404: NotFound,
    409: Conflict,
}


class BaseMixin(object):
    """
    A basic mixin to connect to the DrChrono API.

    Provides consistent, pythonic usage and return values from the API.

    Abstracts away:
     - base URL,
     - details of authentication
     - response codes
    """
    BASE_URL = 'https://drchrono.com/api/'
    endpoint = ''

    @property
    def logger(self):
        name = f"{__name__}.{self.endpoint}"
        return logging.getLogger(name)

    @classmethod
    def url(cls, id=""):
        if id:
            id = f"/{id}"
        return f"{cls.BASE_URL}{cls.endpoint}{id}"

    @classmethod
    def auth_headers(cls, kwargs, access_token):
        """
        Adds auth information to the kwargs['header'], as expected by get/put/post/delete

        Modifies kwargs in place. Returns None.
        """
        kwargs['headers'] = kwargs.get('headers', {})
        kwargs['headers'].update({
            'Authorization': f'Bearer {access_token}'
        })

    def get_json_response(self, response, method):
        """
        Returns the JSON content or raises an exception, based on what kind of response (2XX/4XX) we get
        """
        if response.ok:
            self.logger.debug(f"{method}() complete")
            return self.get_method_response(response)
        else:
            exe = ERROR_CODES.get(response.status_code, APIException)
            self.logger.debug(f"{method} exception {exe}")
            raise exe(response.content)

    @classmethod
    def get_method_response(cls, response):
        """
        Specifies the data and the status a method should return
        """
        result = response.json()
        return Response(result, status.HTTP_200_OK)


class BaseCreateModelMixin(mixins.CreateModelMixin, BaseMixin):
    """
    Used to create an object at a resource with the included values.

    Response body will be the requested object, with the ID it was assigned.

    Success: 201 (Created)
    Failure:
       - 400 (Bad Request)
       - 403 (Forbidden)
       - 409 (Conflict)
    """

    def create(self, request, *args, **kwargs):
        url = self.url()
        self.auth_headers(kwargs, request.access_token)
        response = requests.post(url, data=request.data, **kwargs)
        return self.get_json_response(response, 'create')

    @classmethod
    def get_method_response(cls, response):
        """
        Specifies the data and the status a method should return
        """
        result = response.json()
        return Response(result, status.HTTP_201_CREATED)


class BaseListModelMixin(mixins.ListModelMixin, viewsets.GenericViewSet, BaseMixin):
    """
    Retrieve a list of objects
    """

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
        results = response.json()['results']
        return Response(results, status.HTTP_200_OK)


class BaseRetrieveModelMixin(mixins.RetrieveModelMixin, BaseMixin):
    """
    Retrieve a specific object by ID
    """

    def retrieve(self, request, *args, **kwargs):
        pk = kwargs.pop('pk', None)
        url = self.url(pk)
        self.auth_headers(kwargs, request.access_token)
        response = requests.get(url, params=request.data, **kwargs)
        self.logger.info("retrieve {}".format(response.status_code))
        return self.get_json_response(response, 'retrieve')

    @classmethod
    def get_method_response(cls, response):
        """
        Specifies the data and the status a method should return
        """
        result = response.json()
        return Response(result, status.HTTP_200_OK)


class BaseUpdateModelMixin(mixins.UpdateModelMixin, BaseMixin):
    """
    Updates an object. Returns None.

    update uses PUT to update the entire object at the given ID with the given values.

    partial_update uses PATCH to update only the given fields on the object.

    Response body will be empty.

    Success: 204 (No Content)
    Failure:
       - 400 (Bad Request)
       - 403 (Forbidden)
       - 409 (Conflict)
    """

    def update(self, request, *args, **kwargs):
        pk = kwargs.pop('pk', None)
        partial = kwargs.pop('partial', False)
        url = self.url(pk)
        self.auth_headers(kwargs, request.access_token)
        if partial:
            method = 'partial_update'
            make_request = requests.patch
        else:
            method = 'update'
            make_request = requests.put
        response = make_request(url, request.data, **kwargs)
        return self.get_json_response(response, method)

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)

    @classmethod
    def get_method_response(cls, response):
        """
        Specifies the data and the status a method should return
        """
        return Response(status=status.HTTP_204_NO_CONTENT)


class BaseDestroyModelMixin(mixins.DestroyModelMixin, BaseMixin):
    """
    Deletes the object at this resource with the given ID.

    Response body will be empty.

    Success: 204 (No Content)
    Failure:
       - 400 (Bad Request)
       - 403 (Forbidden)
    """

    def destroy(self, request, *args, **kwargs):
        url = self.url(kwargs['pk'])
        self.auth_headers(kwargs, request.access_token)
        response = requests.delete(url)
        return self.get_json_response(response, 'destroy')

    @classmethod
    def get_method_response(cls, response):
        """
        Specifies the data and the status a method should return
        """
        return Response(status=status.HTTP_204_NO_CONTENT)
