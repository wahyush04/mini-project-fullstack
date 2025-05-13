
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Book, User, Clock, Award, Play } from "lucide-react";
import CourseLayout from "../components/layout/CourseLayout";
import { toast } from "sonner";
import { useCourse } from '../hooks/useCourse';
import { useCreateExam } from '../hooks/useExam';
import { useTryoutSectionDetail } from '../hooks/useTryoutSection';
import type { CreateExamRequestModel } from '../types/request/createExamRequest';
import { ExamStatusType } from "@/types/enum/ExamStatusType";

// Testimonial interface
interface Testimonial {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

interface CourseDetailModel {
  title: string;
  description: string;
  totalStudent: number;
  estimateTime: number;
  level: string;
  type: string;
  image: string;
  point: number
}

const CourseDetail = () => {
  const { courseId, type } = useParams();
  const userDataString = localStorage.getItem("user");
  let userData = null;
  if (userDataString) {
    userData = JSON.parse(userDataString);
  } else {
    console.log("No user data found in localStorage");
  }
  const navigate = useNavigate();
  const [uiState, setUiState] = useState<CourseDetailModel>({
    title: "",
    description: "",
    totalStudent: 0,
    estimateTime: 0,
    level: "",
    type: "",
    image: "",
    point: 0
  });
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const {
    result: createdExam,
    isLoading: isLoadingCreateExam,
    isError: isErrorCreateExam,
    errorMessage: errorMessageCreateExam,
    createExam: createNewExam,
    reset: resetCreateExam
  } = useCreateExam();

  const {
    tryoutSection,
    isLoading: isLoadingTryoutSection,
    isError: isErrorTryoutSection,
    errorMessage: errorMessageTryoutSection,
    getTryoutSectionbyId: fetchTryoutSection,
  } = useTryoutSectionDetail();

  const {
    course,
    isLoading,
    isError,
    errorMessage,
    fetchCourse,
    reset
  } = useCourse();

  useEffect(() => {
    if (course) {
      console.log("course 81", course);
      setUiState({
        title: course.data.title,
        description: course.data.description,
        totalStudent: course.data.data.totalStudent,
        estimateTime: course.data.data.estimateTime,
        level: course.data.data.level,
        type: type as any,
        image: course.data.data.image,
        point: course.data.data.point
      });
    } else if (tryoutSection) {
      setUiState({
        title: tryoutSection.data.title,
        description: tryoutSection.data.description,
        totalStudent: tryoutSection.data.data.totalStudent,
        estimateTime: tryoutSection.data.data.estimateTime,
        level: tryoutSection.data.data.level,
        type: type as any,
        image: tryoutSection.data.data.image,
        point: tryoutSection.data.data.point
      });
    }
    
  }, [course, type, fetchCourse, tryoutSection]);

  useEffect(() => {
    if (createdExam) {
      console.log("createdExam", createdExam);
      toast.success(`You've enrolled in ${uiState.title}`);
      const path = uiState?.type === "tryout"
        ? `/course/quiz/${courseId}`
        : `/course/material/${courseId}`;
  
      navigate(path, {
        state: {
          examId: createdExam.data.id,
          type: uiState.type,
          point: uiState.point
        }
      });
  
      resetCreateExam();
      reset();
    }
  }, [createdExam, uiState, courseId, navigate, reset, resetCreateExam]);

  useEffect(() => {
    console.log("type 104", type);
    if (type === "course" && courseId) {
      fetchCourse(courseId);
    } (type === "tryout" && courseId) && fetchTryoutSection(courseId);

    const mockTestimonials = [
      {
        id: 1,
        name: "Sarah Johnson",
        rating: 5,
        comment: "This course completely transformed my understanding of the subject. Highly recommended!",
        date: "2 weeks ago"
      },
      {
        id: 2,
        name: "Michael Chen",
        rating: 4,
        comment: "Great explanations and practical exercises. Would have given 5 stars but some sections felt rushed.",
        date: "1 month ago"
      },
      {
        id: 3,
        name: "Emma Wilson",
        rating: 5,
        comment: "Excellent course! The instructor explains complex topics in a simple, understandable way.",
        date: "2 months ago"
      }
    ];

    setTestimonials(mockTestimonials);
  }, [courseId, type, fetchCourse]); // Add dependencies

  const handleTakeCourse = () => {
    const request: CreateExamRequestModel = {
      userId: userData.userId,
      tag: 'exam',
      data: {
        status: ExamStatusType.IN_PROGRESS,
      },
    };
    createNewExam(request)
  };

  // if (createdExam) {
  //   toast.success(`You've enrolled in ${uiState.title}`);
  //   if (uiState?.type === "tryout") {
  //     navigate(`/course/quiz/${courseId}`,{
  //       state: {
  //         examId: createdExam.data.id,
  //         type: "tryout",
  //         point: uiState.point
  //       }
  //     });
  //     reset();
  //   } else {
  //     navigate(`/course/material/${courseId}`,{
  //       state: {
  //         examId: createdExam.data.id,
  //         type: "tryout",
  //         point: uiState.point
  //       }
  //     });
  //     reset();
  //   }
  // }

  if (isLoading || isLoadingTryoutSection) {
    return <div>Loading courses...</div>;
  }

  if (isError || isErrorTryoutSection) {
    return <div className="text-red-500">{errorMessage}</div>;
  }

  if (type === "tryout" && !tryoutSection) {
    return null
  } else if (type === "course" && !course) {
    return null
  }

  return (
    <CourseLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-pos-text-dark mb-4">{uiState.title}</h1>
            <p className="text-lg text-pos-neutral mb-6">{uiState.description}</p>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
                  <Award size={16} />
                  <span>Intermediate</span>
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
                  <User size={16} />
                  <span>1,245 Students</span>
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
                  <Clock size={16} />
                  <span>12 Hours</span>
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
                  <Book size={16} />
                  <span>{uiState.type === "tryout" ? "Quiz" : "Self-paced"}</span>
                </Badge>
              </div>
            </div>

            <Button onClick={handleTakeCourse} className="bg-primary flex items-center gap-2">
              <Play size={16} />
              {uiState.type === "tryout" ? "Take This Quiz" : "Take This Course"}
            </Button>
          </div>

          <div className="aspect-video overflow-hidden bg-gray-100 rounded-lg mb-8">
            {uiState.image ? (
              <img
                src={uiState.image}
                alt={uiState.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-200">
                <span className="text-gray-500">No course preview available</span>
              </div>
            )}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Course Description</h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-pos-neutral">
              {uiState.description || "This course will teach you everything you need to know about this subject. Join thousands of students who have already benefited from this comprehensive learning experience."}
            </p>

            {/* Debug information - remove in production */}
            <div className="mt-4 p-2 bg-gray-100 rounded text-xs">
              <p>Course ID: {uiState.title}</p>
              <p>Course Type: {uiState.type || "Not specified"}</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Student Testimonials</h2>
          <div className="space-y-4">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{testimonial.name}</h3>
                  <span className="text-xs text-gray-500">{testimonial.date}</span>
                </div>
                <div className="flex items-center mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`h-4 w-4 ${i < testimonial.rating ? 'text-primary' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-pos-neutral text-sm">{testimonial.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CourseLayout>
  );
};

export default CourseDetail;
