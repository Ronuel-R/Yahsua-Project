from django.db import models

class TaskModel(models.Model):
    title = models.CharField(max_length=100, blank=True)
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    completed = models.BooleanField(default=False)  

    def __str__(self):
        return self.title
