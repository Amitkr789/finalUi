# Generated by Django 5.1.5 on 2025-01-27 11:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='registeruser',
            name='img',
            field=models.ImageField(default='img/default.png', upload_to='img/'),
        ),
    ]
