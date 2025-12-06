# 🎬 Netflix-GPT

A smart movie recommendation application combining modern UI, movie data from TMDB, and AI-powered search.  
It includes user authentication, smooth browsing & carousels, background trailers, and a GPT-based movie suggestion feature.

---

## 🚀 Tech Stack

- **Frontend**: React (Create React App), TailwindCSS  
- **Backend**: Node.js + Express — handles API requests (e.g. to Perplexity / GPT)  
- **Authentication**: Firebase Authentication  
- **APIs**: The Movie Database (TMDB) API for movie data 🗂️  
- **AI / Search**: GPT (via backend) for smart movie recommendations and search  

---

## ⭐ Features

### 🔐 Authentication
- Sign up / Sign in (with Firebase)  
- Validation & error handling for login/registration  
- Redirect to Browse page on success  

### 🎥 Browse Page (only after auth)
- Responsive header & navigation  
- Main featured movie section — with trailer playing in background  
- Overlay showing movie title & description  
- Movie suggestions & related movies  
- Multiple category-wise movie lists (e.g. Trending, Top Rated, Upcoming)  
- Smooth horizontal carousels (many “MovieList” rows)  

### 🤖 Netflix-GPT (AI-powered Search & Recommendations)
- Smart search bar  
- GPT-based movie suggestions (better than plain queries)  
- Real-time results with UI updating smoothly  

### 📱 Responsive & Clean UI
- Uses TailwindCSS for styling  
- Works well on mobile and desktop  
- Hidden scrollbar + smooth scroll for carousels  

---

## 🧰 Installation & Running Locally

1. **Clone the repository**

   ```bash
   git clone https://github.com/YourUsername/Netflix-GPT.git
   cd Netflix-GPT
Setup Backend

bash
Copy code
cd backend
npm install
# create .env file containing your GPT / Perplexity / any required API keys
npm start
Setup Frontend

bash
Copy code
cd ../frontend
npm install
# create .env file (React) if needed for environment variables
npm start
Open in browser

Frontend: http://localhost:3000

Backend API (if needed): http://localhost:5000

⚠️ Make sure you do not commit any .env files or API keys to GitHub. Use .gitignore to ignore them.

📁 Project Structure (Monorepo)
bash
Copy code
Netflix-GPT/
├── backend/        # Express + API + AI logic
├── frontend/       # React + UI + Browsing + Trailers + Search
└── README.md       # This file
💡 Notes & Best Practices
.env files (API keys) are intentionally excluded from version control — keep them local.

Frontend communicates with backend API via fetch — clean separation of concerns.

Good README + folder structure helps future contributors understand and set up quickly.

