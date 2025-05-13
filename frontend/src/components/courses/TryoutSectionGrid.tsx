import React from 'react';
import CourseCard from './CourseCard';
import { useTryoutSection } from '../../hooks/useTryoutSection';

const CourseGridTryout: React.FC = () => {
  const {
    tryoutSections,
    isLoading,
    isError,
    errorMessage,
    status
  } = useTryoutSection();

  if (isLoading) {
    return <div>Loading tryouts...</div>;
  }

  if (isError) {
    return <div className="text-red-500">{errorMessage}</div>;
  }

  if (!tryoutSections?.data.length) {
    return (
      <div className="text-center p-8 border border-dashed rounded-lg">
        <p className="text-gray-500">No tryout sections available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tryoutSections.data.map((tryout) => (
        <CourseCard key={tryout.id} tryouts={tryout} type="tryout" />
      ))}
    </div>
  );
};

export default CourseGridTryout;
