from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    USER_TYPE_CHOICES = (
        ('student', 'Student'),
        ('instructor', 'Instructor'),
    )
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES)
    bio = models.TextField(blank=True, null=True)
    email = models.EmailField(unique=True)
    REQUIRED_FIELDS = ['user_type']

    def is_instructor(self):
        return self.user_type == 'instructor'
