import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/Auth.Context';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Requests from './pages/Requests';
import CreateRequest from './pages/CreateRequest';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="container text-center mt-3">Loading...</div>;
  }

  return (
    <div className="App">
      <Navbar />
      <main>
        <div className="container">
          <Routes>
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/dashboard" />} 
            />
            <Route 
              path="/register" 
              element={!user ? <Register /> : <Navigate to="/dashboard" />} 
            />
            <Route 
              path="/dashboard" 
              element={user ? <Dashboard /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/requests" 
              element={user ? <Requests /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/requests/create" 
              element={user ? <CreateRequest /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/" 
              element={<Navigate to={user ? "/dashboard" : "/login"} />} 
            />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;