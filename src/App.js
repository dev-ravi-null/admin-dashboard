import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Users from './components/Pages/Users';
import Games from './components/Pages/Game';
import Transactions from './components/Pages/Transactions';
import Login from './components/Login';
import PrivateRoute from './components/routes/PrivateRoute';

const App = () => {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={<Login />} />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/users"
        element={
          <PrivateRoute>
            <Layout>
              <Users />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/games"
        element={
          <PrivateRoute>
            <Layout>
              <Games />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/transactions"
        element={
          <PrivateRoute>
            <Layout>
              <Transactions />
            </Layout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default App;
