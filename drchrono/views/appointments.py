from .base.viewsets import BaseGenericViewSet
from .base.mixins import BaseRetrieveModelMixin, BaseListModelMixin, BaseUpdateModelMixin


class AppointmentsViewSet(BaseRetrieveModelMixin, BaseListModelMixin, BaseUpdateModelMixin, BaseGenericViewSet):
    """
    API endpoint to read and update appointments
    """
    endpoint = 'appointments'
    left_joins = [('patients', 'patient')]
