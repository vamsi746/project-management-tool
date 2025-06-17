# 🛠️ Project Management Tool (MERN Stack)

A full-featured Project Management Tool built using the **MERN stack** that helps teams track tasks, collaborate efficiently, and visualize progress with tools like Kanban Board, Analytics Dashboard, and Gantt Chart.

## 🌐 Live Demo

- **Frontend (Vercel):https://project-management-tool-delta-rosy.vercel.app/ 
- **Backend (Render):https://project-management-tool-wtmq.onrender.com/tasks

---

## 🚀 Features

✅ User Authentication & Registration  
✅ Task CRUD operations (Create, Read, Update, Delete)  
✅ Kanban Board with Drag & Drop (`@hello-pangea/dnd`)  
✅ Due Date & Priority tagging  
✅ Analytics Dashboard  
✅ Gantt Chart for timeline tracking  
✅ Toast Notifications (`react-toastify`)  
✅ Responsive Design with Tailwind CSS  
✅ Light/Dark Theme Toggle  

---

## 🧰 Tech Stack

### 🔹 Frontend
- React.js
- Tailwind CSS
- React Router
- Axios
- @hello-pangea/dnd
- React Toastify
- Victory (for charts)

### 🔹 Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT (Authentication)
- CORS & dotenv

---

## 📁 Folder Structure

project-management-tool/
│
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── .env
│ ├── server.js
│
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── App.js
│ │ ├── index.js
│ ├── .env
│ ├── tailwind.config.js
│
├── .gitignore
├── README.md



---

## 🛠️ Setup Instructions (Local)

### 1. Clone the repository
git clone https://github.com/vamsi746/project-management-tool.git
cd project-management-tool

2.Setup Backend
cd backend
npm install
# Create a .env file with your MongoDB URI and JWT secret
npm start
3. Setup Frontend
cd ../frontend
npm install
npm start

🧪 Environment Variables
🔐 Backend (backend/.env)
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
🌍 Frontend (frontend/.env)
REACT_APP_API_URL=https://your-backend-api.onrender.com


✍️ Author :
Vamsi
  B.Tech Student | MERN Developer | Open to Internships
profile:
https://github.com/vamsi746 

📜 License:
This project is licensed under the MIT License.

🙌 Acknowledgements: 
React and Tailwind CSS Community

MongoDB and Express.js Documentation

OpenAI GPT for guidance and debugging



