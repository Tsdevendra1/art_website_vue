# Generated by Django 2.0.1 on 2019-02-09 23:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0011_auto_20190206_1730'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='date_field',
            field=models.DateField(auto_now=True),
        ),
    ]
