import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { SigninData } from '../types';
import '../styles/Auth.css';

const Signin: React.FC = () => {
  const navigate = useNavigate();
  const { signin } = useAuth();
  const [formData, setFormData] = useState<SigninData>({
    email: '',
    password: '',
  });
  const [apiError, setApiError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setApiError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError('');
    setIsLoading(true);

    try {
      await signin(formData);
      navigate('/app');
    } catch (error: any) {
      const message = error.response?.data?.message;
      if (Array.isArray(message)) {
        setApiError(message.join(', '));
      } else {
        setApiError(message || 'An error occurred during signin');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Sign in to your account</p>

        {apiError && <div className="error-banner">{apiError}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account?{' '}
          <Link to="/signup" className="auth-link">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
