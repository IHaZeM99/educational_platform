from rest_framework import serializers

from .models import Enrollment
from courses.serializers import CourseSerializer


class EnrollmentSerializer(serializers.ModelSerializer):
    course = CourseSerializer()

    class Meta:
        model = Enrollment
        fields = '__all__'