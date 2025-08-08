import React from 'react';
import { StepCard } from '../components/StepCard';

const steps = [
  {
    title: 'AI AUDIT',
    description: 'Once you book your free consultation, our team will assess the best AI opportunities for your business. From there, we’ll work with you to create a custom build plan.',
    image: './assets/audit.png',
  },
  {
    title: 'BUILD',
    description: 'After establishing the initial architecture, we will handle the technical process of creating and integrating your personalized AI voice solution into your business',
    image: './assets/build.png',
  },
  {
    title: 'Handover',
    description: 'Now it’s your turn, test your new AI employee and relax while it handles the work for you.',
    image: './assets/handover.png',
  },
];

export const JourneySteps: React.FC = () => (
  <section className="bg-white py-6 sm:py-12 px-2 sm:px-4 overflow-hidden">
    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-10">Your Journey, Step by Step</h2>
    <div className="space-y-12 sm:space-y-16"> {/* Increased vertical spacing between steps */}
      {steps.map((step, i) => (
        <StepCard key={i} {...step} index={i} />
      ))}
    </div>
  </section>
);

export default JourneySteps;
