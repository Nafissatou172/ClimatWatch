import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import { UserHome } from './user/UserHome';
import { UserHistory } from './user/UserHistory';
import { UserAwareness } from './user/UserAwareness';

export const UserDashboard: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<UserHome />} />
        <Route path="/history" element={<UserHistory />} />
        <Route path="/awareness" element={<UserAwareness />} />
      </Routes>
    </Layout>
  );
};