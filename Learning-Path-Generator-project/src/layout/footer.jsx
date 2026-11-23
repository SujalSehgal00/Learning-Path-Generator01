
export const Footer = () => {
  return (
    <footer className="w-full bg-[#F0EFED] py-8 px-6 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">

        {/* EducateU Branding */}
        <div className="flex items-center gap-2">
          <img
            src="/educateu-logo.png"
            alt="EducateU Logo"
            className="w-18 h-18 object-contain"
          />

          <h2 className="text-xl font-extrabold tracking-tight">
            <span className="text-[#123D35]">Educate</span>
            <span className="text-[#347A65]">U</span>
          </h2>
        </div>

        <p className="text-sm text-gray-600 text-center">
          AI-Powered Personalized Learning Platform
        </p>

        {/* GitHub Repository */}
        <a
          href="https://github.com/YOUR-TEAM-REPOSITORY"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#123D35] font-semibold hover:text-[#347A65] transition-colors"
        >
          View Team GitHub Repository ↗
        </a>

        <div className="w-full border-t border-gray-300 pt-4">
          <p className="text-center text-sm text-gray-500">
            © 2026 EducateU. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};
