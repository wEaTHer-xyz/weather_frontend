import { usePrivy } from '@privy-io/react-auth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './Login.css';

function Login() {
  const { login, authenticated, ready, user } = usePrivy();
  const navigate = useNavigate();

  useEffect(() => {
    if (ready && authenticated) {
      console.log('User is authenticated with Privy:', user);
      // Auto-redirect to app after successful login
      navigate('/app');
    }
  }, [ready, authenticated, user, navigate]);

  const handleSignUp = () => {
    login();
  };

  return (
    <div className="login-container">
      <div className="login-background"></div>

      <div className="login-content">
        <div className="login-card">
          <div className="login-header">
            <h1 className="login-title">
              <span className="gradient-text">wEaTHer</span>
            </h1>
            <p className="login-subtitle">
              {authenticated ? 'Welcome back!' : 'Sign in to your account'}
            </p>
            {authenticated && user && (
              <p className="login-user-info">
                Connected: {user.wallet?.address || user.email?.address || 'Unknown'}
              </p>
            )}
          </div>

          <div className="login-form">
            <button className="login-button" onClick={handleSignUp}>
              <span>Sign Up / Login with Privy</span>
            </button>

            <div className="divider">
              <span>or</span>
            </div>

            <button className="back-button" onClick={() => navigate('/')}>
              <span>Back to Home</span>
            </button>
          </div>

          <div className="login-footer">
            <p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
