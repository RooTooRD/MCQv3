from django.shortcuts import render
from rest_framework.generics import (  CreateAPIView, ListAPIView, 
RetrieveUpdateDestroyAPIView, CreateAPIView, ListCreateAPIView, UpdateAPIView, RetrieveAPIView )
from .serializers import *
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import get_user_model
from question.models import *
from quiz.models import *
from rest_framework.response import Response
from rest_framework import status


User = get_user_model()

class CreateUserView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class RetrieveStatisticView(RetrieveAPIView):
    serializer_class = StatisticSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # Returns the currently authenticated user
        return self.request.user

class ListQuestionView(ListAPIView):
    # queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        category_id = self.kwargs.get('category_id')
        return Question.objects.filter(subCategory__category__id=category_id)  


class WilayaListView(ListAPIView):
    queryset = Wilaya.objects.all()
    serializer_class = WilayaSerializer
    permission_classes = [AllowAny]
    
class GradeListView(ListAPIView):
    queryset = Grade.objects.all()
    serializer_class = GradeSerializer
    permission_classes = [AllowAny]

    

# # quiz 
class QuizListCreateView(ListCreateAPIView):
    
    serializer_class = QuizSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=user)
    
    def get_queryset(self):
        user = self.request.user
        return Quiz.objects.filter(user=user)
    

class QuizQuestionListView(ListAPIView):
    serializer_class = QuizQuestionSerializer
    permission_classes = [AllowAny]
    def get_queryset(self):
        quiz_id = self.kwargs.get('quiz_id')
        return QuizQuestion.objects.filter(quiz=Quiz.objects.get(id=quiz_id))

    
        
# class QuizCreateView(CreateAPIView):
#     queryset = Quiz.objects.all()
#     serializer_class = QuizSerializer
#     permission_classes = [AllowAny]


class CategoriesListView(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategoriesSerializer
    permission_classes = [AllowAny]

    # def get_queryset(self):
    #     queryset = Category.objects.all()
    #     print(queryset)  # Debugging: print the queryset
    #     return queryset


class QuizQuestionUpdateView(RetrieveUpdateDestroyAPIView):
    queryset = QuizQuestion.objects.all()
    serializer_class = QuizQuestionSerializer
    lookup_field = 'id'
    permission_classes = [AllowAny]

    # def update(self, request, *args, **kwargs):
    #     kwargs['partial'] = True
    #     return super().update(request, *args, **kwargs)

    # def perform_update(self, serializer):
    #     instance = serializer.save()
    #     print(f' ============= {instance.isAnswered}')



class ModuleListView(ListAPIView):
    
    serializer_class = ModuleSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        modules = Quiz.objects.filter(user=self.request.user, default_quiz=True)
        return modules 
    
