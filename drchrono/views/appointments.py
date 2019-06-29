from datetime import datetime, timedelta

from rest_framework import status, exceptions
from rest_framework.response import Response

from .base.viewsets import BaseGenericViewSet
from .base.mixins import BaseRetrieveModelMixin, BaseListModelMixin, BaseUpdateModelMixin


class AppointmentsViewSet(BaseRetrieveModelMixin, BaseListModelMixin, BaseUpdateModelMixin, BaseGenericViewSet):
    """
    API endpoint to read and update appointments
    """
    endpoint = 'appointments'
    left_joins = [('patients', 'patient')]


class WaitingTimeViewSet(BaseListModelMixin, BaseGenericViewSet):
    """
    API endpoint to retrieve the average overall waiting time
    """
    endpoint = 'appointments'

    @classmethod
    def before_list_request(cls, request):
        """
        Performs validations and edits the query params
        """
        if any(key in request.GET for key in ['since', 'date', 'date_range']):
            raise exceptions.ValidationError(
                'The parameters since, date and date_range cannot be set to retrieve the average overall waiting time'
            )

        request.GET = request.GET.copy()
        request.GET['since'] = '0001-01-01'

    @classmethod
    def get_list_response(cls, response):
        """
        Specifies the data and the status a method should return
        """
        results = response.json()['results']
        if results:
            overall_waiting_times = [
                cls.from_string_to_date(result['scheduled_time']) - cls.from_string_to_date(result['created_at'])
                for result in results
            ]
            waiting_time_response = sum(overall_waiting_times, timedelta(0)) / len(overall_waiting_times)
        else:
            waiting_time_response = 0
        return Response({'waiting_time': str(waiting_time_response)}, status.HTTP_200_OK)

    @classmethod
    def from_string_to_date(cls, date_string):
        return datetime.strptime(date_string, '%Y-%m-%dT%H:%M:%S')
