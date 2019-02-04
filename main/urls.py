from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from main import views as m_views

urlpatterns = [
                  path('home/', m_views.HomePageView.as_view(), name='home'),
                  path('animations/', m_views.AnimationListView.as_view(), name='work-collection'),
                  path('animations/<pk>', m_views.ProjectPageView.as_view(), name='single-animation-page'),
                  path('project/add/', m_views.AddProjectView.as_view(), name='add-project'),
              ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
