
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import SkillLevel, { SkillGroup } from "../components/SkillLevel";
import { useAppContext } from "../context/UserContext";

const LearningPathPage = () => {
  const navigate = useNavigate();

  const {
    setCareerGoal,
    setSkillLevel,
    setBackground,
    setTimeCommitment,
  } = useAppContext();

  const isAuthenticated = Boolean(
    localStorage.getItem("authToken") ||
    localStorage.getItem("isAuthenticated")
  );

  const [formData, setFormData] = useState({
    level: "beginner",
    email: "",
    path: "",
    background: "",
    time: "",
  });

  const [errors, setErrors] = useState({});

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.path) {
      newErrors.path = "Please select your career goal.";
    }

    if (!formData.time) {
      newErrors.time = "Please select your learning duration.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setCareerGoal(formData.path);
    setSkillLevel(formData.level);
    setBackground(formData.background);
    setTimeCommitment(formData.time);

    setErrors({});
    navigate("/questions");
  };

  return (
    <main className="min-h-screen bg-[#F0EFED] px-5 py-8 sm:px-8">

      {/* Navigation */}
      <div className="max-w-5xl mx-auto flex justify-between items-center mb-10">

        <Link
          to="/"
          className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm text-slate-700 font-medium hover:bg-slate-50 transition"
        >
          ← Home
        </Link>

        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="px-5 py-2.5 bg-white border border-red-200 rounded-xl text-red-600 font-medium hover:bg-red-50 transition"
          >
            Log out
          </button>
        )}
      </div>

      <div className="max-w-4xl mx-auto">

        {/* Page Heading */}
        <div className="text-center mb-10">

          <span className="inline-block px-4 py-2 bg-[#E6F4EA] text-[#137333] rounded-full text-sm font-semibold mb-5">
            Your Personalized Learning Journey
          </span>

          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Let's Build Your{" "}
            <span className="text-[#347A65]">Future</span>
          </h1>

          <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Share your career ambitions, existing skills and
            learning preferences. EducateU will help create
            a roadmap tailored to your goals.
          </p>

        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-10">

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800">
              Your Learning Profile
            </h2>

            <p className="text-slate-500 mt-2">
              Complete the details below to get started.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Email */}
            <div className="flex flex-col gap-3">

              <label
                htmlFor="email"
                className="text-lg font-semibold text-slate-800"
              >
                01. Your Email Address
                <span className="text-red-500"> *</span>
              </label>

              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                placeholder="example@gmail.com"
                onChange={handleChange}
                className={`w-full border-2 rounded-xl p-4 outline-none focus:border-[#347A65] transition ${
                  errors.email ? "border-red-500" : "border-slate-200"
                }`}
              />

              {errors.email && (
                <p className="text-red-500 text-sm">
                  {errors.email}
                </p>
              )}

            </div>

            {/* Career Goal */}
            <div className="flex flex-col gap-3">

              <label
                htmlFor="path"
                className="text-lg font-semibold text-slate-800"
              >
                02. What is Your Target Career?
                <span className="text-red-500"> *</span>
              </label>

              <select
                name="path"
                id="path"
                value={formData.path}
                onChange={handleChange}
                className={`w-full border-2 rounded-xl p-4 bg-white text-slate-700 outline-none focus:border-[#347A65] transition ${
                  errors.path ? "border-red-500" : "border-slate-200"
                }`}
              >
                <option value="" disabled>
                  Choose your career goal
                </option>

                <option value="Scrum Master">Scrum Master</option>
                <option value="Web Developer">Web Developer</option>
                <option value="Product Owner">Product Owner</option>
                <option value="UX/UI Designer">UX/UI Designer</option>
              </select>

              {errors.path && (
                <p className="text-red-500 text-sm">
                  {errors.path}
                </p>
              )}

            </div>

            {/* Skill Level */}
            <div>

              <p className="text-lg font-semibold text-slate-800 mb-4">
                03. What is Your Current Skill Level?
              </p>

              <SkillGroup
                value={formData.level}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    level: e.target.value,
                  }))
                }
              >
                <div className="flex flex-wrap gap-4">

                  <SkillLevel value="beginner">
                    Beginner
                  </SkillLevel>

                  <SkillLevel value="intermediate">
                    Intermediate
                  </SkillLevel>

                  <SkillLevel value="advanced">
                    Advanced
                  </SkillLevel>

                </div>
              </SkillGroup>

            </div>

            {/* Background */}
            <div className="flex flex-col gap-3">

              <label
                htmlFor="background"
                className="text-lg font-semibold text-slate-800"
              >
                04. Tell Us About Your Existing Skills
              </label>

              <textarea
                name="background"
                id="background"
                rows="4"
                value={formData.background}
                onChange={handleChange}
                placeholder="Example: I know HTML, CSS and JavaScript. I have basic programming experience..."
                className="w-full border-2 border-slate-200 rounded-xl p-4 outline-none focus:border-[#347A65] resize-y transition"
              />

              <p className="text-sm text-slate-500">
                Mention your technical knowledge, education
                or previous experience.
              </p>

            </div>

            {/* Time Commitment */}
            <div className="flex flex-col gap-3">

              <label
                htmlFor="time"
                className="text-lg font-semibold text-slate-800"
              >
                05. What is Your Target Learning Duration?
                <span className="text-red-500"> *</span>
              </label>

              <select
                name="time"
                id="time"
                value={formData.time}
                onChange={handleChange}
                className={`w-full border-2 rounded-xl p-4 bg-white text-slate-700 outline-none focus:border-[#347A65] transition ${
                  errors.time ? "border-red-500" : "border-slate-200"
                }`}
              >
                <option value="" disabled>
                  Select your learning duration
                </option>

                <option value="1 month">1 month</option>
                <option value="3 months">3 months</option>
                <option value="6 months">6 months</option>
                <option value="8 months">8 months</option>
                <option value="12 months">12 months</option>
                <option value="18 months">18 months</option>
              </select>

              {errors.time && (
                <p className="text-red-500 text-sm">
                  {errors.time}
                </p>
              )}

            </div>

            {/* Submit */}
            <div className="pt-5 border-t border-slate-100">

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-[#123D35] hover:bg-[#347A65] text-white text-lg font-semibold shadow-md transition-all cursor-pointer"
              >
                Continue to Skill Assessment →
              </button>

              <p className="text-center text-sm text-slate-500 mt-4">
                Your personalized learning journey starts here.
              </p>

            </div>

          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-500 text-sm mt-8">
          EducateU | AI-Powered Personalized Learning
        </p>

      </div>
    </main>
  );
};

export default LearningPathPage;
