# 🔗 Simple URL Shortener App

This is a small project I built to understand how URL shortening works (like Bitly).  
You can enter a long URL, and it gives you a short link. When someone clicks the short link, it redirects to the original website.

---

## 🛠️ Technologies I Used

### 🔹 Frontend (what user sees)
- **React.js** (with Vite for faster setup)
- HTML, CSS, and a little bit of JavaScript

### 🔹 Backend (server logic)
- **Node.js** with **Express.js**

### 🔹 Database
- **MongoDB Atlas** (to store original and short URLs)


## 🔄 How It Works (Step-by-Step)

1. User opens the webpage and enters a long URL.
2. When they click the button, the app sends the long URL to the backend.
3. The backend:
   - Checks if the URL is valid
   - Creates a random short ID (like `abc123`)
   - Saves both the long and short URLs in the database
4. It sends back the short URL to the frontend.
5. When someone visits the short URL, the server finds the matching original URL in the database and redirects the user there.

---

## 🔌 API Endpoints I Built

### ➕ `POST /shorten`
This is used when someone wants to create a short URL.

