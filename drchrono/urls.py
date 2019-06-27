from django.contrib import admin
from django.urls import include, path

from drchrono import views

admin.autodiscover()

urlpatterns = [
    path('setup/', views.SetupView.as_view(), name='setup'),
    path('welcome/', views.DoctorWelcome.as_view(), name='setup'),
    path('admin/', admin.site.urls),
    path('', include('social.apps.django_app.urls', namespace='social')),
]
