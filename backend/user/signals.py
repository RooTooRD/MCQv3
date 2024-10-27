from django.db.models.signals import post_save
from django.dispatch import receiver
from quiz.models import Quiz
from question.models import Category, SubCategory
from django.contrib.auth import get_user_model


User = get_user_model()

@receiver(post_save, sender=User)
def create_quizzes_for_user(sender, instance, created, **kwargs):
    if created:
        user_grade = instance.grade
        user_wilaya = instance.wilaya

        categories = Category.objects.filter(grade=user_grade, wilaya=user_wilaya)
        print(categories)

        for category in categories:
            subCategories = SubCategory.objects.filter(category=category)
            print('--------------------')
            print(subCategories)
        
            quiz = Quiz.objects.create(
                name = category.name,
                questionNumber = 0,
                user = instance,
                default_quiz=True
            )

            quiz.subcategories.set(subCategories)

            


            

       