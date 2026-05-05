Team Task Manager

A full-stack task management web application that allows users to create, update, and track tasks with authentication and deadline management.

--------------------------------------------------

LIVE DEMO

Frontend: https://team-task-manager-eight-mu.vercel.app/
Backend: https://team-task-manager-8mym.onrender.com

--------------------------------------------------

FEATURES

- User Signup and Login (JWT Authentication)
- Add Tasks with deadlines
- Update Task Status (Done / Pending)
- Delete Tasks
- Dashboard with task statistics
- Overdue task tracking
- Fully deployed application

--------------------------------------------------

TECH STACK

Frontend:
- React.js
- Axios
- CSS

Backend:
- Node.js
- Express.js

Database:
- MongoDB (Atlas)

Authentication:
- JWT (JSON Web Tokens)

Deployment:
- Frontend: Vercel
- Backend: Render

--------------------------------------------------

PROJECT STRUCTURE

team-task-manager/
|
|-- backend/
|   |-- models/
|   |-- routes/
|   |-- controllers/
|   |-- middleware/
|   |-- server.js
|
|-- frontend/
|   |-- src/
|   |   |-- Login.js
|   |   |-- Signup.js
|   |   |-- Dashboard.js
|   |   |-- App.js
|
|-- package.json
|-- README

--------------------------------------------------

INSTALLATION & SETUP

1. Clone Repository

git clone https://github.com/your-username/team-task-manager.git
cd team-task-manager

--------------------------------------------------

2. Backend Setup

cd backend
npm install

Create .env file:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

Run backend:

node server.js

--------------------------------------------------

3. Frontend Setup

cd frontend
npm install
npm start

--------------------------------------------------

API ENDPOINTS

Auth Routes:
POST /api/auth/signup → Register user
POST /api/auth/login → Login user

Task Routes:
GET /api/tasks → Get all tasks
POST /api/tasks → Create task
PUT /api/tasks/:id → Update task
DELETE /api/tasks/:id → Delete task

--------------------------------------------------

FUTURE IMPROVEMENTS

- Notifications
- Team collaboration
- Mobile responsive UI
- UI animations
- Advanced analytics dashboard

--------------------------------------------------

AUTHOR

Anshu Cheekurthi

--------------------------------------------------

If you like this project, please star the repository.
