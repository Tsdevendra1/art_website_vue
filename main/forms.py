from django import forms
from django.forms import formset_factory

from main.models import Image, Project


class ProjectForm(forms.ModelForm):
    class Meta:
        model = Project
        fields = ['title', 'thumbnail', 'description', 'video', 'project_type', 'date_field', 'banner']


class ImageForm(forms.ModelForm):
    class Meta:
        model = Image
        fields = ['picture', 'low_res_picture']


ImageFormset = formset_factory(ImageForm, extra=0, min_num=1)


class ContactForm(forms.Form):
    contact_name = forms.CharField(required=True)
    contact_email = forms.EmailField(required=True)
    comment = forms.CharField(
        required=True,
        widget=forms.Textarea
    )
