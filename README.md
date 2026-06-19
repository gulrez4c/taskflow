# TaskFlow 📋

A full-stack **Kanban-style task management application** built with the MERN stack (MongoDB, Express, React, Node.js). Create boards, organize tasks into columns, drag-and-drop cards between stages, and manage everything behind secure JWT authentication.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18-green.svg)
![React](https://img.shields.io/badge/react-18.3-61dafb.svg)

---

## ✨ Features

- 🔐 **JWT Authentication** — secure register/login with hashed passwords (bcrypt)
- 🗂️ **Boards & Columns** — create unlimited boards, each with To Do / In Progress / Done columns
- 🖱️ **Drag & Drop** — move tasks between columns using `react-beautiful-dnd`
- ✅ **Task Management** — title, description, priority levels, due dates, and labels
- 🔄 **Real-time Reordering** — task order persists via bulk-update API
- 🛡️ **Protected Routes** — both frontend (React Router guards) and backend (middleware)
- 📱 **Responsive UI** — clean, modern interface that works on desktop and mobile
- ⚠️ **Centralized Error Handling** — consistent API error responses

---

## 🛠️ Tech Stack

**Frontend:** React 18, React Router, Axios, react-beautiful-dnd, custom CSS
**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt.js
**Validation:** express-validator

---

## 📁 Project Structure

```
taskflow/
├── backend/
│   ├── config/          # DB connection
│   ├── controllers/     # Route handler logic
│   ├── middleware/       # Auth, error handling, validation
│   ├── models/          # Mongoose schemas (User, Board, Task)
│   ├── routes/          # Express route definitions
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/   # Navbar, Column, TaskCard, TaskModal, ProtectedRoute
│   │   ├── context/      # AuthContext (global auth state)
│   │   ├── pages/        # Login, Register, Dashboard, BoardPage
│   │   ├── services/     # Axios API calls
│   │   ├── styles/
│   │   ├── App.js
│   │   └── index.js
│   ├── .env.example
│   └── package.json
├── .gitignore
├── LICENSE
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local instance or MongoDB Atlas)

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/taskflow.git
cd taskflow
```

### 2. Backend setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```
Backend runs on `http://localhost:5000`

### 3. Frontend setup
```bash
cd frontend
npm install
cp .env.example .env
npm start
```
Frontend runs on `http://localhost:3000`

---

## 🔌 API Endpoints

| Method | Endpoint                 | Description                  | Auth |
|--------|---------------------------|-------------------------------|------|
| POST   | `/api/auth/register`      | Register new user             | ❌ |
| POST   | `/api/auth/login`         | Login user                     | ❌ |
| GET    | `/api/auth/me`            | Get current user profile       | ✅ |
| POST   | `/api/boards`             | Create a new board             | ✅ |
| GET    | `/api/boards`             | Get all boards for user        | ✅ |
| GET    | `/api/boards/:id`         | Get single board with tasks    | ✅ |
| PUT    | `/api/boards/:id`         | Update board                   | ✅ |
| DELETE | `/api/boards/:id`         | Delete board                   | ✅ |
| POST   | `/api/tasks`              | Create a task                  | ✅ |
| GET    | `/api/tasks/board/:boardId`| Get tasks for a board         | ✅ |
| PUT    | `/api/tasks/:id`          | Update a task                  | ✅ |
| PUT    | `/api/tasks/reorder`      | Reorder tasks (drag-and-drop)  | ✅ |
| DELETE | `/api/tasks/:id`          | Delete a task                  | ✅ |

---

## 🗺️ Roadmap

- [ ] Real-time updates with WebSockets
- [ ] Team collaboration & board invites
- [ ] File attachments on tasks
- [ ] Activity log / audit trail
- [ ] Dark mode

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 🙋 Author

Built as a portfolio project to demonstrate full-stack development skills including REST API design, authentication, database modeling, and React state management.
