# Generated by Django 5.0 on 2024-05-26 18:24

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("dogs", "0002_dog_temperament"),
        ("profiles", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="AdoptionApplication",
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
                ("visit_date", models.DateTimeField()),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("pending", "Pending"),
                            ("approved", "Approved"),
                            ("rejected", "Rejected"),
                        ],
                        default="pending",
                        max_length=20,
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "dog",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="dogs.dog"
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="profiles.profile",
                    ),
                ),
            ],
            options={
                "verbose_name": "Adoption Application",
                "verbose_name_plural": "Adoption Applications",
                "ordering": ["-created_at"],
            },
        ),
    ]
