from django.contrib import admin
from django.urls import include, path
from django.views.generic import TemplateView
from rest_framework import routers

from drchrono.views import (DoctorsViewSet, PatientsViewSet, UserViewSet, AppointmentsViewSet)

admin.autodiscover()

router = routers.DefaultRouter()
router.register(r'doctors', DoctorsViewSet, basename='doctors')
router.register(r'patients', PatientsViewSet, basename='patients')
router.register(r'user', UserViewSet, basename='user')
router.register(r'appointments', AppointmentsViewSet, basename='appointments')

urlpatterns = [
    path('welcome/', TemplateView.as_view(template_name='index.html'), name='welcome'),
    path('admin/', admin.site.urls),
    path('', include('social.apps.django_app.urls', namespace='social')),
    path('', include(router.urls)),
]
