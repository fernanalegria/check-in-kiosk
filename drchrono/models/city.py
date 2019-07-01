from django.db import models


class City(models.Model):
    state = models.ForeignKey('State', models.DO_NOTHING)
    city_name = models.CharField(max_length=50)
    zip_code_from = models.IntegerField()
    zip_code_to = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'city'
        unique_together = (('state', 'city_name'),)
