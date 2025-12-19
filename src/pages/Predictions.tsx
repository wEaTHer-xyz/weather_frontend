import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePrivy } from '@privy-io/react-auth';
import Sidebar from '../components/Sidebar';
import './Predictions.css';

interface Bet {
  id: string;
  marketId: string;
  userId: string;
  type: 'buy' | 'sell';
  amount: number;
  price: number;
  createdAt: string;
  updatedAt: string;
  market: {
    id: string;
    city: string;
    countryName: string;
    question: string;
    status: 'active' | 'closed' | 'resolved';
    endDate: string;
  };
}

function Predictions() {
  const navigate = useNavigate();
  const { user, authenticated } = usePrivy();
  const [bets, setBets] = useState<Bet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  useEffect(() => {
    if (authenticated && user?.id) {
      fetchBets();
    } else {
      setLoading(false);
    }
  }, [authenticated, user?.id]);

  const fetchBets = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/users/${user.id}/bets`);
      const data = await response.json();

      if (data.success) {
        setBets(data.data);
      } else {
        setError(data.error || '베팅 내역을 불러올 수 없습니다.');
      }
    } catch (err) {
      console.error('베팅 조회 오류:', err);
      setError('베팅 내역을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const getCountryFlag = (countryName: string) => {
    const flags: { [key: string]: string } = {
      'United States': '🇺🇸',
      'China': '🇨🇳',
      'Japan': '🇯🇵',
      'United Kingdom': '🇬🇧',
      'South Korea': '🇰🇷',
    };
    return flags[countryName] || '🌍';
  };

  const handleBetClick = (marketId: string) => {
    navigate(`/markets/${marketId}`);
  };

  if (!authenticated) {
    return (
      <div className="predictions-container">
        <Sidebar />
        <div className="predictions-main-wrapper">
          <div className="empty-state">
            <div className="empty-icon">🔒</div>
            <h3>로그인이 필요합니다</h3>
            <p>베팅 내역을 보려면 먼저 로그인해주세요.</p>
            <button 
              className="login-button"
              onClick={() => navigate('/login')}
            >
              로그인하기
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="predictions-container">
        <Sidebar />
        <div className="predictions-main-wrapper">
          <div className="loading">베팅 내역을 불러오는 중...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="predictions-container">
        <Sidebar />
        <div className="predictions-main-wrapper">
          <div className="error-message">
            <h2>오류</h2>
            <p>{error}</p>
            <button onClick={fetchBets} className="retry-button">
              다시 시도
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="predictions-container">
      <Sidebar />
      <div className="predictions-main-wrapper">
        <header className="predictions-header">
          <div className="header-content">
            <h1 className="page-title">My Predictions</h1>
            <p className="page-subtitle">내가 참여한 베팅 목록</p>
          </div>
        </header>

        <main className="predictions-content">
          {bets.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📊</div>
              <h3>아직 베팅한 내역이 없습니다</h3>
              <p>마켓에서 예측에 참여해보세요!</p>
              <button 
                className="go-to-markets-button"
                onClick={() => navigate('/markets')}
              >
                마켓 둘러보기
              </button>
            </div>
          ) : (
            <div className="predictions-list">
              {bets.map((bet) => (
                <div
                  key={bet.id}
                  className="prediction-card"
                  onClick={() => handleBetClick(bet.market.id)}
                >
                  <div className="prediction-card-header">
                    <div className="prediction-location">
                      <span className="prediction-flag">
                        {getCountryFlag(bet.market.countryName)}
                      </span>
                      <div>
                        <h3 className="prediction-city">{bet.market.city}</h3>
                        <p className="prediction-country">{bet.market.countryName}</p>
                      </div>
                    </div>
                    <span className={`prediction-status ${bet.market.status}`}>
                      {bet.market.status === 'active' 
                        ? '활성' 
                        : bet.market.status === 'closed' 
                        ? '종료' 
                        : '결과 확정'}
                    </span>
                  </div>

                  <div className="prediction-question">
                    <p>{bet.market.question}</p>
                  </div>

                  <div className="prediction-bet-info">
                    <div className="bet-info-row">
                      <span className="bet-info-label">베팅 타입:</span>
                      <span className={`bet-type-badge ${bet.type}`}>
                        {bet.type === 'buy' ? '📈 매수' : '📉 매도'}
                      </span>
                    </div>
                    <div className="bet-info-row">
                      <span className="bet-info-label">베팅 금액:</span>
                      <span className="bet-info-value">${bet.amount.toLocaleString()}</span>
                    </div>
                    <div className="bet-info-row">
                      <span className="bet-info-label">예측 가격:</span>
                      <span className="bet-info-value">{bet.price.toFixed(2)}</span>
                    </div>
                    <div className="bet-info-row">
                      <span className="bet-info-label">베팅 일시:</span>
                      <span className="bet-info-value">
                        {new Date(bet.createdAt).toLocaleString('ko-KR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="prediction-footer">
                    <button className="view-market-button">
                      마켓 보기 →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Predictions;
