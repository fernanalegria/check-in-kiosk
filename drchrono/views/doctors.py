from django.views.generic import TemplateView
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from rest_framework.exceptions import (PermissionDenied, NotFound, ValidationError)

from .base.viewsets import BaseReadOnlyModelViewSet
from .base.endpoints import BaseEndpoint
from drchrono.exceptions import Conflict

ERROR_CODES = {
    400: ValidationError,
    403: PermissionDenied,
    404: NotFound,
    409: Conflict,
}


class DoctorsViewSet(BaseReadOnlyModelViewSet):
    """
    API endpoint to perform read operations with doctors
    """
    endpoint = 'doctors'


class DoctorEndpoint(BaseEndpoint):
    endpoint = "doctors"

    def update(self, id, data, partial=True, **kwargs):
        raise NotImplementedError("the API does not allow updating doctors")

    def create(self, data=None, json=None, **kwargs):
        raise NotImplementedError("the API does not allow creating doctors")

    def delete(self, id, **kwargs):
        raise NotImplementedError("the API does not allow deleteing doctors")


@method_decorator(login_required, name='dispatch')
class DoctorWelcome(TemplateView):
    """
    The doctor can see what appointments they have today.
    """
    template_name = 'index.html'
