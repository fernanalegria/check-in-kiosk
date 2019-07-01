from rest_framework import status, views
from rest_framework.response import Response

from drchrono.models import City, State
from drchrono.serializers import CitySerializer, StateSerializer
from .base.mixins import normalize_list


class StaticView(views.APIView):
    """
    API view to retrieve static initial data from db
    """

    @classmethod
    def get(cls, request):
        cities = City.objects.all()
        serialized_cities = CitySerializer(cities, many=True).data
        states = State.objects.all()
        serialized_states = StateSerializer(states, many=True).data

        response = {
            'cities': normalize_list(serialized_cities),
            'states': normalize_list(serialized_states)
        }
        return Response(response, status=status.HTTP_200_OK)
