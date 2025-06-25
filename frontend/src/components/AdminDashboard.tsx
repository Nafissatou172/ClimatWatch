import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import { AdminHome } from './admin/AdminHome';
import { AdminAlerts } from './admin/AdminAlerts';
import { AdminUsers } from './admin/AdminUsers';
import { AdminContent } from './admin/AdminContent';

export const AdminDashboard: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AdminHome />} />
        <Route path="/alerts" element={<AdminAlerts />} />
        <Route path="/users" element={<AdminUsers />} />
        <Route path="/content" element={<AdminContent />} />
      </Routes>
    </Layout>
  );
};