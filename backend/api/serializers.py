from django.contrib.auth import get_user_model
from rest_framework import serializers
from question.models import *
from quiz.models import Quiz, QuizQuestion, QuizQuestionChoice


User = get_user_model()

################ User #######################

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'wilaya', 'grade']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class StatisticSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'QuizsNumber', 'AnsweredQusetionsNumber', 'AnsweredCorrectQusetionsNumber', 'AnsweredWrongQusetionsNumber']
       

    



####################### Question #############################

class WilayaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wilaya
        fields = ['id', 'name']

class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = ['id', 'name']


class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ['id', 'name', 'questionNumber', 'subcategories']





class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ['id', 'text', 'isCorrect', 'isSuggested', 'isSelected', 'isStudentAnswer']
        extra_kwargs = {'id': {'read_only': True}}



class QuestionSerializer(serializers.ModelSerializer):

    choices = ChoiceSerializer(many=True, read_only=True, source='choice_set')
    subCategory = serializers.CharField(source='subCategory.name', read_only=True)
    category = serializers.CharField(source='subCategory.category.name', read_only=True)


    class Meta: 
        model = Question
        fields = ['text', 'year', 'explanation', 'isCorrect', 'category', 'subCategory', 'choices', ]
        extra_kwargs = {'id': {'read_only': True},
                        'year': {'read_only': True},
                        'isCorrect': {'read_only': True},
                        'text': {'read_only': True},
                        'explanation': {'read_only': True}}

class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = ['id', 'name', 'questionCount']


class CategoriesSerializer(serializers.ModelSerializer):
    subcategories = SubCategorySerializer(many=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'grade', 'location', 'subCount', 'questionCount', 'subcategories']
        extra_kwargs = {'code': {'read_only': True},
                        'name': {'read_only': True},
                        'grade': {'read_only': True},
                        'location': {'read_only': True},
                        'count': {'read_only': True},}


########################### Quiz ################################

class QuizQuestionChoiceSerializer(serializers.ModelSerializer):
    text = serializers.CharField(source='choice.text', read_only=True)
    isCorrect = serializers.BooleanField(source='choice.isCorrect', read_only=True)
    isSuggested = serializers.BooleanField(source='choice.isSuggested', read_only=True)
    id = serializers.CharField()

    class Meta:
        model = QuizQuestionChoice
        fields = ['id', 'choice', 'isSelected', 'text', 'isCorrect', 'isSuggested']
        extra_kwargs = {
           
            'choice': {'read_only': True},
            'text': {'read_only': True},
            'isCorrect': {'read_only': True},
            'isSuggested': {'read_only': True},
                        }

    # def upadte(self, instance, validated_data):
    #     instance.isSelected = validated_data.get('isSelected', instance.isSelected)
    #     instance.save()
    #     return instance

class QuizQuestionSerializer(serializers.ModelSerializer):
    choices = QuizQuestionChoiceSerializer(many=True, source='quizquestionchoice_set')
    text = serializers.CharField(source='question.text', read_only=True)
    year = serializers.IntegerField(source='question.year', read_only=True)
    subCategory = serializers.CharField(source='question.subCategory', read_only=True)
    category = serializers.CharField(source='question.subCategory.category.name', read_only=True)
    quiz = serializers.CharField(source='quiz.id', read_only=True)



    class Meta:
        model = QuizQuestion
        fields = ['id','quiz', 'text', 'year', 'category', 'subCategory', 'isAnswered', 'isAnsweredCorrect', 'choices']
        extra_kwargs = {'id': {'read_only': True},
                        
        }

    

    def update(self, instance, validated_data):
        
        # Handle the choices updates
        choices_data = validated_data.pop('quizquestionchoice_set', [])
        print(choices_data)
        for choice_data in choices_data:
            choice_id = choice_data.get('id')
            
            if choice_id:
                # Get the existing choice
                choice_instance = QuizQuestionChoice.objects.get(id=choice_id,)
                # Update the `isSelected` field of the choice
                choice_instance.isSelected = choice_data.get('isSelected', choice_instance.isSelected)
                choice_instance.save()

        # Update isAnswered and isAnsweredCorrect fields on the instance (QuizQuestion)
        instance.isAnswered = validated_data.get('isAnswered', instance.isAnswered)
        instance.isAnsweredCorrect = validated_data.get('isAnsweredCorrect', instance.isAnsweredCorrect)

        # Save the updated QuizQuestion instance
        instance.save()

        return instance



class QuizSerializer(serializers.ModelSerializer):
 

    subcategories = serializers.SlugRelatedField(
        queryset=SubCategory.objects.all(),
        slug_field='id',
        many=True
    )


    class Meta:
        model = Quiz
        fields = ['id', 'name', 'questionNumber', 'created', 'subcategories', 'random', 'correctNumber','lastAnsweredQuestionIndex', 'wrongNumber','time']
        extra_kwargs = {'code': {'read_only': True},
                        # 'name': {'read_only': True},
                        # 'questionNumber': {'read_only': True},
                        'created': {'read_only': True},
                        'correctNumber': {'read_only': True},
                        'lastAnsweredQuestionIndex': {'read_only': True},
                        'wrongNumber': {'read_only': True},
                        'time': {'read_only': True}}




