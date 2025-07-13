import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { UserDashboard } from './components/UserDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import ArticleDetail from './components/user/ArticleDetail';
import VideoDetail from './components/user/VideoDetail';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background font-poppins">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/dashboard/*" 
              element={
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute requireAdmin>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/articles/:id" element={<ArticleDetail />} />
            
            <Route path="/videos/:id" element={<VideoDetail />} />

          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;