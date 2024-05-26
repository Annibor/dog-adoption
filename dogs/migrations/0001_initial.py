# Generated by Django 5.0 on 2024-05-24 08:58

import cloudinary.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Dog",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=80)),
                ("breed", models.CharField(max_length=80)),
                ("age", models.IntegerField()),
                (
                    "featured_image",
                    cloudinary.models.CloudinaryField(
                        default="placeholder", max_length=255, verbose_name="image"
                    ),
                ),
                ("description", models.TextField()),
                ("gender", models.CharField(max_length=10)),
                ("good_with_children", models.BooleanField(default=True)),
                ("good_with_other_dogs", models.BooleanField(default=True)),
                (
                    "adoption_status",
                    models.CharField(
                        choices=[
                            ("available", "Available"),
                            ("pending", "Pending"),
                            ("adopted", "Adopted"),
                        ],
                        default="available",
                        max_length=20,
                    ),
                ),
            ],
            options={
                "verbose_name": "Dog",
                "verbose_name_plural": "Dogs",
                "ordering": ["name"],
            },
        ),
    ]