# Generated by Django 5.1.1 on 2024-10-13 09:46

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('question', '0008_rename_code_category_id_rename_code_subcategory_id'),
        ('quiz', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='quiz',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='quizquestion',
            name='question',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='question.question'),
        ),
        migrations.AddField(
            model_name='quizquestion',
            name='quiz',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='quiz.quiz'),
        ),
        migrations.AddField(
            model_name='quizquestionchoice',
            name='choice',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='question.choice'),
        ),
        migrations.AddField(
            model_name='quizquestionchoice',
            name='quizquestion',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='quiz.quizquestion'),
        ),
    ]
