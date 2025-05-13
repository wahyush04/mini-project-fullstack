
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../components/pos/ProductCard";
import CourseLayout from "../components/layout/CourseLayout";
import CourseGrid from "../components/courses/CourseGrid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import CourseGridTryout from "@/components/courses/TryoutSectionGrid";

const Dashboard = () => {
  const [courses, setCourses] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<string>("courses");
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    console.log("pos", user.role)

    if (!user.role) {
      navigate("/login");
    } else if (user.role === "admin") {
      navigate("/admin");
    }

    
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };


  return (
    <CourseLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">E-Learning Platform</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Logout
          </button>
        </div>

        <Tabs defaultValue="courses" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="tryouts">Tryouts</TabsTrigger>
          </TabsList>
          <TabsContent value="courses" className="mt-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Available Courses</h2>
              <p className="text-pos-neutral mb-4">Select a course to learn more</p>
              <CourseGrid />
            </div>
          </TabsContent>
          <TabsContent value="tryouts" className="mt-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Available Tryouts</h2>
              <p className="text-pos-neutral mb-4">Test your knowledge with these tryouts</p>
              <CourseGridTryout />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </CourseLayout>
  );
};

export default Dashboard;
