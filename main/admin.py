from django.contrib import admin

# Register your models here.
from main.models import Project, Image

admin.site.register(Project)
admin.site.register(Image)
