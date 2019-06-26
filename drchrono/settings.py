"""
Django settings for drchrono project.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.2/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '=*l&a&rk7jmiw$3euke*z9lu-na!^j^i&ddejfik!ajqlaymmc'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'drchrono',
    'social_django',
    'rest_framework',
)

MIDDLEWARE = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.security.SecurityMiddleware',
)

AUTHENTICATION_BACKENDS = (
    'social_auth_drchrono.backends.drchronoOAuth2',
    'django.contrib.auth.backends.ModelBackend',
)

ROOT_URLCONF = 'drchrono.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates').replace('\\','/'),],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'social.apps.django_app.context_processors.backends',
                'social.apps.django_app.context_processors.login_redirect',
            ],
        },
    },
]

WSGI_APPLICATION = 'drchrono.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'd74800h73uf86u',
        'USER': 'wfjsatcwuanbst',
        'PASSWORD': '97069391f5db6b7d502258310292b80c7da0a96a500e542e29a0524dbcf532df',
        'HOST': 'ec2-54-228-246-214.eu-west-1.compute.amazonaws.com',
        'PORT': '5432',
    }
}


# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/
STATIC_URL = '/static/'


# TODO: Configure your drchrono.com account's API settings to allow this app access
# 1) go to https://app.drchrono.com/api-management/
# 2) Add a new application
# 3) configure your redirect URL to be http://localhost:8080/complete/drchrono/
# 3.1) This needs to be an exact match to what the social-auth module expects
# 3.2) change your hostname if you're using a different way to access this kiosk; by default it'll run on localhost:8080
# 4) copy your CLIENT_ID and SECRET keys into a file docker/environment. See the example
# 5) Ask a dev if this doesn't work quickly; these settings can be fiddly, and we'd rather not wast time with them.
SOCIAL_AUTH_DRCHRONO_KEY = os.getenv('SOCIAL_AUTH_CLIENT_ID')
SOCIAL_AUTH_DRCHRONO_SECRET = os.getenv('SOCIAL_AUTH_SECRET')


LOGIN_REDIRECT_URL = '/welcome/'
LOGIN_URL = 'login/drchrono'

SHELL_PLUS = "ipython"


LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': 'debug.log',
        },
    },
    'loggers': {
        'drchrono.endpoints.*': {
            'handlers': ['file'],
            'level': 'DEBUG',
            'propagate': True,
        },
    },
}