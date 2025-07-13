from django.db import models

class Sensibilisation(models.Model):
    titre = models.CharField(max_length=255)
    type = models.CharField(max_length=50)
    contenu = models.TextField()
    auteur = models.DateField()
    date_publication = models.CharField(max_length=100)
    image_url = models.URLField(blank=True)

    class Meta:
        db_table = 'Sensibilisation'

    def __str__(self):
        return self.titre
