 import React, { useEffect, useRef } from "react";

import { ContactInfo } from "../components/ContactInfo";

import { ContactForm } from "../components/ContactForm";

import { ScheduleCall } from "../components/ScheduleCall";



export const Contact: React.FC = () => {

  const sectionRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];



  useEffect(() => {

    const observerOptions = {

      root: null,

      rootMargin: "0px",

      threshold: 0.1

    };



    const observer = new IntersectionObserver((entries) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("animate-in");

        }

      });

    }, observerOptions);



    sectionRefs.forEach(ref => {

      if (ref.current) {

        observer.observe(ref.current);

      }

    });



    return () => {

      sectionRefs.forEach(ref => {

        if (ref.current) {

          observer.unobserve(ref.current);

        }

      });

    };

  }, []);



  return (

    <>

      <style jsx>{`

        @keyframes slideInFromTop {

          0% {

            opacity: 0;

            transform: translateY(-80px) rotateX(-90deg);

          }

          100% {

            opacity: 1;

            transform: translateY(0) rotateX(0);

          }

        }



        @keyframes slideInFromLeft {

          0% {

            opacity: 0;

            transform: translateX(-80px) rotateY(-45deg);

          }

          100% {

            opacity: 1;

            transform: translateX(0) rotateY(0);

          }

        }



        @keyframes slideInFromRight {

          0% {

            opacity: 0;

            transform: translateX(80px) rotateY(45deg);

          }

          100% {

            opacity: 1;

            transform: translateX(0) rotateY(0);

          }

        }



        @keyframes shake {

          0%, 100% {

            transform: translateX(0);

          }

          10%, 30%, 50%, 70%, 90% {

            transform: translateX(-3px);

          }

          20%, 40%, 60%, 80% {

            transform: translateX(3px);

          }

        }



        @keyframes glow {

          0% {

            box-shadow: 0 0 3px rgba(173, 216, 230);

          }

          50% {

            box-shadow: 0 0 10px #88f3ee93), 0 0 15px rgba(59, 130,rgb(173, 216, 230,)

          }

          100% {

            box-shadow: 0 0 3px rgba(173, 216, 230);

          }

        }



        @keyframes wiggle {

          0%, 7% {

            transform: rotateZ(0);

          }

          15% {

            transform: rotateZ(-8deg);

          }

          20% {

            transform: rotateZ(6deg);

          }

          25% {

            transform: rotateZ(-6deg);

          }

          30% {

            transform: rotateZ(3deg);

          }

          35% {

            transform: rotateZ(-2deg);

          }

          40%, 100% {

            transform: rotateZ(0);

          }

        }



        @keyframes rotate {

          0% {

            transform: rotate(0deg);

          }

          100% {

            transform: rotate(360deg);

          }

        }



        .section-container {

          opacity: 0;

          transition: opacity 0.5s ease;

        }



        .section-container.animate-in {

          opacity: 1;

        }



        .section-1.animate-in {

          animation: slideInFromTop 1.2s ease-out forwards, shake 1.5s ease-in-out 1.2s;

        }



        .section-2.animate-in {

          animation: slideInFromLeft 1.2s ease-out forwards, glow 6s ease-in-out 1.2s infinite;

        }



        .section-3.animate-in {

          animation: slideInFromRight 1.2s ease-out forwards, wiggle 1.5s ease-in-out 1.2s;

        }



        .section-container:hover {

          transform: scale(1.01);

          transition: transform 0.5s ease;

        }



        .section-1:hover {

          animation: shake 2s ease-in-out infinite;

        }



        .section-2:hover {

          animation: glow 4s ease-in-out infinite;

        }



        .section-3:hover {

          animation: wiggle 2s ease-in-out infinite;

        }



        .section-container::before {

          content: '';

          position: absolute;

          top: 0;

          left: 0;

          width: 100%;

          height: 100%;

          background: linear-gradient(135deg, rgb(173, 216, 230), rgb((173, 216, 230));

          border-radius: inherit;

          opacity: 0;

          transition: opacity 0.5s ease;

          z-index: -1;

        }



        .section-container:hover::before {

          opacity: 1;

        }



        .section-container::after {

          content: '';

          position: absolute;

          top: -2px;

          left: -2px;

          right: -2px;

          bottom: -2px;

          background: linear-gradient(45deg, #add8e6, #add8e6, rgba(247, 247, 247, 1), #98e1faff);

          border-radius: inherit;

          z-index: -1;

          opacity: 0;

          transition: opacity 0.5s ease;

          background-size: 400% 400%;

          animation: rotate 25s linear infinite;

        }



        .section-container:hover::after {

          opacity: 1;

        }



        .section-title {

          position: relative;

          display: inline-block;

        }



        .section-title::after {

          content: '';

          position: absolute;

          bottom: -5px;

          left: 0;

          width: 0;

          height: 3px;

          background: linear-gradient(90deg, #a8e2f5ff, rgba(109, 196, 236, 1));

          transition: width 0.8s ease;

        }



        .section-container:hover .section-title::after {

          width: 100%;

        }



        .form-field {

          position: relative;

          margin-bottom: 1.5rem;

        }



        .form-field::before {

          content: '';

          position: absolute;

          left: -10px;

          top: 50%;

          transform: translateY(-50%);

          width: 4px;

          height: 4px;

          border-radius: 50%;

          background: #8fd8f0ff;

          opacity: 0;

          transition: opacity 0.5s ease;

        }



        .section-container:hover .form-field::before {

          opacity: 1;

        }



        .contact-item {

          position: relative;

          padding-left: 30px;

          margin-bottom: 1rem;

        }



        .contact-item::before {

          content: '';

          position: absolute;

          left: 0;

          top: 50%;

          transform: translateY(-50%);

          width: 12px;

          height: 12px;

          border-radius: 50%;

          background: #6da3e6ff;

          opacity: 0;

          transition: opacity 0.5s ease;

        }



        .section-container:hover .contact-item::before {

          opacity: 1;

        }



        .schedule-item {

          position: relative;

          padding-left: 30px;

          margin-bottom: 1rem;

        }



        .schedule-item::before {

          content: '';

          position: absolute;

          left: 0;

          top: 50%;

          transform: translateY(-50%);

          width: 0;

          height: 0;

          border-radius: 50%;

          border: 2px solid #60a5fa;

          opacity: 0;

          transition: all 0.8s ease;

        }



        .section-container:hover .schedule-item::before {

          opacity: 1;

          width: 12px;

          height: 12px;

        }



        .button {

          position: relative;

          overflow: hidden;

          z-index: 1;

        }



        .button::before {

          content: '';

          position: absolute;

          top: 0;

          left: -100%;

          width: 100%;

          height: 100%;

          background: linear-gradient(90deg, transparent, rgb(173, 216, 230), transparent);

          z-index: -1;

          transition: left 0.8s;

        }



        .button:hover::before {

          left: 100%;

        }



        /* Mobile responsiveness adjustments */

        @media (max-width: 640px) {

          .section-container {

            padding: 4px;

          }



          .section-1.animate-in {

            animation: slideInFromTop 0.8s ease-out forwards, shake 1s ease-in-out 0.8s;

          }



          .section-2.animate-in {

            animation: slideInFromLeft 0.8s ease-out forwards, glow 4s ease-in-out 0.8s infinite;

          }



          .section-3.animate-in {

            animation: slideInFromRight 0.8s ease-out forwards, wiggle 1s ease-in-out 0.8s;

          }



          .section-1:hover {

            animation: shake 1.5s ease-in-out infinite;

          }



          .section-2:hover {

            animation: glow 3s ease-in-out infinite;

          }



          .section-3:hover {

            animation: wiggle 1.5s ease-in-out infinite;

          }



          .my-16 {

            margin-top: 1rem;

            margin-bottom: 1rem;

          }



          .section-container::after {

            top: -1px;

            left: -1px;

            right: -1px;

            bottom: -1px;

          }



          .section-title::after {

            height: 2px;

          }



          .form-field::before {

            width: 3px;

            height: 3px;

          }



          .contact-item {

            padding-left: 20px;

          }



          .contact-item::before {

            width: 10px;

            height: 10px;

          }



          .schedule-item {

            padding-left: 20px;

          }



          .schedule-item::before {

            width: 10px;

            height: 10px;

          }

        }

      `}</style>



      <main className="p-2 sm:p-8 bg-gray-50 min-h-screen">

        <div

          ref={sectionRefs[0]}

          className="section-container section-1 my-4 sm:my-16 p-2 sm:p-8 bg-white rounded-lg sm:rounded-xl shadow-lg relative overflow-hidden transition-all duration-500"

        >

          <ContactForm />

        </div>

       

        <div

          ref={sectionRefs[1]}

          className="section-container section-2 my-4 sm:my-16 p-2 sm:p-8 bg-white rounded-lg sm:rounded-xl shadow-lg relative overflow-hidden transition-all duration-500">
          <ScheduleCall />

        </div>
       

        <div
          ref={sectionRefs[2]}
          className="section-container section-3 my-4 sm:my-16 p-2 sm:p-8 bg-white rounded-lg sm:rounded-xl shadow-lg relative overflow-hidden transition-all duration-500"

        >
          <ContactInfo />
        </div>
      </main>
    </>
  );

};