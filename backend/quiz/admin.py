from django.contrib import admin
from quiz.models import *



class QuizQuestionInline(admin.TabularInline):
    model = QuizQuestion
    extra = 0
    fields = ['question', 'isAnswered', 'isAnsweredCorrect']

class QuizQuestionAdmin(admin.ModelAdmin):
    model =QuizQuestion
    list_display = ['id', 'question', 'isAnswered', 'isAnsweredCorrect']

class QuizAdmin(admin.ModelAdmin):
    inlines = [QuizQuestionInline]
    model = Quiz
    list_display = ['id', 'name', 'user','questionNumber', 'created', 'default_quiz']


admin.site.register(QuizQuestion, QuizQuestionAdmin)
admin.site.register(Quiz, QuizAdmin)
