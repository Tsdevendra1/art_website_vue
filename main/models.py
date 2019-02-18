from django.db import models
from django.template.defaultfilters import slugify


# Create your models here.
class Project(models.Model):
    GENERAL = 'General'
    SKETCHBOOK = 'Sketchbook'
    EXHIBITION = 'Exhibition'
    TEACHING = 'Teaching'
    PROJECT_TYPES = (
        (GENERAL, 'General'),
        (SKETCHBOOK, 'Sketchbook'),
        (EXHIBITION, 'Exhibition'),
        (TEACHING, 'Teaching'),
    )
    title = models.CharField(max_length=256)
    description = models.TextField(null=True, blank=True)
    thumbnail = models.ImageField(upload_to='main/images/thumbnails/',
                                  help_text='This will be the thumbnail for the project',
                                  blank=True, null=True)
    banner = models.ImageField(upload_to='main/images/banners/', help_text='This will be the banner for the project',
                               blank=True, null=True)
    video = models.FileField(upload_to='main/videos/', help_text='This is the main video for the project', blank=True,
                             null=True)
    project_type = models.CharField(max_length=13, choices=PROJECT_TYPES, default=GENERAL)
    date_field = models.DateField()

    def __str__(self):
        return self.title


def get_image_filename(instance, filename):
    title = instance.project.title
    slug = slugify(title)
    return "main/images/{}-{}".format(slug, filename)


def get_low_res_image_filename(instance, filename):
    title = instance.project.title
    slug = slugify(title)
    return "main/images/lowres/{}-{}".format(slug, filename)


class Image(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    picture = models.ImageField(upload_to=get_image_filename,
                                verbose_name='Picture', help_text='This will be displayed on the product page')
    low_res_picture = models.ImageField(upload_to=get_low_res_image_filename,
                                        blank=True,
                                        null=True,
                                        verbose_name='Low Res Picture',
                                        help_text='Please provide an low res version of the picture')
