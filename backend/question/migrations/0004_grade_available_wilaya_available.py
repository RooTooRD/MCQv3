# Generated by Django 5.1.1 on 2024-10-13 08:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('question', '0003_remove_category_id_remove_subcategory_id_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='grade',
            name='available',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='wilaya',
            name='available',
            field=models.BooleanField(default=False),
        ),
    ]
