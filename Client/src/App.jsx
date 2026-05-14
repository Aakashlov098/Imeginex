import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import GeneratePage from './pages/GeneratePage';
import ProfilePage from './pages/ProfilePage';
import PostDetailPage from './pages/PostDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import NotFoundPage from './components/NotFoundPage';
import SmoothFollower from './components/smoothFollower';

// Admin imports — 
import PrivateAdminComponent from './pages/admin/PrivateAdminComponent';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminPosts from './pages/admin/AdminPosts';
import AdminReports from './pages/admin/AdminReports';

function App() {
  

  const { user } = useSelector((state) => state.auth);
  const isAuthenticated = !!user;



  return (
    <>
    <BrowserRouter>
    {/* <SmoothFollower/> */}

      <Routes>

        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/" replace /> : <LoginPage  />
        } />
        <Route path="/register" element={
          isAuthenticated ? <Navigate to="/" replace /> : <RegisterPage  />
        } />
        
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route element={<MainLayout  />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/generate" element={<GeneratePage />} />
            <Route path="/profile/:username" element={<ProfilePage />} />
            <Route path="/post/:id" element={<PostDetailPage />} />
          </Route>
        </Route>


        {/* Admin Routes */}
        <Route path='/admin' element={<PrivateAdminComponent />}>
         <Route path='dashboard' element={<AdminDashboard />} />
         <Route path='posts' element={<AdminPosts />} />
         <Route path='reports' element={<AdminReports />} />
         <Route path="/admin/reports/:id" element={<PostDetailPage />} />
         <Route path='users' element={<AdminUsers />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </BrowserRouter>
    <ToastContainer/>
    </>

  );
}

export default App;
