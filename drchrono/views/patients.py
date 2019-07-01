import requests

from rest_framework import status, exceptions
from rest_framework.response import Response

from .base.viewsets import BaseModelViewSet, BaseGenericViewSet
from .base.mixins import BaseListModelMixin, ERROR_CODES


class PatientsViewSet(BaseModelViewSet):
    """
    API endpoint to perform CRUD operations with patients
    """
    endpoint = 'patients'


class PatientAppointmentsViewSet(BaseListModelMixin, BaseGenericViewSet):
    """
    API endpoint that searches for the appointments of a given patient
    """
    endpoint = 'patients'

    def list(self, request, *args, **kwargs):
        self.logger.debug("list()")

        if not all(key in request.GET for key in ['social_security_number', 'doctor']):
            raise exceptions.ValidationError('The parameters social_security_number and doctor must be specified')
        ssn = request.GET.get('social_security_number')

        url = self.url()
        self.auth_headers(kwargs, request.access_token)
        # Response will be one page out of a paginated results list
        response = requests.get(url, params=request.GET.dict(), **kwargs)
        if response.ok:
            return self.get_response(response, ssn, kwargs)
        else:
            exe = ERROR_CODES.get(response.status_code, exceptions.APIException)
            self.logger.debug(f"{self.action} exception {exe}")
            raise exe(response.content)

    def get_response(self, response, ssn, kwargs):
        """
        Specifies the data and the status a method should return
        """
        results = response.json()['results']
        ssn_dict = {d['social_security_number']: d for d in results}
        patient = ssn_dict.get(ssn)
        if patient:
            return self.get_patient_appointments(patient, kwargs)
        else:
            return Response({}, status=status.HTTP_200_OK)

    def get_patient_appointments(self, patient, kwargs):
        """
        Returns all the appointments of a given patient
        """
        url = f'{self.BASE_URL}appointments'
        params = {
            'patient': patient['id'],
            'since': '0001-01-01',
            'show_archived': False
        }
        response = requests.get(url, params=params, **kwargs)
        if response.ok:
            self.logger.debug(f"{self.action}() complete")
            results = response.json()['results']
            join_results = [{**appt, 'patient': patient} for appt in results]
            normalized_results = {d['id']: d for d in join_results}
            return Response(normalized_results, status.HTTP_200_OK)
        else:
            exe = ERROR_CODES.get(response.status_code, exceptions.APIException)
            self.logger.debug(f"{self.action} exception {exe}")
            raise exe(response.content)