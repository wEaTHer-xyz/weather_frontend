import { usePrivy } from '@privy-io/react-auth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { isWebView, isMobile, openInSystemBrowser } from '../utils/browser';
import './Login.css';

function Login() {
  const { login, authenticated, ready, user } = usePrivy();
  const navigate = useNavigate();
  const [showWebViewWarning, setShowWebViewWarning] = useState(false);

  useEffect(() => {
    // WebView 환경 감지
    if (isWebView() && isMobile()) {
      setShowWebViewWarning(true);
    }
  }, []);

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
      // WebView 환경이면 시스템 브라우저로 리다이렉트
      if (isWebView() && isMobile()) {
        // 현재 URL을 시스템 브라우저에서 열기
        openInSystemBrowser(window.location.href);
        return;
      }
      
      await login();
      // 로그인 성공 후 리다이렉트는 useEffect에서 처리
      // Privy 모달이 닫힌 후 상태가 업데이트되므로 약간의 지연이 필요할 수 있음
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleOpenInBrowser = () => {
    openInSystemBrowser(window.location.href);
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

          {showWebViewWarning && (
            <div className="webview-warning">
              <div className="warning-icon">⚠️</div>
              <div className="warning-content">
                <h3>시스템 브라우저에서 로그인해주세요</h3>
                <p>
                  Google 로그인을 위해 시스템 브라우저(Chrome/Safari)에서 
                  열어주세요. 인앱 브라우저에서는 Google 로그인이 제한될 수 있습니다.
                </p>
                <button 
                  className="open-browser-button"
                  onClick={handleOpenInBrowser}
                >
                  시스템 브라우저에서 열기
                </button>
              </div>
            </div>
          )}

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
