import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Application.css';

const Application: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <div className="app-container">
      <div className="app-card">
        <div className="app-header">
          <h1 className="app-title">Welcome to the application</h1>
        </div>

        <div className="app-content">
          <div className="user-info">
            <div className="user-avatar">
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <div className="user-details">
              <p className="user-name">{user?.name}</p>
              <p className="user-email">{user?.email}</p>
            </div>
          </div>

          <div className="welcome-message">
            <p>You have successfully authenticated and can now access the application.</p>
          </div>
        </div>

        <div className="app-footer">
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Application;
