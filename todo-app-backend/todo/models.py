
# todo/models.py
      
from django.db import models
# Create your models here.

# add this
class Todo(models.Model):
  bucket = models.CharField(max_length=120)
  todos = models.TextField()
  completed = models.BooleanField(default=False)
      
  def __str__(self):
    return self.bucket