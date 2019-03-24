import string

from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.utils.crypto import get_random_string

from celery import shared_task


@shared_task
def celery_send_email(from_name, message, from_email, to_email):
    # To email must be in a list because send_email expects a recipient_list.
    send_mail('Contact from {}'.format(from_name), message, from_email, [to_email])
    return 'Message Successfully Sent!'
