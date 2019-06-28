import logging

from rest_framework import viewsets, mixins
from rest_framework.response import Response
from rest_framework.exceptions import (APIException, PermissionDenied, NotFound, ValidationError)
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

    def __init__(self, access_token=None):
        """
        Creates an API client which will act on behalf of a specific user
        """
        self.access_token = access_token

    @property
    def logger(self):
        name = "{}.{}".format(__name__, self.endpoint)
        return logging.getLogger(name)

    def url(self, id=""):
        if id:
            id = "/{}".format(id)
        return "{}{}{}".format(self.BASE_URL, self.endpoint, id)

    def auth_headers(self, kwargs):
        """
        Adds auth information to the kwargs['header'], as expected by get/put/post/delete

        Modifies kwargs in place. Returns None.
        """
        kwargs['headers'] = kwargs.get('headers', {})
        kwargs['headers'].update({
            'Authorization': 'Bearer {}'.format(self.access_token),

        })

    def json_or_exception(self, response):
        """
        returns the JSON content or raises an exception, based on what kind of response (2XX/4XX) we get
        """
        if response.ok:
            if response.status_code != 204:  # No Content
                return response.json()
        else:
            exe = ERROR_CODES.get(response.status_code, APIException)
            raise exe(response.content)

    def request(self, method, *args, **kwargs):
        # dirty, universal way to use the requests library directly for debugging
        url = self.url(kwargs.pop(id, ''))
        self.auth_headers(kwargs)
        return getattr(requests, method)(url, *args, **kwargs)
