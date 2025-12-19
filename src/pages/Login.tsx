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
      // 약간의 지연을 두어 상태가 완전히 업데이트되도록 함
      const timer = setTimeout(() => {
        // replace: true를 사용하여 히스토리 스택에 로그인 페이지가 남지 않도록 함
        navigate('/app', { replace: true });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [ready, authenticated, user, navigate]);

  const handleSignUp = async () => {
    try {
      await login();
      // 로그인 성공 후 리다이렉트는 useEffect에서 처리
      // Privy 모달이 닫힌 후 상태가 업데이트되므로 약간의 지연이 필요할 수 있음
    } catch (error) {
      console.error('Login error:', error);
    }
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
