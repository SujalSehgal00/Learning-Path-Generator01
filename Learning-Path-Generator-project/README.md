# EducateU – Personalized Learning Platform

EducateU is an AI-powered personalized learning platform designed to help learners discover their career interests and generate customized learning roadmaps based on their skills, experience, and learning goals.

## Features

- **Personalized Learning Paths:** Generate customized learning roadmaps based on individual responses.
- **AI-Powered Recommendations:** Uses Google Gemini AI to create structured learning paths.
- **Interactive Assessments:** Collect information about users' current skills, experience, and career objectives.
- **Progress Tracking:** Track completed learning stages and monitor overall learning progress.
- **PDF Export:** Print or save personalized learning roadmaps as PDF files.
- **User Authentication:** Supports user authentication and account management.

## Tech Stack

**Frontend**
- React.js
- Vite
- JavaScript
- Tailwind CSS

**Backend and Services**
- Netlify Functions
- Google Gemini API
- Firebase

## Project Structure

```text
educateu/
├── src/
│   ├── components/
│   ├── context/
│   ├── data/
│   ├── firebase/
│   ├── layout/
│   ├── lib/
│   ├── Pages/
│   └── server/
├── netlify/
│   └── functions/
├── public/
├── .env.example
├── netlify.toml
├── package.json
└── README.md
```

*Note: The structure above is a simplified overview.*

## Installation and Setup

1. Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

2. Navigate to the project directory:

```bash
cd educateu
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file in the project root and configure your Gemini API key:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

5. Start the local development server:

```bash
npx netlify dev
```

6. Open the local URL displayed in your terminal.

## Environment Variables

| Variable | Description |
|---|---|
| `GEMINI_API_KEY` | API key used for Google Gemini AI integration |

Keep your API keys private. Never commit your `.env` file to GitHub.

## AI Integration

EducateU uses the Google Gemini API through a server-side Netlify Function to generate personalized learning roadmaps based on user responses.

## Future Improvements

- Additional career pathways.
- Enhanced learning analytics.
- More personalized learning recommendations.
- Improved roadmap customization.

## License

This project is intended for educational and learning purposes.