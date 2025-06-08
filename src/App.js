import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import SinglePost from './components/SinglePost';

function App() {
    const token = localStorage.getItem('token');

    return (
        <Router>
            {token && <Header />} {/* Show Header only if the user is logged in */}
            <Routes>
                {/* Public Routes */}
                {!token ? (
                    <>
                        <Route path="/" element={<Navigate to="/login" />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        {/* Add a fallback for any unmatched routes */}
                        <Route path="*" element={<Navigate to="/" />} />
                    </>
                ) : (
                    <>
                        {/* Protected Routes */}
                        <Route path="/" element={<Home />} />
                        <Route path="/create" element={<CreatePost />} />
                        <Route path="/edit/:id" element={<EditPost />} />
                        <Route path="/post/:id" element={<SinglePost />} />
                        {/* Add a fallback for any unmatched routes */}
                        <Route path="*" element={<Navigate to="/" />} />
                    </>
                )}
            </Routes>
        </Router>
    );
}

export default App;
