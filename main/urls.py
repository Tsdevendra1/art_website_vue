from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from main import views as m_views

urlpatterns = [
                  path('home/', m_views.HomePageView.as_view(), name='home'),
                  path('animations/', m_views.WorkCollectionPageView.as_view(), name='work-collection'),
              ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
