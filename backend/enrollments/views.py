from django.shortcuts import render
from rest_framework import generics

from courses.models import Course
from .models import Enrollment
from .serializers import EnrollmentSerializer
from rest_framework.permissions import IsAuthenticated  
from rest_framework.response import Response

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

    def perform_create(self, serializer):
        course_id = self.kwargs.get('course_pk')
        course = Course.objects.get(pk=course_id)
        if not course:
            return Response({'error': 'Course not found.'}, status=404)
        serializer.save(student=self.request.user, course=course)

class EnrollmentDeleteView(generics.DestroyAPIView):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    permission_classes = [IsAuthenticated]

    def perform_destroy(self, instance):
        if instance.student != self.request.user:
            return Response({'error': 'You can only delete your own enrollments.'}, status=403)
        instance.delete()