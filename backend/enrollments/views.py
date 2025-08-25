from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView

from courses.models import Course
from .models import Enrollment
from .serializers import EnrollmentSerializer
from rest_framework.permissions import IsAuthenticated  
from rest_framework.response import Response
from rest_framework import status

# Create your views here.

class EnrollmentListView(generics.ListAPIView):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Enrollment.objects.filter(student=user)
    
class EnrollmentCreateView(generics.CreateAPIView):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        course_id = self.kwargs.get('course_pk')
        try:
            course = Course.objects.get(pk=course_id)
        except Course.DoesNotExist:
            return Response({'error': 'Course not found.'}, status=404)
        
        # Check if already enrolled
        if Enrollment.objects.filter(student=request.user, course=course).exists():
            return Response({'error': 'You are already enrolled in this course.'}, status=400)
        
        # Create enrollment directly
        enrollment = Enrollment.objects.create(student=request.user, course=course)
        serializer = self.get_serializer(enrollment)
        return Response(serializer.data, status=201)

class EnrollmentDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, course_pk):
        try:
            course = Course.objects.get(pk=course_pk)
        except Course.DoesNotExist:
            return Response({'error': 'Course not found.'}, status=status.HTTP_404_NOT_FOUND)
        
        try:
            enrollment = Enrollment.objects.get(student=request.user, course=course)
            enrollment.delete()
            return Response({'message': 'Successfully withdrawn from course.'}, status=status.HTTP_200_OK)
        except Enrollment.DoesNotExist:
            return Response({'error': 'You are not enrolled in this course.'}, status=status.HTTP_400_BAD_REQUEST)