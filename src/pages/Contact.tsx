import React from "react";
import { ContactInfo } from "../components/ContactInfo";
import { ContactForm } from "../components/ContactForm";
import { ScheduleCall } from "../components/ScheduleCall";

export const Contact: React.FC = () => (
  <main className="p-8 bg-gray-50 min-h-screen">
    <div className="my-16">
      <ContactForm />
    </div>
    <div className="my-16">
      <ScheduleCall />
    </div>
    <div className="my-16">
      <ContactInfo />
    </div>
  </main>
);