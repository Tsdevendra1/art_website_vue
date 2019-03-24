from django.shortcuts import render
from django.contrib.auth.forms import UserCreationForm
import json
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse_lazy
from django.views import View
from django.views.generic import TemplateView, FormView, CreateView, ListView, UpdateView, DeleteView, DetailView

# Create your views here.
from main.forms import ImageFormset, ProjectForm, ContactForm
from main.models import Project

# Project types
from main.tasks import celery_send_email

GENERAL = 'General'
SKETCHBOOK = 'Sketchbook'
EXHIBITION = 'Exhibition'
TEACHING = 'Teaching'


class HomePageView(TemplateView):
    template_name = 'main/home.html'


class AnimationListView(ListView):
    """
    View for page which deals with all the films
    """
    model = Project
    template_name = 'main/all_animations_page.html'


class AddProjectView(CreateView):
    template_name = 'main/add_project.html'
    success_url = reverse_lazy('work-collection')

    def get(self, request):
        context = {'image_formset': ImageFormset, 'form': ProjectForm}
        return render(request, self.template_name, context)

    def post(self, request, *args, **kwargs):
        # Forms
        project_form = ProjectForm(request.POST, request.FILES)
        image_formset = ImageFormset(request.POST, request.FILES)

        if project_form.is_valid() and image_formset.is_valid():
            project_instance = project_form.save(commit=False)
            project_instance.save()
            for form in image_formset:
                # Only save if an image has been provided
                if form.cleaned_data.get('picture'):
                    image_instance = form.save(commit=False)
                    image_instance.project = project_instance
                    image_instance.save()
            return HttpResponseRedirect(self.success_url)
        else:
            context = {'image_formset': ImageFormset(self.request.POST), 'form': ProjectForm(self.request.POST)}
            return render(self.request, self.template_name, context)


class AddProjectNoImagesView(CreateView):
    template_name = 'main/add_project_no_images.html'
    success_url = reverse_lazy('work-collection')

    def get(self, request):
        context = {'form': ProjectForm}
        return render(request, self.template_name, context)

    def post(self, request, *args, **kwargs):
        # Forms
        project_form = ProjectForm(request.POST, request.FILES)

        if project_form.is_valid():
            project_instance = project_form.save(commit=False)
            project_instance.save()
            return HttpResponseRedirect(self.success_url)
        else:
            context = {'form': ProjectForm(self.request.POST)}
            return render(self.request, self.template_name, context)


class ProjectPageView(DetailView):
    template_name = 'main/generic_content_page.html'
    model = Project


class ExhibitionsListView(ListView):
    template_name = 'main/all_exhibitions_page.html'
    context_object_name = 'project_list'
    queryset = Project.objects.filter(project_type=GENERAL)


class ExhibitionPageView(DetailView):
    template_name = 'main/generic_content_page.html'
    model = Project

    def get_queryset(self):
        return Project.objects.filter(project_type=GENERAL)


class SketchbookPageView(ListView):
    template_name = 'main/sketchbook_page.html'
    model = Project

    def get_queryset(self):
        return Project.objects.filter(project_type=SKETCHBOOK)


class TeachingListView(ListView):
    template_name = 'main/all_teachings_page.html'
    model = Project

    def get_queryset(self):
        return Project.objects.filter(project_type=GENERAL)


class TeachingPageView(DetailView):
    template_name = 'main/generic_content_page.html'
    model = Project

    def get_queryset(self):
        return Project.objects.filter(project_type=GENERAL)


class ContactPage(TemplateView):
    """
    This has to be a template view, instead of form view, because of how the page works after form submission (I think)
    """
    template_name = 'main/contact_page.html'
    success_url = reverse_lazy('contact')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['form'] = ContactForm
        return context
