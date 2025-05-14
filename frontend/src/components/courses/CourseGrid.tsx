import CourseCard from './CourseCard';
import { useCourses } from '../../hooks/useCourses';
import { Loader2 } from 'lucide-react';

const CourseGrid = () => {
  const {
    courses,
    isLoading,
    isError,
    errorMessage  
  } = useCourses();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-gray-500" size={24} />
      </div>
    );
  }

  if (isError) {
    return <div className="text-red-500">{errorMessage}</div>;
  }

  if (!courses?.data.length) {
    return (
      <div className="text-center p-8 border border-dashed rounded-lg">
        <p className="text-gray-500">No courses available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {courses.data.map((course) => (
        <CourseCard key={course.id} course={course} type="course" />
      ))}
    </div>
  );
};

export default CourseGrid;
