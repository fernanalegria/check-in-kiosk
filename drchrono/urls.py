from django.contrib import admin
from django.urls import include, path
from django.views.generic import TemplateView
from rest_framework import routers

from drchrono.views import doctors, patients

admin.autodiscover()

router = routers.DefaultRouter()
router.register(r'doctors', doctors.DoctorsViewSet, basename='doctors')
router.register(r'patients', patients.PatientsViewSet, basename='patients')

urlpatterns = [
    path('welcome/', TemplateView.as_view(template_name='index.html'), name='welcome'),
    path('admin/', admin.site.urls),
    path('', include('social.apps.django_app.urls', namespace='social')),
    path('', include(router.urls)),
]
