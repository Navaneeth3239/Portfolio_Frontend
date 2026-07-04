# Navaneeth B — Portfolio (MERN Stack)

A professional full-stack portfolio built using the MERN stack.

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Lucide Icons, TanStack Router, TanStack Query
- **Backend**: Node.js, Express.js, Mongoose (MongoDB ODM), Multer (file uploads), JWT (JSON Web Tokens)
- **Database**: MongoDB Atlas

---

## Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

---

### 1. Database Setup (MongoDB)
The application is pre-configured to connect to MongoDB Atlas using the provided URI in the environment variables.

---

### 2. Backend Installation & Setup
Navigate to the `backend` directory, install the packages, and start the development server.

1. **Install dependencies**:
   ```bash
   cd backend
   npm install
   ```
2. **Environment Variables**:
   A `.env` file has been created inside the `backend` directory:

3. **Start the server**:
   ```bash
   npm run dev
   ```
   *(Note: The server will automatically connect to MongoDB and seed the default admin account, site profile, project data, and achievements if the database is empty.)*

---

### 3. Frontend Installation & Setup
In the project root, install packages and run the Vite client dev server.

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Start the Vite dev server**:
   ```bash
   npm run dev
   ```
   The client will boot on `http://localhost:5173`. 
   Vite is configured with a development proxy that routes `/api` and `/uploads` requests automatically to the backend on `http://localhost:5000`.

---

## Admin Dashboard Access
To edit projects, achievements, profile data, or read contact messages:
1. Navigate to `/login` on the client (e.g. `http://localhost:5173/login`).
2. Log in using the admin credentials from your backend `.env` file:
      Create you'r own user mail-id or password in `.env` file like
         `ADMIN_EMAIL = navaneeth3239@gmail.com`
         `ADMIN_PASSWORD = admin1234`
3. Click "Sign In" to access the dashboard.