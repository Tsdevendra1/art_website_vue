# Generated by Django 2.0.1 on 2019-02-02 21:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_auto_20190202_2118'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='video',
            field=models.FileField(default=1, help_text='This is the main video for the project', upload_to='main/videos/'),
            preserve_default=False,
        ),
    ]
