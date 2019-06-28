from social_django.models import UserSocialAuth


class SocialAuthTokenMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        # One-time configuration and initialization.

    def __call__(self, request):
        # Code to be executed for each request before
        # the view (and later middleware) are called.
        request.access_token = self.get_token()
        response = self.get_response(request)

        # Code to be executed for each request/response after
        # the view is called.

        return response

    @classmethod
    def get_token(cls):
        """
        Social Auth module is configured to store our access tokens. This dark magic will fetch it for us if we've
        already signed in.
        """
        oauth_provider = UserSocialAuth.objects.get(provider='drchrono')
        access_token = oauth_provider.extra_data['access_token']
        return access_token
