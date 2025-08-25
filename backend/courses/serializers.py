from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from accounts.serializers import UserSerializer
from .models import Course, Lesson

class CourseSerializer(ModelSerializer):
    instructor = UserSerializer(read_only=True)

    class Meta:
        model = Course
        fields = '__all__'


class LessonSerializer(ModelSerializer):
    videoUrl = serializers.URLField(source='video_url', required=False, allow_blank=True)
    
    class Meta:
        model = Lesson
        fields = ['id', 'title', 'videoUrl', 'course', 'created_at', 'updated_at']
        read_only_fields = ['course', 'created_at', 'updated_at']