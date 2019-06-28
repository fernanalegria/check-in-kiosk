from .base.viewsets import BaseModelViewSet


class PatientsViewSet(BaseModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    endpoint = 'patients'
