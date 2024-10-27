from django.db import models
from question.models import Wilaya, Grade
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.apps import apps

class CustomUserManager(BaseUserManager):

    def create_user(self, email, password=None, **extra_fields):
            if not email:
                raise ValueError('Users must have an email address')
            email = self.normalize_email(email)
            user = self.model(email=email, **extra_fields)
            user.set_password(password)
            user.save(using=self._db)
            return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)



class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True, null=False, blank=False)
    wilaya = models.ForeignKey(Wilaya, null=True, on_delete=models.CASCADE)
    grade = models.ForeignKey(Grade, null=True, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email


    @property
    def QuizsNumber(self):
        return self.quiz_set.count()  # Accesses related quizzes without importing `Quiz`
    
    @property
    def AnsweredQusetionsNumber(self):
        QuizQuestion = apps.get_model('quiz', 'QuizQuestion')
        return QuizQuestion.objects.filter(quiz__user=self, isAnswered=True).count()
    
    @property
    def AnsweredCorrectQusetionsNumber(self):
        QuizQuestion = apps.get_model('quiz', 'QuizQuestion')
        return QuizQuestion.objects.filter(quiz__user=self, isAnswered=True, isAnsweredCorrect=True).count()

    @property
    def AnsweredWrongQusetionsNumber(self):
        QuizQuestion = apps.get_model('quiz', 'QuizQuestion')
        return QuizQuestion.objects.filter(quiz__user=self, isAnswered=True, isAnsweredCorrect=False).count()

    
