from django.urls import path
from api.views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    #statistic
    path('statistic/', RetrieveStatisticView.as_view(), name='statistic'),
    # authentication
    path("user/register/", CreateUserView.as_view(), name="register"),
    path("token/", TokenObtainPairView.as_view(), name="get_token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("check-admin/", CheckAdminView.as_view(), name="check-admin"),


    # Question
    path("modules/", ModuleListView.as_view(), name='user-categories'),
    path("questions/", QuestionListView.as_view(), name="question" ),
    path('update/<str:id>', QuizQuestionUpdateView.as_view(), name='update'),
    path('wilayas/', WilayaListView.as_view(), name='wilaya'),
    path('grades/', GradeListView.as_view(), name='grade'),

    # Categories
    path('categories', CategoriesListView.as_view(), name='categories-list'),

    # Quiz
    path('quizzes/', QuizListCreateView.as_view(), name='quiz-list-create'),
    path('quizzes/<str:quiz_id>/', QuizQuestionListView.as_view(), name='quiz-questions'),
    
]
