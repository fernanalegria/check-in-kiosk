from django.contrib import admin
from django.urls import include, path
from django.views.generic import TemplateView

from drchrono import views

admin.autodiscover()

urlpatterns = [
    path('setup/', views.SetupView.as_view(), name='setup'),
    path('welcome/', views.DoctorWelcome.as_view(), name='setup'),
    path('admin/', admin.site.urls),
    path('patient-login/', TemplateView.as_view(template_name='index.html')),
    path('', include('social.apps.django_app.urls', namespace='social')),
]
