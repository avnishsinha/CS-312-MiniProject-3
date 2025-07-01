# MiniProject-3: Blog Web Application with PostgreSQL & Authentication

## 📌 Project Overview

This is the continuation of MiniProject-1, now upgraded to a fully functional web app with **PostgreSQL database integration** and **user authentication**.

Users can:
- Sign up and log in securely
- Create blog posts
- View blog feed
- Edit or delete only their own posts
- See preloaded blog content from the database

>  Data is now **persistent** using PostgreSQL.

---

## 🛠 Technologies Used

- Node.js
- Express.js
- EJS (Embedded JavaScript Templates)
- PostgreSQL
- bcrypt (for password hashing)
- express-session
- HTML / CSS

---

## 🚀 Features

- User Sign Up and Sign In
- Passwords securely stored using `bcrypt`
- Blog post creation, editing, deletion
- Server-side session-based authentication
- Only the creator can edit/delete their posts
- Posts stored in PostgreSQL with timestamps and categories
- Responsive UI using custom CSS

---

## 📂 Project Structure

```
CS-312-MiniProject-3/
│
├── app.js                 # Main Express app entry point
├── db.js                  # PostgreSQL connection setup
├── .env                   # Environment variables
├── database.sql           # SQL used for table creation
│
├── routes/
│   ├── auth.js            # Routes for login/signup
│   └── blogs.js           # Routes for creating/editing/deleting blogs
│
├── middleware/
│   └── auth.js            # Middleware for route protection
│
├── views/                 # EJS templates
│   ├── partials/
│   ├── home.ejs
│   ├── new.ejs
│   ├── edit.ejs
│   ├── signup.ejs
│   └── signin.ejs
│
├── public/
│   └── css/
│       └── style.css      # Custom styling
│
├── package.json           # Project metadata and dependencies
└── README.md              # Project documentation
```

---

## 💻 How to Run Locally

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/avnishsinha/CS-312-MiniProject-3
```

### 2️⃣ Navigate into the Project Directory

```bash
cd CS-312-MiniProject-3
```

### 3️⃣ Install Dependencies

```bash
npm install
```

### 4️⃣ Configure Environment Variables

Create a `.env` file:
```env
DB_USER=your_pg_username
DB_HOST=localhost
DB_NAME=BlogDB
DB_PASSWORD=your_pg_password
DB_PORT=5432
SESSION_SECRET=your-super-secret-session-key
PORT=3000
```

### 5️⃣ Start the Server

```bash
npm start
```

### 6️⃣ Open the App

```
http://localhost:3000
```

---

## 🧪 Default Test Users

These are pre-seeded into the PostgreSQL database:

| User ID | Password | Name    |
|---------|----------|---------|
| user1   | 1234     | Alice   |
| user2   | 5678     | Bob     |
| user3   | abcd     | Charlie |

---

## ✅ Submission Info

**Submitted by:** Avnish Sinha  
**Course:** CS-312 Web Programming II  
**Mini Project:** #3 — Database Integration & Authentication

---
