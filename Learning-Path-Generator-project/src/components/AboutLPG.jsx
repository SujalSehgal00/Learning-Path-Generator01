
import React from "react";

const steps = [
  {
    number: "01",
    title: "Define Your Learning Goals",
    description:
      "Tell us about your desired career, current skills, experience level and available study time.",
    color: "bg-[#fbe5d6]",
  },
  {
    number: "02",
    title: "Get Your AI-Powered Roadmap",
    description:
      "Our AI analyzes your information and assessment answers to create a personalized learning journey.",
    color: "bg-[#ece6ff]",
  },
  {
    number: "03",
    title: "Learn, Track and Grow",
    description:
      "Follow structured milestones, explore recommended resources and track your learning progress.",
    color: "bg-[#fff2cc]",
  },
];

const features = [
  {
    icon: "🎯",
    title: "Personalized Learning",
    description: "Learning roadmaps designed around your career goals and current skill level.",
    color: "bg-amber-200",
  },
  {
    icon: "🧠",
    title: "AI-Powered Guidance",
    description: "Intelligent recommendations that help you identify what to learn next.",
    color: "bg-amber-300",
  },
  {
    icon: "📋",
    title: "Skill Assessment",
    description: "Evaluate your existing knowledge through career-focused assessments.",
    color: "bg-amber-400",
  },
  {
    icon: "📈",
    title: "Progress Tracking",
    description: "Monitor completed milestones and stay focused on your learning goals.",
    color: "bg-amber-300",
  },
  {
    icon: "👤",
    title: "Learning Profile",
    description: "Manage your learning interests, career objectives and study preferences.",
    color: "bg-amber-200",
  },
  {
    icon: "📄",
    title: "Export Your Roadmap",
    description: "Print or save your personalized learning journey as a PDF.",
    color: "bg-amber-400",
  },
];

const AboutLPG = () => {
  return (
    <div className="w-full bg-[#F0EFED] py-12 px-6 sm:px-12 lg:px-20 text-center mt-4">

      {/* How EducateU Works */}
      <section className="pt-10 max-w-6xl mx-auto">
        <header className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
            How EducateU Works
          </h2>

          <p className="text-slate-600 text-lg">
            Three simple steps to transform your career ambitions
            into a personalized learning roadmap.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-20">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`${step.color} p-8 rounded-2xl border border-slate-200 shadow-md flex flex-col justify-between min-h-[260px]`}
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-3xl font-extrabold text-slate-700">
                    {step.number}
                  </span>

                  <span className="bg-black text-white w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm">
                    {Number(step.number)}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {step.title}
                </h3>

                <p className="text-slate-700 text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EducateU Features */}
      <section className="pt-10 max-w-5xl mx-auto">
        <header className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-slate-800">
            Everything You Need to Grow
          </h2>

          <p className="text-slate-600 text-lg">
            Explore the tools that make your learning journey
            more structured, focused and achievable.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col p-6 bg-white shadow-md rounded-xl border border-slate-200 hover:shadow-lg transition-all"
            >
              <div className={`w-11 h-11 rounded-xl ${feature.color} mb-4 flex items-center justify-center text-xl`}>
                {feature.icon}
              </div>

              <h3 className="text-lg font-bold text-slate-800 mb-3">
                {feature.title}
              </h3>

              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutLPG;
