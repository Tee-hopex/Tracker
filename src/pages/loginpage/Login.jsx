import React, { useState } from 'react';
import './Login.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Login successful!');
      console.log('Login data:', formData);
    }, 2000);
  };

  const handleForgotPassword = () => {
    alert('Password reset link will be sent to your email');
  };

  return (
    <>
    <Header />
    <div className="login-page">
        
      <div className="login-background">
        <div className="login-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>
      
      <div className="login-container">
        <div className="login-content">
          {/* Left Side - Branding */}
          <div className="login-branding">
            <div className="brand-content">
              <div className="brand-logo">
                <span className="brand-logo-text">Lamlight Express</span>
                <span className="brand-logo-subtitle">Global Shipping Solutions</span>
              </div>
              <h1>Welcome Back!</h1>
              <p>Sign in to access your shipping dashboard and manage your deliveries with ease.</p>
              
              <div className="features-list">
                <div className="feature-item">
                  <span>Track all your shipments</span>
                </div>
                <div className="feature-item">
                  <span>View detailed analytics</span>
                </div>
                <div className="feature-item">
                  <span>Manage billing & payments</span>
                </div>
                <div className="feature-item">
                  <span>Quick shipping tools</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side - Login Form */}
          <div className="login-form-section">
            <div className="form-container">
              <div className="form-header">
                <h2>Sign In</h2>
                <p>Enter your credentials to access your account</p>
              </div>
              
              {/* Login Form */}
              <div className="login-form">
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <div className="input-wrapper">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className={`form-input ${errors.email ? 'error' : ''}`}
                    />
                  </div>
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="input-wrapper">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className={`form-input ${errors.password ? 'error' : ''}`}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  {errors.password && <span className="error-message">{errors.password}</span>}
                </div>
                
                <div className="form-options">
                  <label className="checkbox-wrapper">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                    />
                    <span className="checkmark"></span>
                    Remember me
                  </label>
                  
                  <button 
                    type="button" 
                    className="forgot-password"
                    onClick={handleForgotPassword}
                  >
                    Forgot password?
                  </button>
                </div>
                
                <button 
                  onClick={handleSubmit}
                  className="submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading-content">
                      <span className="loading-spinner"></span>
                      Signing in...
                    </span>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </div>
              
              <div className="form-footer">
                <p>Don't have an account? <a href="/signup" className="signup-link">Create one here</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Login;