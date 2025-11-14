import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { SignupData } from '../types';
import '../styles/Auth.css';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState<SignupData>({
    email: '',
    name: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<SignupData>>({});
  const [apiError, setApiError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateName = (name: string): boolean => {
    return name.length >= 3;
  };

  const validatePassword = (password: string): boolean => {
    const hasMinLength = password.length >= 8;
    const hasLetter = /[A-Za-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[@$!%*#?&]/.test(password);
    return hasMinLength && hasLetter && hasNumber && hasSpecialChar;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user types
    if (errors[name as keyof SignupData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    setApiError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError('');

    // Validate form
    const newErrors: Partial<SignupData> = {};

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!validateName(formData.name)) {
      newErrors.name = 'Name must be at least 3 characters long';
    }

    if (!validatePassword(formData.password)) {
      newErrors.password =
        'Password must be at least 8 characters with one letter, one number, and one special character';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      await signup(formData);
      navigate('/app');
    } catch (error: any) {
      const message = error.response?.data?.message;
      if (Array.isArray(message)) {
        setApiError(message.join(', '));
      } else {
        setApiError(message || 'An error occurred during signup');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Sign up to get started</p>

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
              className={`form-input ${errors.email ? 'input-error' : ''}`}
              placeholder="Enter your email"
              required
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-input ${errors.name ? 'input-error' : ''}`}
              placeholder="Enter your name (min 3 characters)"
              required
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
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
              className={`form-input ${errors.password ? 'input-error' : ''}`}
              placeholder="Enter your password"
              required
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
            <div className="password-requirements">
              <p>Password must contain:</p>
              <ul>
                <li>At least 8 characters</li>
                <li>At least one letter</li>
                <li>At least one number</li>
                <li>At least one special character (@$!%*#?&)</li>
              </ul>
            </div>
          </div>

          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{' '}
          <Link to="/signin" className="auth-link">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
