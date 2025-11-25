import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/Auth.Context';

interface Material {
  name: string;
  quantity: number;
  unit: string;
}

interface Request {
  _id: string;
  requestNumber: string;
  date: string;
  description: string;
  materials: Material[];
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  createdBy: {
    username: string;
    email: string;
  };
}

const Requests: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get('/api/requests');
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (requestId: string, status: string) => {
    try {
      await axios.patch(`/api/requests/${requestId}/status`, { status });
      fetchRequests();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteRequest = async (requestId: string) => {
    if (!window.confirm('Are you sure you want to delete this request?')) {
      return;
    }

    try {
      await axios.delete(`/api/requests/${requestId}`);
      fetchRequests();
    } catch (error) {
      console.error('Error deleting request:', error);
    }
  };

  if (loading) {
    return <div className="text-center mt-3">Loading requests...</div>;
  }

  return (
    <div style={{ margin: '2rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Material Requests</h1>
        {user?.role === 'admin' && (
          <Link to="/requests/create" className="btn btn-primary">
            Create New Request
          </Link>
        )}
      </div>

      {requests.length === 0 ? (
        <div className="card">
          <p>No requests found.</p>
        </div>
      ) : (
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>Request Number</th>
                <th>Date</th>
                <th>Description</th>
                <th>Materials</th>
                <th>Status</th>
                <th>Created By</th>
                {user?.role === 'admin' && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request._id}>
                  <td>{request.requestNumber}</td>
                  <td>{new Date(request.date).toLocaleDateString()}</td>
                  <td>{request.description}</td>
                  <td>
                    {request.materials?.map((material, index) => (
                      <div key={index}>
                        {material.name} - {material.quantity} {material.unit}
                      </div>
                    ))}
                  </td>
                  <td>
                    <span className={`status-${request.status}`}>
                      {request.status}
                    </span>
                  </td>
                  <td>{request.createdBy?.username}</td>
                  {user?.role === 'admin' && (
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <select
                          value={request.status}
                          onChange={(e) => updateStatus(request._id, e.target.value)}
                          className="form-control"
                          style={{ width: 'auto' }}
                        >
                          <option value="pending">Pending</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                          <option value="completed">Completed</option>
                        </select>
                        <button
                          onClick={() => deleteRequest(request._id)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Requests;