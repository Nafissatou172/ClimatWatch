from django.db import models

class Video(models.Model):
    titre = models.CharField(max_length=255)
    duree = models.CharField(max_length=10)  # format "mm:ss"
    url_video = models.URLField()  # lien vers la vidéo (YouTube, fichier mp4 hébergé, etc.)

    class Meta:
        db_table = 'videos'  # associe explicitement la table SQL 'videos'

    def __str__(self):
        return self.titre
