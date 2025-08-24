from rest_framework.serializers import ModelSerializer
from accounts.serializers import UserSerializer
from .models import Course, Lesson

class CourseSerializer(ModelSerializer):
    instructor = UserSerializer(read_only=True)

    class Meta:
        model = Course
        fields = '__all__'


class LessonSerializer(ModelSerializer):
    class Meta:
        model = Lesson
        fields = '__all__'