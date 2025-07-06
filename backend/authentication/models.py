from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.core.exceptions import ValidationError

class User(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = "ADMIN", "Admin"
        MODERATOR = "MODERATOR", "Modérateur"
        USER = "USER", "Utilisateur"
    
    role = models.CharField(max_length=20, choices=Role.choices, default=Role.USER)
    email = models.EmailField(_("email address"), unique=True)
    
    # Configuration pour éviter les conflits
    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name=_('groups'),
        blank=True,
        related_name="custom_user_groups",
        related_query_name="custom_user",
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name=_('user permissions'),
        blank=True,
        related_name="custom_user_permissions",
        related_query_name="custom_user",
    )
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    def clean(self):
        super().clean()
        # Sauter la validation du mot de passe pour les nouvelles instances
        if not self.pk:
            return
        
        if not self.password:
            raise ValidationError({'password': 'Le mot de passe ne peut pas être vide'})
        
        # Définir automatiquement les permissions selon le rôle
        if self.role == self.Role.ADMIN:
            self.is_staff = True
            self.is_superuser = True
        elif self.role == self.Role.MODERATOR:
            self.is_staff = True
        else:
            self.is_staff = False
            self.is_superuser = False
    
    def save(self, *args, **kwargs):
        self.full_clean()  # Valide le modèle avant sauvegarde
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.email} ({self.get_role_display()})"