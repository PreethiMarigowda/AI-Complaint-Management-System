AI Complaint Management System
A full-stack AI-powered Complaint Management System built using the MERN stack.
This platform allows users to register, login, raise complaints, and manage complaints through a modern dashboard interface.

🚀 Live Demo
Frontend (Vercel): https://ai-complaint-management-system-7jlm0wymx.vercel.app
Backend (Render): https://ai-complaint-backend-78ty.onrender.com

📌 Features
User Authentication (Register/Login)
JWT Token Authentication
Complaint Submission System
Dashboard for Users
Admin Dashboard
MongoDB Database Integration
Responsive Modern UI
Full Deployment (Frontend + Backend)
AI Chatbot Integration
REST API Architecture

🛠️ Tech Stack
Frontend
React.js
Tailwind CSS
Axios
React Router DOM
Backend
Node.js
Express.js
MongoDB Atlas
Mongoose
JWT Authentication
bcrypt.js
Deployment - Vercel (Frontend), Render (Backend)

📂 Project Structure
AI-Complaint-Management-System/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│
└── README.md

⚙️ Installation
Clone Repository
git clone https://github.com/your-username/AI-Complaint-Management-System.git

Backend Setup
cd backend
npm install

Create .env file:
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

Run backend:
npm start

Frontend Setup
cd frontend
npm install
npm run dev

📷 Screenshots
Register Page
Login Page
User Dashboard
Complaint Submission Page
Admin Dashboard

🔐 Authentication
The system uses:
JWT Authentication
Password Hashing using bcrypt
Protected Routes

🌟 Future Enhancements
AI Complaint Classification
Sentiment Analysis
Complaint Priority Prediction
Email Notifications
Complaint Tracking
Analytics Dashboard
File Upload Support

👩‍💻 Author
Preethi Marigowda

📄 License
This project is developed for educational and portfolio purposes.
