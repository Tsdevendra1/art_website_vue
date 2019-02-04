from django.db import models
from django.template.defaultfilters import slugify


# Create your models here.
class Project(models.Model):
    title = models.CharField(max_length=256)
    description = models.TextField()
    thumbnail = models.ImageField(upload_to='main/images/', help_text='This will be the thumbnail for the project')
    video = models.FileField(upload_to='main/videos/', help_text='This is the main video for the project')

    def __str__(self):
        return self.title


def get_image_filename(instance, filename):
    title = instance.project.title
    slug = slugify(title)
    return "main/images/{}-{}".format(slug, filename)


class Image(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    picture = models.ImageField(upload_to=get_image_filename,
                                verbose_name='Picture', help_text='This will be displayed on the product page')
