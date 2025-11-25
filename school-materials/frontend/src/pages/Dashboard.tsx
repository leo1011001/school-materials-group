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
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            <Link to="/requests" className="btn btn-primary">
              {user?.role === 'admin' ? 'View All Requests' : 'View My Requests'}
            </Link>
            <Link to="/requests/create" className="btn btn-primary">
              Create New Request
            </Link>
          </div>
        </div>

        {/* Add role-specific information */}
        <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(255,255,255,0.1)', borderRadius: '10px' }}>
          <h4>Your Permissions:</h4>
          {user?.role === 'admin' ? (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>✓ View ALL material requests</li>
              <li>✓ Approve/Reject requests</li>
              <li>✓ Delete any request</li>
              <li>✓ Create new requests</li>
            </ul>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>✓ View YOUR material requests</li>
              <li>✓ Create new requests</li>
              <li>✓ Delete YOUR requests</li>
              <li>✗ Cannot approve/reject requests</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;