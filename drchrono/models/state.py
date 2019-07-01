from django.db import models


class State(models.Model):
    state_name = models.CharField(max_length=50)
    state_code = models.CharField(unique=True, max_length=2)

    class Meta:
        managed = False
        db_table = 'state'
