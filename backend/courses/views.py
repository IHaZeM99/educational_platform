from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status

from .models import Course , Lesson
from .serializers import CourseSerializer , LessonSerializer
from rest_framework.permissions import IsAuthenticated

class CourseListView(generics.ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    
    

class CourseDetailView(generics.RetrieveAPIView ):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class CreatedCoursesListView(generics.ListAPIView):
    serializer_class = CourseSerializer

    def get_queryset(self):
        return Course.objects.filter(instructor=self.request.user)

class CourseCreateView(generics.CreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        if not hasattr(self.request.user, 'user_type') or self.request.user.user_type != 'instructor':
            return Response({'error': 'Only instructors can create courses.'}, status=status.HTTP_403_FORBIDDEN)
        # Set the instructor to the current user
        serializer.save(instructor=self.request.user)

class CourseUpdateView(generics.UpdateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]
    
    def perform_update(self, serializer):
        if not hasattr(self.request.user, 'user_type') or self.request.user.user_type != 'instructor':
            return Response({'error': 'Only instructors can update courses.'}, status=status.HTTP_403_FORBIDDEN)
        
        # Check if the current user is the instructor of this course
        course = self.get_object()
        if course.instructor != self.request.user:
            return Response({'error': 'You can only update your own courses.'}, status=status.HTTP_403_FORBIDDEN)
        
        serializer.save()

class CourseDeleteView(generics.DestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]
    
    def perform_destroy(self, instance):
        if not hasattr(self.request.user, 'user_type') or self.request.user.user_type != 'instructor':
            return Response({'error': 'Only instructors can delete courses.'}, status=status.HTTP_403_FORBIDDEN)
        
        # Check if the current user is the instructor of this course
        if instance.instructor != self.request.user:
            return Response({'error': 'You can only delete your own courses.'}, status=status.HTTP_403_FORBIDDEN)
        
        instance.delete()
    

class LessonListView(generics.ListAPIView):
    serializer_class = LessonSerializer
    
    
    def get_queryset(self):
        course_pk = self.kwargs.get('course_pk')
        if course_pk:
            return Lesson.objects.filter(course_id=course_pk)
        else:
            return Lesson.objects.none()
        

class LessonDetailView(generics.RetrieveAPIView):
    serializer_class = LessonSerializer
    

    def get_queryset(self):
        course_pk = self.kwargs.get('course_pk')
        if course_pk:
            return Lesson.objects.filter(course_id=course_pk)
        else:
            return Lesson.objects.none()
        
class LessonCreateView(generics.CreateAPIView):
    serializer_class = LessonSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer , request):
        if not hasattr(request.user, 'user_type') or request.user.user_type != 'instructor':
            return Response({'error': 'Only instructors can create lessons.'}, status=status.HTTP_403_FORBIDDEN)
        course_pk = self.kwargs.get('course_pk')
        if not course_pk:
            return Response({'error': 'Course ID is required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        course = Course.objects.filter(pk=course_pk).first()
        if not course:
            return Response({'error': 'Course not found.'}, status=status.HTTP_404_NOT_FOUND)
        if course.instructor != request.user:
            return Response({'error': 'You are not the instructor of this course.'}, status=status.HTTP_403_FORBIDDEN)
        
        serializer.save(course=course)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
class LessonUpdateView(generics.UpdateAPIView):
    serializer_class = LessonSerializer
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer , request):
        if not hasattr(request.user, 'user_type') or request.user.user_type != 'instructor':
            return Response({'error': 'Only instructors can update lessons.'}, status=status.HTTP_403_FORBIDDEN)
        course_pk = self.kwargs.get('course_pk')
        if not course_pk:
            return Response({'error': 'Course ID is required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        course = Course.objects.filter(pk=course_pk).first()
        if not course:
            return Response({'error': 'Course not found.'}, status=status.HTTP_404_NOT_FOUND)
        if course.instructor != request.user:
            return Response({'error': 'You are not the instructor of this course.'}, status=status.HTTP_403_FORBIDDEN)

        serializer.save(course=course)
        return Response(serializer.data, status=status.HTTP_200_OK)


class LessonDeleteView(generics.DestroyAPIView):
    serializer_class = LessonSerializer
    permission_classes = [IsAuthenticated]

    def perform_destroy(self, instance):
        if not hasattr(self.request.user, 'user_type') or self.request.user.user_type != 'instructor':
            return Response({'error': 'Only instructors can delete lessons.'}, status=status.HTTP_403_FORBIDDEN)
        course_pk = self.kwargs.get('course_pk')
        if not course_pk:
            return Response({'error': 'Course ID is required.'}, status=status.HTTP_400_BAD_REQUEST)

        course = Course.objects.filter(pk=course_pk).first()
        if not course:
            return Response({'error': 'Course not found.'}, status=status.HTTP_404_NOT_FOUND)
        if course.instructor != self.request.user:
            return Response({'error': 'You are not the instructor of this course.'}, status=status.HTTP_403_FORBIDDEN)

        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)