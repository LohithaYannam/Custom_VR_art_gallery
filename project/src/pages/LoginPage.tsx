import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Fake login - just redirect to dashboard
    navigate('/dashboard');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-primary-900 flex items-center justify-center p-4">
      <div className="glass-panel p-8 max-w-md w-full fade-in">
        <Link to="/" className="text-slate-400 hover:text-white inline-flex items-center mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Home
        </Link>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-slate-400 mt-2">Sign in to continue to VR Gallery</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              className="input-field w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="input-field w-full pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 bg-slate-700 border-slate-600 rounded focus:ring-primary-500"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-300">
                Remember me
              </label>
            </div>
            
            <a href="#" className="text-sm font-medium text-primary-500 hover:text-primary-400">
              Forgot password?
            </a>
          </div>
          
          <button
            type="submit"
            className="w-full btn btn-primary py-3 text-lg font-semibold"
          >
            Sign In
          </button>
        </form>
        
        <div className="text-center mt-6">
          <p className="text-sm text-slate-400">
            Don't have an account?{' '}
            <a href="#" className="font-medium text-primary-500 hover:text-primary-400">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;