import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AdminLayout from "../../layouts/AdminLayout"
export default function PrivateAdminComponent() {
  const user = JSON.parse(localStorage.getItem('user'));

    if (!user || user.isAdmin !== true) {
      return <Navigate to="/" replace />;
    }

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}
