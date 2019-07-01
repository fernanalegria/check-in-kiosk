from django.db import models


class ClientApp(models.Model):
    app_token = models.CharField(max_length=50)
    app = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'client_app'
        unique_together = (('app_token', 'app'),)
