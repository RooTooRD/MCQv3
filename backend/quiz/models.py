from django.db import models
from django.contrib.auth import get_user_model
import uuid
from question.models import Question, Category, SubCategory, Choice, generate_unique_id
User = get_user_model()


class Quiz(models.Model):

    # we pass the sub Categories to crate it

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200)
    questionNumber = models.PositiveIntegerField(null=False, blank=False)
    subcategories = models.ManyToManyField(SubCategory)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created = models.DateTimeField( auto_now_add=True)
    random = models.BooleanField(default=False)
    correctNumber = models.PositiveIntegerField(default=0)
    lastAnsweredQuestionIndex = models.PositiveIntegerField(default=0)
    wrongNumber = models.PositiveIntegerField(default=0)
    time = models.PositiveIntegerField(default=0)
    default_quiz = models.BooleanField(default=False)

    # def create(self, *args, **kwargs):
    #     if self.pk is None:
    #         while True:
    #             self.code = generate_unique_id(25)
    #             if not Quiz.objects.filter(code=self.code).exists():
    #                 break
    #         super().save(*args, **kwargs)



    def __str__(self):
        return self.name
    


class QuizQuestion(models.Model):
    id= models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    isAnswered = models.BooleanField()
    isAnsweredCorrect = models.BooleanField(null=True, default=None)

    # def create(self, *args, **kwargs):
    #     if self.pk is None:
    #         while True:
    #             self.code = generate_unique_id(25)
    #             if not QuizQuestion.objects.filter(code=self.code).exists():
    #                 break
    #         super().save(*args, **kwargs)

    def __str__(self):
        return self.question.text
    

class QuizQuestionChoice(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    quizquestion = models.ForeignKey(QuizQuestion, on_delete=models.CASCADE)
    choice = models.ForeignKey(Choice, on_delete=models.CASCADE)
    isSelected = models.BooleanField(default=False)

    # def create(self, *args, **kwargs):
    #     if self.pk is None:
    #         while True:
    #             self.code = generate_unique_id(25)
    #             if not QuizQuestionChoice.objects.filter(code=self.code).exists():
    #                 break
    #         super().save(*args, **kwargs)

    def __str__(self):
        return self.choice.text