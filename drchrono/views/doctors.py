from django.views.generic import TemplateView
from social_django.models import UserSocialAuth
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


class DoctorWelcome(TemplateView):
    """
    The doctor can see what appointments they have today.
    """
    template_name = 'doctor_welcome.html'

    def get_token(self):
        """
        Social Auth module is configured to store our access tokens. This dark magic will fetch it for us if we've
        already signed in.
        """
        oauth_provider = UserSocialAuth.objects.get(provider='drchrono')
        access_token = oauth_provider.extra_data['access_token']
        return access_token

    def make_api_request(self):
        """
        Use the token we have stored in the DB to make an API request and get doctor details. If this succeeds, we've
        proved that the OAuth setup is working
        """
        # We can create an instance of an endpoint resource class, and use it to fetch details
        access_token = self.get_token()
        api = DoctorEndpoint(access_token)
        # Grab the first doctor from the list; normally this would be the whole practice group, but your hackathon
        # account probably only has one doctor in it.
        return next(api.list())

    def get_context_data(self, **kwargs):
        kwargs = super(DoctorWelcome, self).get_context_data(**kwargs)
        # Hit the API using one of the endpoints just to prove that we can
        # If this works, then your oAuth setup is working correctly.
        doctor_details = self.make_api_request()
        kwargs['doctor'] = doctor_details
        return kwargs
