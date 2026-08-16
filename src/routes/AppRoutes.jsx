import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Layouts
import { AuthLayout } from '../layouts/AuthLayout';
import { AdminLayout } from '../layouts/AdminLayout';
import { UserLayout } from '../layouts/UserLayout';

// Route Guards
import { AdminRoute } from './AdminRoute';
import { UserRoute } from './UserRoute';

// Auth Pages
import { Login } from '../pages/auth/Login';
import { Register } from '../pages/auth/Register';

// Admin Pages
import { AdminDashboard } from '../pages/admin/Dashboard';
import { AdminTickets } from '../pages/admin/Tickets';
import { AdminTicketDetail } from '../pages/admin/TicketDetail';
import { AdminProfile } from '../pages/admin/Profile';

// User Pages
import { UserDashboard } from '../pages/user/Dashboard';
import { UserTickets } from '../pages/user/Tickets';
import { CreateTicket } from '../pages/user/CreateTicket';
import { UserTicketDetail } from '../pages/user/TicketDetail';
import { UserProfile } from '../pages/user/Profile';

export function AppRoutes() {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <Routes>
      {/* Root redirect */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to={isAdmin ? '/admin/dashboard' : '/user/dashboard'} replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Public / Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Admin Protected Routes */}
      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/tickets" element={<AdminTickets />} />
          <Route path="/admin/tickets/:code" element={<AdminTicketDetail />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
        </Route>
      </Route>

      {/* User Protected Routes */}
      <Route element={<UserRoute />}>
        <Route element={<UserLayout />}>
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/tickets" element={<UserTickets />} />
          <Route path="/user/tickets/create" element={<CreateTicket />} />
          <Route path="/user/tickets/:code" element={<UserTicketDetail />} />
          <Route path="/user/profile" element={<UserProfile />} />
        </Route>
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
