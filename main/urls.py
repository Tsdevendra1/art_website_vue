from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from main import views as m_views

urlpatterns = [
                  path('home/', m_views.HomePageView.as_view(), name='home'),
                  path('animations/', m_views.AnimationListView.as_view(), name='work-collection'),
                  path('animations/<pk>/', m_views.ProjectPageView.as_view(), name='single-animation-page'),
                  path('exhibitions/', m_views.ExhibitionsListView.as_view(), name='exhibitions'),
                  path('exhibitions/<pk>', m_views.ExhibitionPageView.as_view(), name='single-exhibition-page'),
                  path('project/add/', m_views.AddProjectView.as_view(), name='add-project'),
                  path('project/add/no-images/', m_views.AddProjectNoImagesView.as_view(), name='add-project-no-images'),
              ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
