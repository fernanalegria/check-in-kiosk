import logging

from rest_framework import mixins, status
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


def normalize_list(array):
    return {d['id']: d for d in array}


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
    action = ''

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

    def get_json_response(self, response):
        """
        Returns the JSON content or raises an exception, based on what kind of response (2XX/4XX) we get
        """
        if response.ok:
            self.logger.debug(f"{self.action}() complete")
            response_function = self.get_response_function()
            return response_function(response)
        else:
            exe = ERROR_CODES.get(response.status_code, APIException)
            self.logger.debug(f"{self.action} exception {exe}")
            raise exe(response.content)

    def get_response_function(self):
        if self.action == 'retrieve':
            return self.get_retrieve_response
        elif self.action == 'list':
            return self.get_list_response
        elif self.action == 'create':
            return self.get_create_response
        elif self.action == 'destroy':
            return self.get_destroy_response
        elif self.action == 'update' or self.action == 'partial_update':
            return self.get_update_response
        else:
            raise APIException('Unknown viewset action')


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
        if hasattr(self, 'before_create_request'):
            self.before_create_request(request)
        url = self.url()
        self.auth_headers(kwargs, request.access_token)
        response = requests.post(url, data=request.data, **kwargs)
        return self.get_json_response(response)

    @classmethod
    def get_create_response(cls, response):
        """
        Specifies the data and the status a method should return
        """
        result = response.json()
        return Response(result, status.HTTP_201_CREATED)


class BaseListModelMixin(mixins.ListModelMixin, BaseMixin):
    """
    Retrieve a list of objects
    """
    left_joins = []

    def list(self, request, *args, **kwargs):
        if hasattr(self, 'before_list_request'):
            self.before_list_request(request)
        self.logger.debug("list()")
        url = self.url()
        self.auth_headers(kwargs, request.access_token)
        # Response will be one page out of a paginated results list
        response = requests.get(url, params=request.GET.dict(), **kwargs)
        if self.left_joins:
            return self.get_join_response(response, kwargs)
        else:
            return self.get_json_response(response)

    def get_join_response(self, response, kwargs):
        results = self.get_json(response)
        for left_join in self.left_joins:
            join_endpoint, join_key = left_join
            url = f"{self.BASE_URL}{join_endpoint}"
            join_response = requests.get(url, **kwargs)
            secondary_results = self.get_json(join_response)
            normalized_secondary_results = normalize_list(secondary_results)
            try:
                results = [{**element, join_key: normalized_secondary_results[element[join_key]]}
                           for element in results]
            except KeyError:
                raise APIException(
                    'The second argument of the left_join tuple must be an existing property in the original list'
                )
        try:
            normalized_results = normalize_list(results)
        except KeyError:
            normalized_results = results
        return Response(normalized_results, status.HTTP_200_OK)

    def get_json(self, response):
        if response.ok:
            self.logger.debug(f"{self.action}() complete")
            return response.json()['results']
        else:
            exe = ERROR_CODES.get(response.status_code, APIException)
            self.logger.debug(f"{self.action} exception {exe}")
            raise exe(response.content)

    @classmethod
    def get_list_response(cls, response):
        """
        Specifies the data and the status a method should return
        """
        results = response.json()['results']
        try:
            normalized_results = normalize_list(results)
        except KeyError:
            normalized_results = results
        return Response(normalized_results, status.HTTP_200_OK)


class BaseRetrieveModelMixin(mixins.RetrieveModelMixin, BaseMixin):
    """
    Retrieve a specific object by ID
    """

    def retrieve(self, request, *args, **kwargs):
        if hasattr(self, 'before_retrieve_request'):
            self.before_retrieve_request(request)
        pk = kwargs.pop('pk', None)
        url = self.url(pk)
        self.auth_headers(kwargs, request.access_token)
        response = requests.get(url, params=request.GET.dict(), **kwargs)
        self.logger.info("retrieve {}".format(response.status_code))
        return self.get_json_response(response)

    @classmethod
    def get_retrieve_response(cls, response):
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
        if hasattr(self, 'before_update_request'):
            self.before_update_request(request)
        pk = kwargs.pop('pk', None)
        partial = kwargs.pop('partial', False)
        url = self.url(pk)
        self.auth_headers(kwargs, request.access_token)
        make_request = requests.patch if partial else requests.put
        response = make_request(url, request.data, **kwargs)
        return self.get_json_response(response)

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)

    @classmethod
    def get_update_response(cls, response):
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
        if hasattr(self, 'before_destroy_request'):
            self.before_destroy_request(request)
        url = self.url(kwargs['pk'])
        self.auth_headers(kwargs, request.access_token)
        response = requests.delete(url)
        return self.get_json_response(response)

    @classmethod
    def get_destroy_response(cls, response):
        """
        Specifies the data and the status a method should return
        """
        return Response(status=status.HTTP_204_NO_CONTENT)
