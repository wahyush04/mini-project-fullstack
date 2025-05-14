
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getProducts } from "../lib/productService";
import type { Product } from "../components/pos/ProductCard";
import { Button } from "../components/ui/button";
import { ScrollArea } from "../components/ui/scroll-area";
import { ChevronRight, BookOpen } from "lucide-react";
import { toast } from "sonner";
import CourseLayout from "../components/layout/CourseLayout";
import { useCreateLog } from "@/hooks/useLog";
import type { CreateLogRequest } from "@/types/request/createLogRequest";

// Interface for course materials
interface Material {
  id: number;
  title: string;
  content: string;
}

// Interface for course sections
interface CourseSection {
  id: number;
  title: string;
  materials: Material[];
}

const CourseMaterial = () => {
  const { courseId } = useParams();
  const { state } = useLocation();
  const { examId, type, point } = state ?? {};
  const navigate = useNavigate();
  const [courseSections, setCourseSections] = useState<CourseSection[]>([]);
  const [activeSection, setActiveSection] = useState<number>(0);
  const [activeMaterial, setActiveMaterial] = useState<number>(0);
  const userDataString = localStorage.getItem("user");
  let userData = null;
  if (userDataString) {
    userData = JSON.parse(userDataString);
  } else {
    console.log("No user data found in localStorage");
  }

  const {
    createLogResponse,
    isLoading,
    isError,
    errorMessage,
    createLog,
    reset
  } = useCreateLog();

  useEffect(() => {

    const mockSections = [
      {
        id: 1,
        title: "Introduction",
        materials: [
          { id: 1, title: "Course Overview", content: "This course will teach you everything you need to know about this subject. We'll start with the basics and move on to more advanced topics." },
          { id: 2, title: "Getting Started", content: "To get started with this course, make sure you have all the prerequisites. You'll need a basic understanding of the fundamentals." },
        ]
      },
      {
        id: 2,
        title: "Fundamentals",
        materials: [
          { id: 3, title: "Core Concepts", content: "In this section, we'll cover the core concepts that form the foundation of this subject. Understanding these concepts is crucial for success in the later sections." },
          { id: 4, title: "Basic Techniques", content: "Here, we'll explore some basic techniques that you can use to solve common problems in this field." },
        ]
      },
      {
        id: 3,
        title: "Advanced Topics",
        materials: [
          { id: 5, title: "Advanced Strategies", content: "Now that you understand the basics, let's dive into more advanced strategies. These strategies will help you tackle complex problems efficiently." },
          { id: 6, title: "Final Assessment", content: "Congratulations on reaching the end of this course! In this final section, we'll review everything you've learned and discuss how to apply this knowledge in real-world scenarios." },
        ]
      }
    ];

    setCourseSections(mockSections);
  }, [courseId, navigate]);

  const handleMaterialSelect = (sectionIndex: number, materialIndex: number) => {
    setActiveSection(sectionIndex);
    setActiveMaterial(materialIndex);
  };

  const handleFinishCourse = () => {
    const request: CreateLogRequest = {
      data: {
        userId: userData.userId,
        code: "COMPLETE_COURSE",
        action: "finish",
        description: "Course completed",
        data: {
          point: point
        }
      },
      examId: examId
    }
    createLog(request)
  };

  const isLastMaterial = () => {
    if (courseSections.length === 0) return false;

    const isLastSection = activeSection === courseSections.length - 1;
    const currentSection = courseSections[activeSection];

    if (!currentSection) return false;

    const isLastMaterialInSection = activeMaterial === currentSection.materials.length - 1;

    return isLastSection && isLastMaterialInSection;
  };

  if (createLogResponse) {
    toast.success(`Congratulations! You've completed the course`);
    navigate("/pos");
    reset();
  }

  if (courseSections.length === 0) return null;


  const currentSection = courseSections[activeSection];
  const currentMaterial = currentSection?.materials[activeMaterial];

  return (
    <CourseLayout>
      <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto">
        {/* Side navigation */}
        <div className="w-full md:w-1/4">
          <div className="bg-white rounded-lg shadow-sm p-4 sticky top-20">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <BookOpen size={18} />
              Course Content
            </h3>
            <ScrollArea className="h-[calc(100vh-220px)]">
              {courseSections.map((section, sectionIndex) => (
                <div key={section.id} className="mb-4">
                  <h4 className="font-medium text-sm text-gray-700 mb-2">{section.title}</h4>
                  <ul className="space-y-1">
                    {section.materials.map((material, materialIndex) => (
                      <li key={material.id}>
                        <button
                          onClick={() => handleMaterialSelect(sectionIndex, materialIndex)}
                          className={`w-full text-left px-3 py-2 text-sm rounded-md flex items-center ${activeSection === sectionIndex && activeMaterial === materialIndex
                              ? "bg-primary text-white"
                              : "hover:bg-gray-100"
                            }`}
                        >
                          <ChevronRight size={16} className="mr-1 flex-shrink-0" />
                          <span className="truncate">{material.title}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </ScrollArea>
          </div>
        </div>

        {/* Main content */}
        <div className="w-full md:w-3/4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-2 text-sm text-gray-500">
              {currentSection?.title} / {currentMaterial?.title}
            </div>
            <h2 className="text-2xl font-bold mb-6">{currentMaterial?.title}</h2>
            <div className="prose max-w-none">
              <p className="text-gray-700">{currentMaterial?.content}</p>
            </div>

            {isLastMaterial() && (
              <div className="mt-8 pt-6 border-t border-gray-100">
                <Button onClick={handleFinishCourse} className="bg-primary">
                  Finish Course
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </CourseLayout>
  );
};

export default CourseMaterial;
