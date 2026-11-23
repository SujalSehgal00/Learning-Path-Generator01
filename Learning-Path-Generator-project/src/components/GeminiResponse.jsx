
import { useState, useEffect } from "react";
import { useAppContext } from "./../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import Gemini from "./GeminiPrompt";

// Default resources if AI does not provide any
const fallbackResources = [
  "freeCodeCamp — Responsive Web Design certification",
  "The Odin Project — Foundations course",
  "React Official Documentation",
];

// Safely parse Gemini's JSON response
const parseRoadmapResponse = (rawResponse) => {
  if (!rawResponse) return null;

  if (typeof rawResponse === "object") {
    return rawResponse;
  }

  if (typeof rawResponse !== "string") return null;

  let cleaned = rawResponse.trim();

  cleaned = cleaned
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();

  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");

  if (firstBrace !== -1 && lastBrace > firstBrace) {
    cleaned = cleaned.slice(firstBrace, lastBrace + 1);
  }

  try {
    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Unable to parse Gemini response:", error);
    return null;
  }
};

const GeminiResponse = () => {
  const { response, loading } = useAppContext();
  const navigate = useNavigate();

  // Track completed learning stages
  const [completedStages, setCompletedStages] = useState(() => {
    try {
      const saved = sessionStorage.getItem("completedStages");
      const parsed = saved ? JSON.parse(saved) : [];

      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    sessionStorage.setItem(
      "completedStages",
      JSON.stringify(completedStages)
    );
  }, [completedStages]);

  // Save AI response for page refresh
  useEffect(() => {
    if (response) {
      sessionStorage.setItem(
        "ai_path_response",
        typeof response === "string"
          ? response
          : JSON.stringify(response)
      );
    }
  }, [response]);

  // Read the AI-generated roadmap
  const rawData =
    response || sessionStorage.getItem("ai_path_response");

  const data = parseRoadmapResponse(rawData);

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-[#347A65] border-t-transparent"></div>

        <h1 className="mt-5 text-xl font-bold text-[#123D35]">
          Creating your personalized learning roadmap...
        </h1>

        <p className="mt-2 text-slate-500">
          EducateU is organizing your learning journey.
        </p>
      </div>
    );
  }

  // Error screen
  if (!data || !Array.isArray(data.stages)) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-5">
        <div className="max-w-xl w-full bg-white border border-slate-200 rounded-3xl p-8 text-center shadow-md">

          <div className="text-5xl mb-5">📚</div>

          <h2 className="text-2xl font-bold text-[#123D35]">
            Your roadmap is not available yet
          </h2>

          <p className="text-slate-600 mt-3">
            We could not load your learning roadmap.
            Please try generating it again.
          </p>

          <div className="mt-5">
            <Gemini />
          </div>

          <Link
            to="/"
            className="inline-block mt-4 text-[#347A65] font-semibold hover:underline"
          >
            Return Home
          </Link>

        </div>
      </div>
    );
  }

  const stages = data.stages;

  const recommendedResources =
    Array.isArray(data.recommendedResources) &&
    data.recommendedResources.length > 0
      ? data.recommendedResources
      : fallbackResources;

  const skillsCount =
    Number(data.skillsCovered) ||
    stages.reduce(
      (total, stage) =>
        total +
        (Array.isArray(stage.skills) ? stage.skills.length : 0),
      0
    );

  const completedCount = stages.filter((_, index) =>
    completedStages.includes(index)
  ).length;

  const progressPercentage =
    stages.length > 0
      ? Math.round((completedCount / stages.length) * 100)
      : 0;

  // Toggle stage completion
  const toggleStage = (index) => {
    setCompletedStages((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  // Print or export as PDF
  const handleExportPDF = () => {
    window.print();
  };

  // Create a new roadmap
  const handleCreateNewPath = () => {
    sessionStorage.removeItem("ai_path_response");
    sessionStorage.removeItem("completedStages");

    navigate("/learning-path");
  };

  return (
    <main className="max-w-[1206px] mx-auto px-5 sm:px-6 py-8 text-slate-900 font-sans">

      {/* Home Navigation */}
      <div className="mb-6 flex justify-between items-center">

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl shadow-sm hover:bg-slate-50 transition"
        >
          ← Home
        </Link>

        <span className="text-sm font-bold text-[#347A65]">
          EducateU
        </span>

      </div>

      {/* Roadmap Overview */}
      <section className="rounded-3xl bg-[#123D35] px-6 py-8 sm:px-9 sm:py-9 text-white shadow-lg">

        <span className="inline-block text-sm font-semibold text-[#D3E9DB] bg-white/10 px-4 py-2 rounded-full">
          Your Personalized Learning Journey
        </span>

        <h1 className="mt-5 text-3xl sm:text-4xl font-extrabold tracking-tight">
          {data.title || "Your Career Roadmap"}
        </h1>

        <p className="text-[#D3E9DB] mt-3 max-w-2xl leading-relaxed">
          {data.summary || "Your personalized learning journey, designed around your career goals."}
        </p>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-6">

          <div>
            <div className="text-2xl font-extrabold">
              {data.estimatedDuration || "N/A"}
            </div>
            <div className="text-xs uppercase tracking-wider text-[#C6DDD1] mt-1">
              Timeline
            </div>
          </div>

          <div>
            <div className="text-2xl font-extrabold">
              {stages.length}
            </div>
            <div className="text-xs uppercase tracking-wider text-[#C6DDD1] mt-1">
              Stages
            </div>
          </div>

          <div>
            <div className="text-2xl font-extrabold">
              {skillsCount}
            </div>
            <div className="text-xs uppercase tracking-wider text-[#C6DDD1] mt-1">
              Skills Covered
            </div>
          </div>

        </div>
      </section>

      {/* Learning Progress */}
      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="mb-4 flex items-center justify-between gap-3">

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Your Learning Progress
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Keep moving towards your career goal.
            </p>
          </div>

          <span className="text-2xl font-extrabold text-[#27665C]">
            {progressPercentage}%
          </span>

        </div>

        <div
          className="h-3 w-full overflow-hidden rounded-full bg-slate-200"
          role="progressbar"
          aria-label="Roadmap completion"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progressPercentage}
        >
          <div
            className="h-full rounded-full bg-[#347A65] transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <div className="mt-3 flex justify-between text-sm">

          <span className="text-slate-600">
            {completedCount} of {stages.length} stages completed
          </span>

          <span className="font-semibold text-[#27665C]">
            {stages.length - completedCount} remaining
          </span>

        </div>

      </section>

      {/* Learning Roadmap */}
      <section className="mt-10">

        <div className="mb-7">
          <p className="text-sm font-semibold text-[#347A65] uppercase tracking-wider">
            Your Career Journey
          </p>

          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900">
            Your Learning Roadmap
          </h2>

          <p className="text-slate-600 mt-2">
            Follow each stage and complete your learning milestones.
          </p>
        </div>

        <div className="relative ml-3 border-l-2 border-[#C8DDD0] pl-7 sm:pl-9">

          {stages.map((stage, index) => {
            const isCompleted = completedStages.includes(index);

            const skills = Array.isArray(stage.skills)
              ? stage.skills
              : [];

            const topics = Array.isArray(stage.topics)
              ? stage.topics
              : [];

            return (
              <article
                key={`${stage.title}-${index}`}
                className="relative pb-8 last:pb-0"
              >

                {/* Completion Button */}
                <button
                  type="button"
                  onClick={() => toggleStage(index)}
                  aria-label={
                    isCompleted
                      ? `Mark ${stage.title} as incomplete`
                      : `Mark ${stage.title} as complete`
                  }
                  aria-pressed={isCompleted}
                  className={`absolute -left-[3.15rem] sm:-left-[3.65rem] top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full text-base font-bold text-white shadow-md transition-all hover:scale-105 ${
                    isCompleted
                      ? "bg-[#347A65]"
                      : "bg-[#123D35]"
                  }`}
                >
                  {isCompleted ? "✓" : index + 1}
                </button>

                {/* Stage Card */}
                <div
                  className={`rounded-2xl border p-5 sm:p-7 shadow-sm transition-all ${
                    isCompleted
                      ? "border-[#B9D8C8] bg-[#F1F8F3]"
                      : "border-slate-200 bg-white hover:shadow-md"
                  }`}
                >

                  {/* Stage Header */}
                  <div className="flex flex-wrap justify-between items-center gap-3 mb-3">

                    <span className="text-sm font-semibold text-[#347A65]">
                      {stage.weekLabel || `Stage ${index + 1}`}
                    </span>

                    {stage.estimatedHours !== undefined &&
                      stage.estimatedHours !== null && (
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFF2CC] text-slate-800 text-xs font-semibold">
                          ⏱ {stage.estimatedHours} hours
                        </span>
                      )}

                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                    {stage.title}
                  </h3>

                  <p className="mt-3 text-base leading-7 text-slate-600">
                    {stage.description}
                  </p>

                  {/* Topics */}
                  {topics.length > 0 && (
                    <div className="mt-6">

                      <h4 className="text-sm font-bold text-slate-800 mb-3">
                        📖 Topics to Learn
                      </h4>

                      <ul className="space-y-2">

                        {topics.map((topic, topicIndex) => (
                          <li
                            key={`${topic}-${topicIndex}`}
                            className="flex items-start gap-2 text-sm text-slate-600"
                          >
                            <span className="text-[#347A65] font-bold">✓</span>
                            {topic}
                          </li>
                        ))}

                      </ul>
                    </div>
                  )}

                  {/* Skills */}
                  {skills.length > 0 && (
                    <div className="mt-6">

                      <h4 className="text-sm font-bold text-slate-800 mb-3">
                        Skills You'll Develop
                      </h4>

                      <div className="flex flex-wrap gap-2">

                        {skills.map((skill, skillIndex) => (
                          <span
                            key={`${skill}-${skillIndex}`}
                            className="inline-flex items-center rounded-full bg-[#DFEAE5] px-3 py-1.5 text-xs font-semibold text-[#1D5D50]"
                          >
                            {skill}
                          </span>
                        ))}

                      </div>
                    </div>
                  )}

                  {/* Practical Project */}
                  {stage.project && (
                    <div className="mt-6 rounded-xl border border-[#EADDC5] bg-[#FFF8E9] p-4">

                      <h4 className="text-sm font-bold text-slate-800 mb-2">
                        🚀 Practical Project
                      </h4>

                      <p className="text-sm text-slate-700 leading-relaxed">
                        {stage.project}
                      </p>

                    </div>
                  )}

                  {/* Completed Status */}
                  {isCompleted && (
                    <div className="mt-5 text-sm font-semibold text-[#27665C]">
                      ✓ Stage completed successfully
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => toggleStage(index)}
                    className={`mt-6 px-5 py-2.5 rounded-xl text-sm font-semibold transition ${
                      isCompleted
                        ? "bg-white text-[#27665C] border border-[#347A65]"
                        : "bg-[#123D35] text-white hover:bg-[#347A65]"
                    }`}
                  >
                    {isCompleted
                      ? "Mark as Incomplete"
                      : "Mark as Completed"}
                  </button>

                </div>
              </article>
            );
          })}

        </div>
      </section>

      {/* Recommended Resources */}
      <section className="mt-10 rounded-2xl border border-[#EADDC5] bg-[#FFF2DC] p-6 sm:p-8">

        <p className="text-sm font-semibold uppercase tracking-wider text-[#8A672D]">
          Continue Exploring
        </p>

        <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">
          Recommended Learning Resources
        </h2>

        <p className="text-slate-600 mt-2">
          Useful resources to support your learning journey.
        </p>

        <div className="mt-6 space-y-3">

          {recommendedResources.map((resource, index) => {
            const title =
              typeof resource === "string"
                ? resource
                : resource.title || `Resource ${index + 1}`;

            const url =
              typeof resource === "object"
                ? resource.url
                : null;

            const isValidUrl =
              typeof url === "string" &&
              /^https?:\/\//i.test(url);

            return (
              <div
                key={index}
                className="flex items-start gap-3 rounded-xl bg-white p-4 border border-[#EADDC5]"
              >

                <span className="text-[#347A65] font-bold">
                  {index + 1}.
                </span>

                {isValidUrl ? (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#245F50] font-medium hover:underline break-all"
                  >
                    {title}
                  </a>
                ) : (
                  <span className="text-slate-700 font-medium">
                    {title}
                  </span>
                )}

              </div>
            );
          })}

        </div>
      </section>

      {/* Actions */}
      <section className="mt-8 mb-10 flex flex-wrap justify-between gap-4">

        <button
          type="button"
          onClick={handleExportPDF}
          className="rounded-xl bg-[#123D35] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#347A65] no-print"
        >
          Export Roadmap as PDF
        </button>

        <button
          type="button"
          onClick={handleCreateNewPath}
          className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 no-print"
        >
          Create New Learning Path
        </button>

      </section>

      {/* Footer */}
      <footer className="text-center border-t border-slate-200 pt-6 pb-4">
        <p className="text-[#347A65] font-bold text-lg">
          EducateU
        </p>

        <p className="text-sm text-slate-500 mt-1">
          Learn Smarter. Grow Faster.
        </p>
      </footer>

    </main>
  );
};

export default GeminiResponse;
