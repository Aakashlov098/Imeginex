# 🌌 Imaginex

Imaginex is a modern AI-powered social media platform where creativity meets artificial intelligence. Users can generate AI art, share posts, follow creators, and engage with a community built entirely around machine-generated visuals.

---

## 🚀 Overview

Imaginex combines the power of AI image generation with a full-featured social networking experience.

The platform allows users to:

- Transform ideas into visuals using AI prompts
- Publish AI-generated creations
- Follow other creators
- Like and interact with posts
- Explore trending content
- Build a creative AI-driven community

Built using the MERN Stack and integrated with an AI Image Generation API for real-time results.

---

## ✨ Features

- 🔐 Authentication & Authorization (JWT Based)
- 👤 User Profile Management
- 🎨 AI Image Generation (Prompt → Image)
- 📰 Smart Feed System (Latest + Following)
- ❤️ Like / Unlike Posts
- ➕ Follow / Unfollow Users
- 🖼 Post Sharing System
- 🔎 Explore Page
- 📱 Fully Responsive UI
- ⚡ Real-time Interactive Experience

---

## 🛠 Tech Stack

### Frontend
- React.js
- Axios
- Tailwind CSS / CSS
- Redux / Context API

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose ODM

### AI Integration
- Image Generation API (Prompt → AI Image)

---

## 📂 Project Structure

Imaginex/
│
├── client/          # React Frontend
├── server/          # Express Backend
├── models/          # Mongoose Models
├── routes/          # API Routes
├── controllers/     # Business Logic
└── middleware/      # Auth Middleware

---

## 🔑 Authentication Flow

1. User registers / logs in
2. JWT token is generated
3. Token stored on client side
4. Protected routes verify token using middleware

---

## 🖼 AI Image Generation Flow

1. User enters a prompt  
2. Prompt sent to backend API  
3. Backend calls AI Image Generation API  
4. Generated image URL saved in database  
5. Image displayed in feed  

---

## ⚙ Installation & Setup

### 1️⃣ Clone Repository

git clone https://github.com/your-username/imaginex.git  
cd imaginex

### 2️⃣ Install Dependencies

Client:
cd client  
npm install  

Server:
cd server  
npm install  

### 3️⃣ Environment Variables

Create a `.env` file inside the server folder:

PORT=5000  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_secret_key  
AI_API_KEY=your_ai_api_key  

### 4️⃣ Run Project

Start Backend:
npm run dev  

Start Frontend:
npm start  

---

## 📌 Future Improvements

- 💬 Comment system
- 🔔 Notifications
- 🌙 Dark / Light mode
- 📊 Creator analytics dashboard
- 📤 Image download option

---

## 👨‍💻 Author

Your Name  
Full Stack MERN Developer  

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!