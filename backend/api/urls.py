
from django.urls import path
from accounts.views import  RegisterView , MyTokenObtainPairView , UserView
from rest_framework_simplejwt.views import  TokenRefreshView
from courses.views import CourseListView, CourseDetailView , CourseCreateView , CourseUpdateView, CourseDeleteView , LessonListView , LessonDetailView , LessonCreateView , LessonUpdateView , LessonDeleteView , CreatedCoursesListView
from enrollments.views import EnrollmentListView , EnrollmentCreateView , EnrollmentDeleteView

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', MyTokenObtainPairView.as_view(), name='login'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/user/', UserView.as_view(), name='user'),

    path('courses/', CourseListView.as_view(), name='course_list'),
    path('courses/<int:pk>/', CourseDetailView.as_view(), name='course_detail'),
    path('courses/created/', CreatedCoursesListView.as_view(), name='created_course_list'),
    path('courses/create/', CourseCreateView.as_view(), name='course_create'),
    path('courses/<int:pk>/update/', CourseUpdateView.as_view(), name='course_update'),
    path('courses/<int:pk>/delete/', CourseDeleteView.as_view(), name='course_delete'),

    path('courses/<int:course_pk>/lessons/', LessonListView.as_view(), name='lesson_list'),
    path('courses/<int:course_pk>/lessons/<int:pk>/', LessonDetailView.as_view(), name='lesson_detail'),
    path('courses/<int:course_pk>/lessons/create/', LessonCreateView.as_view(), name='lesson_create'),
    path('courses/<int:course_pk>/lessons/<int:pk>/update/', LessonUpdateView.as_view(), name='lesson_update'),
    path('courses/<int:course_pk>/lessons/<int:pk>/delete/', LessonDeleteView.as_view(), name='lesson_delete'),

    path('enrollments/', EnrollmentListView.as_view(), name='enrollment_list'),
    path('courses/<int:course_pk>/enrollments/create/', EnrollmentCreateView.as_view(), name='enrollment_create'),
    path('courses/<int:course_pk>/enrollments/delete/', EnrollmentDeleteView.as_view(), name='enrollment_delete'),
]