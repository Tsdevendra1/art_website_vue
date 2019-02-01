from django.shortcuts import render
from django.contrib.auth.forms import UserCreationForm
import json
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.urls import reverse_lazy
from django.views import View
from django.views.generic import TemplateView, FormView, CreateView, ListView, UpdateView, DeleteView, DetailView


# Create your views here.
class HomePageView(TemplateView):
    template_name = 'main/home.html'


class WorkCollectionPageView(TemplateView):
    """
    View for page which deals with all the films
    """
    template_name = 'main/work_collection_page.html'
