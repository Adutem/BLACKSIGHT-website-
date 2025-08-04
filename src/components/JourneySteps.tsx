import React from 'react';
import { StepCard } from './StepCard';

const steps = [
  {
    title: 'AI AUDIT',
    description: 'Once you book your free consultation, our team will assess the best AI opportunities for your business. From there, we’ll work with you to create a custom build plan.',
    image: '/assets/audit.png', // Replace with your illustration
  },
  {
    title: 'BUILD',
    description: 'After establishing the initial architecture, we will handle the technical process of creating and integrating your personalized AI voice solution into your business',
    image: '/assets/build.png', // Replace with your illustration
  },
  {
    title: 'Handover',
    description: 'Now it’s your turn, test your new AI employee and relax while it handles the work for you.',
    image: '/assets/handover.png', // Replace with your illustration
  }
];

export const JourneySteps: React.FC = () => (
  <section className="bg-white py-12 px-4">
    <h2 className="text-3xl font-bold text-center mb-10">Your Journey, Step by Step</h2>
    <div>
      {steps.map((step, i) => (
        <StepCard key={i} {...step} />
      ))}
    </div>
  </section>
);