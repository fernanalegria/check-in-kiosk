from .base.viewsets import BaseModelViewSet


class PatientsViewSet(BaseModelViewSet):
    """
    API endpoint to perform CRUD operations with patients
    """
    endpoint = 'patients'
