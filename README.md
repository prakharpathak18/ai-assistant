AI Research Companion

An AI-powered research and study assistant built with React, Supabase, and Gemini API integration. The application helps users organize research notes, generate AI summaries, and manage study content through a clean and responsive interface.

🚀 Features
User Authentication (Signup/Login)
Secure Supabase Backend Integration
AI-powered Note Summarization using Gemini API
Create, Read, Update, and Delete (CRUD) Notes
Responsive Dashboard UI
React Router Navigation
Context API State Management
Modern Tailwind CSS Interface
Supabase Edge Functions Integration
Protected Routes and Persistent User Sessions
🛠 Tech Stack
Frontend
React
Vite
React Router
Tailwind CSS
Context API
Lucide React Icons
Backend & Database
Supabase
Authentication
PostgreSQL Database
Edge Functions
AI Integration
Google Gemini API
📂 Project Structure
src/
│
├── components/
├── context/
├── hooks/
├── pages/
├── services/
└── App.jsx
⚙️ Installation & Setup
1. Clone the Repository
git clone https://github.com/prakharpathak18/ai-assistant.git
cd ai-assistant
2. Install Dependencies
npm install
3. Configure Environment Variables

Create a .env file in the project root:

VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
4. Start Development Server
npm run dev

Application runs at:

http://localhost:5173
🔐 Supabase Setup
Create a project on Supabase
Enable Authentication
Create required database tables
Configure Row Level Security (RLS)
Deploy Edge Functions
🤖 Gemini API Integration

The project uses Google Gemini API through Supabase Edge Functions for secure AI processing.

Setup Steps
Generate a Gemini API key from Google AI Studio
Store the key securely in Supabase secrets
Deploy the Edge Function

Example:

supabase secrets set GEMINI_API_KEY=YOUR_API_KEY

Deploy function:

supabase functions deploy process-note --no-verify-jwt
📌 Core Functionalities
AI Note Summarization

Users can generate concise summaries of research notes using Gemini AI.

Dashboard Management

Users can:

Create notes
Edit notes
Delete notes
View saved notes
Authentication System

Secure login and signup powered by Supabase Auth.

🌐 Deployment

The frontend can be deployed on:

Vercel
GitHub Pages
Netlify

Supabase handles:

Backend APIs
Authentication
Database
Edge Functions
📖 Future Improvements
AI-generated quizzes
Smart tagging system
Semantic search
Collaborative notes
PDF upload and summarization
AI research recommendations
👨‍💻 Author

Prakhar Pathak

GitHub:

https://github.com/prakharpathak18

Project Repository:

https://github.com/prakharpathak18/ai-assistant
