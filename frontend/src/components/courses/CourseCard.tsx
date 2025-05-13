
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Link } from 'react-router-dom';
import type { CourseModel } from "@/types/model/course.type";
import type { TryoutSectionModel } from "@/types/model/tryout.section.type";

interface CourseCardProps {
  course?: (CourseModel & { description?: string; type?: string }) | null;
  tryouts?: TryoutSectionModel | null;
  type: "course" | "tryout";
}

interface Card {
  title: string;
  description: string;
  type: string;
  courseId: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, tryouts, type }) => {
  console.log('type', type);
  const data = type === "tryout"
    ? { title: tryouts?.title, description: tryouts?.description, type, courseId: tryouts?.id }
    : { title: course?.title, description: course?.description, type, courseId: course?.id };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle>{data?.title}</CardTitle>
        <CardDescription>{data?.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="text-sm text-gray-500">
          {type === "course" ? "Full Course" : "Practice Tryout"}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Link to={type === "course" ? `/course/${data.courseId}/${type}` : `/course/${data.courseId}/${type}`} className="w-full">
          <Button variant="outline" className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
