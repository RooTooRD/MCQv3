from django.db.models.signals import post_save, m2m_changed
from django.dispatch import receiver
from .models import Quiz, QuizQuestion, QuizQuestionChoice, Question, Choice
import random


@receiver(m2m_changed, sender=Quiz.subcategories.through)
def handle_subcategories_change(sender, instance, action, **kwargs):
    if action in ['post_add', 'post_remove']:
        # Clear existing questions and choices related to this quiz
        QuizQuestion.objects.filter(quiz=instance).delete()

        # Get the updated list of subcategories
        subcategories = instance.subcategories.all()
        
        # Fetch related questions
        questions = Question.objects.filter(subCategory__in=subcategories)



        if instance.random:
            # Convert QuerySet to a list
            questions_list = list(questions)
            # Shuffle the list in place
            random.shuffle(questions_list)
            # Slice the shuffled list
            related_questions = questions_list[:instance.questionNumber if instance.questionNumber!=0 else len(questions_list) ]
        else:
            # Convert QuerySet to a list
            questions_list = list(questions)
            # Slice the original list
            related_questions = questions_list[:instance.questionNumber if instance.questionNumber!=0 else len(questions_list)]




        for question in related_questions:
            # Create a QuizQuestion instance
            quiz_question = QuizQuestion.objects.create(
                quiz=instance,
                question=question,
                isAnswered=False,
                isAnsweredCorrect=None
            )
            
            # Create a QuizQuestionChoice instance for each choice of the question
            for choice in question.choice_set.all():
                QuizQuestionChoice.objects.create(
                    quizquestion=quiz_question,
                    choice=choice,
                    isSelected=False
                )

        print(f'outside {len(questions_list)}')
        if instance.questionNumber == 0:
            instance.questionNumber = len(questions_list)
            instance.save()