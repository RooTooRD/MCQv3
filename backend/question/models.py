from django.db import models
import secrets
import uuid
import string

def generate_unique_id(length=25):
    characters = string.ascii_letters + string.digits  # Uppercase, lowercase, digits
    return ''.join(secrets.choice(characters) for _ in range(length))




class Wilaya(models.Model):
    name = models.CharField(max_length=200)
    available = models.BooleanField(default=False)


    def __str__(self):
        return self.name

class Grade(models.Model):
    name = models.CharField(max_length=200)
    available = models.BooleanField(default=False)


    def __str__(self):
        return self.name
    
class Category(models.Model):
    name = models.CharField(max_length=200)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    grade = models.ForeignKey(Grade, on_delete=models.CASCADE)
    wilaya = models.ForeignKey(Wilaya, on_delete=models.CASCADE, default=1)
    location = models.CharField(max_length=200)

    @property
    def subCount(self):
        return SubCategory.objects.filter(category=self).count()

    @property
    def questionCount(self):
        return Question.objects.filter(subCategory__category=self).count()
        

    # def create(self, *args, **kwargs):

    #     while True:
    #         self.code = generate_unique_id(25)
    #         if not Category.objects.filter(code=self.code).exists():
    #             break
    #     super().save(*args, **kwargs)


    def __str__(self):
        return f'{self.name} - {self.grade}AM'

class SubCategory(models.Model):
    name = models.CharField(max_length=400)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    category = models.ForeignKey(Category, related_name='subcategories', on_delete=models.CASCADE)

    @property
    def questionCount(self):
        return Question.objects.filter(subCategory=self).count()

    # def create(self, *args, **kwargs):
    #     while True:
    #         self.code = generate_unique_id(20)
    #         if not SubCategory.objects.filter(code=self.code).exists():
    #             break
    #     super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class Question(models.Model):
    text = models.CharField(max_length=10000)
    wilaya = models.ForeignKey(Wilaya, on_delete=models.CASCADE, default=1)
    grade = models.ForeignKey(Grade, on_delete=models.CASCADE, default=2)
    subCategory = models.ForeignKey(SubCategory, on_delete=models.CASCADE)
    explanation = models.CharField(max_length=10000, default=None, null=True)
    year = models.PositiveIntegerField(null=True, default=None)
    isCorrect = models.BooleanField(null=True, default=None)



    def __str__(self):
        return self.text


class Choice(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    text = models.CharField(max_length=10000)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    isCorrect = models.BooleanField(default=False)
    isSuggested = models.BooleanField(default=False)
    isSelected = models.BooleanField(default=False)
    isStudentAnswer = models.BooleanField(default=False)

    
    def __str__(self):
        return self.text

    




