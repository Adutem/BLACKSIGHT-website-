import React from 'react';

interface StepCardProps {
  title: string;
  description: string;
  image: string;
}

export const StepCard: React.FC<StepCardProps> = ({ title, description, image }) => (
  <div className="flex flex-col md:flex-row items-center mb-12">
    <div className="md:w-1/2 px-6">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
    <div className="md:w-1/2 flex justify-center px-6">
      <img src={image} alt={title} className="rounded-lg shadow-lg w-full max-w-md" />
    </div>
  </div>
);