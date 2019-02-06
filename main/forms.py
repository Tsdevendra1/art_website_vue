from django import forms
from django.forms import formset_factory

from main.models import Image, Project


class ProjectForm(forms.ModelForm):
    class Meta:
        model = Project
        fields = ['title', 'thumbnail', 'description', 'video', 'project_type']


class ImageForm(forms.ModelForm):
    class Meta:
        model = Image
        fields = ['picture']


ImageFormset = formset_factory(ImageForm, extra=0, min_num=1)
