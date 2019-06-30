from django.contrib import admin
from django.urls import include, path, re_path
from rest_framework import routers

from drchrono.views import (DoctorsViewSet, PatientsViewSet, UserViewSet, AppointmentsViewSet, WaitingTimeViewSet,
                            DoctorWelcome, SetupView, LoginView, LogoutView)

admin.autodiscover()

router = routers.DefaultRouter()
router.register(r'doctors', DoctorsViewSet, basename='doctors')
router.register(r'patients', PatientsViewSet, basename='patients')
router.register(r'user', UserViewSet, basename='user')
router.register(r'appointments', AppointmentsViewSet, basename='appointments')
router.register(r'waiting-time', WaitingTimeViewSet, basename='waiting-time')

urlpatterns = [
    path('setup/', SetupView.as_view(), name='setup'),
    path('welcome/', DoctorWelcome.as_view(), name='welcome'),
    path('logout/', LogoutView.as_view(), name='logout'),
    re_path(r'^app/(?P<pk>\D+)/$', LoginView.as_view(), name='app'),
    path('admin/', admin.site.urls),
    path('', include('social.apps.django_app.urls', namespace='social')),
    path('', include(router.urls)),
]
