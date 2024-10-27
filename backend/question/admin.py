from django.contrib import admin
from django.contrib.admin import TabularInline
from .models import *

class ChoiceInline(TabularInline):
    model = Choice
    extra = 1

class QuestionAdmin(admin.ModelAdmin):

    inlines = [ChoiceInline]


class SubCategoryInline(admin.TabularInline):
    model = SubCategory
    
class CategoryAdmin(admin.ModelAdmin):
    inlines = [SubCategoryInline]
    list_display = [  'id', 'name', 'grade', 'location']



class SubCategoryAdmin(admin.ModelAdmin):
    model = SubCategory
    list_display = [ 'id', 'name', 'category']
    

class WilayaAdmin(admin.ModelAdmin):
    model = Wilaya
    list_display = ['id', 'name']


class GradeAdmin(admin.ModelAdmin):
    model = Grade
    list_display = ['id', 'name']

admin.site.register(Category, CategoryAdmin)
admin.site.register(SubCategory, SubCategoryAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Choice)
admin.site.register(Wilaya, WilayaAdmin)
admin.site.register(Grade, GradeAdmin)

