import React from 'react';
import { useAuth } from '../context/Auth.Context';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div style={{ margin: '2rem 0' }}>
      <h1>Dashboard</h1>
      <div className="card">
        <h2>Welcome, {user?.username}!</h2>
        <p>Role: <strong>{user?.role}</strong></p>
        
        <div style={{ marginTop: '2rem' }}>
          <h3>Quick Actions</h3>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <Link to="/requests" className="btn btn-primary">
              View Requests
            </Link>
            {user?.role === 'admin' && (
              <Link to="/requests/create" className="btn btn-primary">
                Create New Request
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;