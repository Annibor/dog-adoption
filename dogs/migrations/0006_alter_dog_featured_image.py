# Generated by Django 5.0 on 2024-06-14 10:56

import cloudinary.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("dogs", "0005_alter_dog_created_at"),
    ]

    operations = [
        migrations.AlterField(
            model_name="dog",
            name="featured_image",
            field=cloudinary.models.CloudinaryField(
                default="../defaultdogimg", max_length=255, verbose_name="image"
            ),
        ),
    ]
