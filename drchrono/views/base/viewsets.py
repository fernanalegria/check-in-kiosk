from rest_framework.viewsets import GenericViewSet

from .mixins import (BaseRetrieveModelMixin,
                     BaseListModelMixin,
                     BaseCreateModelMixin,
                     BaseUpdateModelMixin,
                     BaseDestroyModelMixin)


class BaseGenericViewSet(GenericViewSet):
    """
    Eliminates the properties queryset and serializer_class, which do not make sense in this schema
    """

    def get_queryset(self):
        return None

    def get_serializer_class(self):
        return None

    def get_serializer(self):
        return None


class BaseReadOnlyModelViewSet(BaseRetrieveModelMixin,
                               BaseListModelMixin,
                               BaseGenericViewSet):
    """
    A viewset that provides default `list()` and `retrieve()` actions from DrChrono API.
    """
    pass


class BaseModelViewSet(BaseCreateModelMixin,
                       BaseRetrieveModelMixin,
                       BaseUpdateModelMixin,
                       BaseDestroyModelMixin,
                       BaseListModelMixin,
                       BaseGenericViewSet):
    """
    A viewset that provides default `create()`, `retrieve()`, `update()`,
    `partial_update()`, `destroy()` and `list()` actions from DrChrono API.
    """
    pass
