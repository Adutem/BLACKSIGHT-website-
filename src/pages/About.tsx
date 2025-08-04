import React from "react";
import { WhatSetsUsApart } from "../components/WhatSetsUsApart";
import { OurMission } from "../components/OurMission";
import { AboutBlacksightAI } from "../components/AboutBlacksightAI";

export const About: React.FC = () => (
  <main className="p-8 bg-gray-50 min-h-screen">
    <div className="my-16">
      <AboutBlacksightAI />
    </div>
    <div className="my-16">
      <OurMission />
    </div>
    <div className="my-16">
      <WhatSetsUsApart />
    </div>
  </main>
);