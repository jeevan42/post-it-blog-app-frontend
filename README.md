
# ✨ Post-It Blog App - Frontend

This is the frontend Repo for the **Post-It Blog App**, built with React.js. Users can register, log in, and perform full CRUD operations on blog posts. It uses JWT for authentication and Axios for API communication.

## 🌐 Live Frontend
**Netlify:** https://post-it-blog-app.netlify.app

## 🛠️ Tech Stack
- React.js (with Hooks)
- React Router DOM
- Axios for API requests
- JWT for user sessions
- Tailwind CSS / Basic CSS for styling

## 📦 Features
- 🔐 User Registration & Login (JWT-based)
- 🏠 View all blog posts
- 📝 Create blog post (only for logged-in users)
- ✏️ Edit and delete posts (only if you're the author)
- 📄 View full post details on a single post page
- 🔒 Protected routes based on login state
- 🎨 Simple and responsive UI (Tailwind or plain CSS)

## 🧪 Tools & Libraries
- `react-router-dom`
- `axios`
- `jwt-decode` (optional)
- `tailwindcss` / `bootstrap` (optional for UI)

## 🗂️ Folder Structure

<pre>
src/
├── components/            # Reusable component files (Header, pages)
│   ├── CreatePost.jsx
│   ├── EditPost.jsx
│   ├── Header.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   └── SinglePost.jsx
├── App.js                 # Main app routing and layout
├── App.css                # Global CSS
├── api.js                 # Axios configuration and API baseURL
├── toastNotification.js   # Toast wrapper for notifications
├── index.js               # React DOM rendering entry
├── .env.example           # Sample environment variables
</pre>

## 📝 Setup Instructions
```bash
git clone https://github.com/jeevan42/post-it-blog-app-frontend
cd post-it-blog-app-frontend
npm install
npm start
```

## 🤝 Contributing
Pull requests are welcome. For any major changes, please open an issue first.
