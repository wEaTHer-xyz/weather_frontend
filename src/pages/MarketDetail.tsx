import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePrivy } from '@privy-io/react-auth';
import Sidebar from '../components/Sidebar';
import './MarketDetail.css';

interface Market {
  id: string;
  country: string;
  countryName: string;
  city: string;
  question: string;
  pool: number;
  participants: number;
  endDate: string;
  status: 'active' | 'closed' | 'resolved';
  createdAt: string;
  updatedAt: string;
}

function MarketDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, authenticated } = usePrivy();
  const [market, setMarket] = useState<Market | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showBetModal, setShowBetModal] = useState(false);
  const [betType, setBetType] = useState<'buy' | 'sell'>('buy');
  const [betAmount, setBetAmount] = useState('');
  const [betPrice, setBetPrice] = useState('0.5');
  const [betting, setBetting] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  useEffect(() => {
    if (!id) {
      setError('마켓 ID가 없습니다.');
      setLoading(false);
      return;
    }

    fetchMarket();
  }, [id]);

  const fetchMarket = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/markets/${id}`);
      const data = await response.json();

      if (data.success) {
        setMarket(data.data);
      } else {
        setError(data.error || '마켓을 불러올 수 없습니다.');
      }
    } catch (err) {
      console.error('마켓 조회 오류:', err);
      setError('마켓을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const getCountryFlag = (countryCode: string) => {
    const flags: { [key: string]: string } = {
      US: '🇺🇸',
      CN: '🇨🇳',
      JP: '🇯🇵',
      GB: '🇬🇧',
      KR: '🇰🇷',
    };
    return flags[countryCode] || '🌍';
  };

  const handleBetClick = () => {
    if (!authenticated) {
      navigate('/login');
      return;
    }
    setShowBetModal(true);
  };

  const handleBetSubmit = async () => {
    if (!market || !user?.id) return;

    const amount = parseFloat(betAmount);
    const price = parseFloat(betPrice);

    if (isNaN(amount) || amount <= 0) {
      alert('올바른 금액을 입력해주세요.');
      return;
    }

    if (isNaN(price) || price < 0 || price > 1) {
      alert('가격은 0.0 ~ 1.0 사이여야 합니다.');
      return;
    }

    try {
      setBetting(true);
      const response = await fetch(`${API_BASE_URL}/api/markets/${market.id}/bet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          type: betType,
          amount,
          price,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert('베팅이 완료되었습니다!');
        setShowBetModal(false);
        setBetAmount('');
        setBetPrice('0.5');
        // 마켓 정보 새로고침
        fetchMarket();
        // My Predictions 페이지로 이동
        navigate('/predictions');
      } else {
        alert(data.error || '베팅 중 오류가 발생했습니다.');
      }
    } catch (err) {
      console.error('베팅 오류:', err);
      alert('베팅 중 오류가 발생했습니다.');
    } finally {
      setBetting(false);
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert('링크가 클립보드에 복사되었습니다!');
    });
  };

  if (loading) {
    return (
      <div className="market-detail-container">
        <Sidebar />
        <div className="market-detail-main">
          <div className="loading">마켓 정보를 불러오는 중...</div>
        </div>
      </div>
    );
  }

  if (error || !market) {
    return (
      <div className="market-detail-container">
        <Sidebar />
        <div className="market-detail-main">
          <div className="error-message">
            <h2>오류</h2>
            <p>{error || '마켓을 찾을 수 없습니다.'}</p>
            <button onClick={() => navigate('/markets')} className="back-button">
              마켓 목록으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="market-detail-container">
      <Sidebar />
      <div className="market-detail-main">
        <header className="market-detail-header">
          <button onClick={() => navigate('/markets')} className="back-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            뒤로 가기
          </button>
        </header>

        <main className="market-detail-content">
          <div className="market-detail-card">
            <div className="market-header">
              <div className="market-location">
                <span className="market-flag">{getCountryFlag(market.country)}</span>
                <div>
                  <h1 className="market-city">{market.city}</h1>
                  <p className="market-country">{market.countryName}</p>
                </div>
              </div>
              <span className={`market-status-badge ${market.status}`}>
                {market.status === 'active' ? '활성' : market.status === 'closed' ? '종료' : '결과 확정'}
              </span>
            </div>

            <div className="market-question-section">
              <h2 className="question-title">예측 질문</h2>
              <p className="question-text">{market.question}</p>
            </div>

            <div className="market-stats-grid">
              <div className="stat-card">
                <div className="stat-label">총 풀</div>
                <div className="stat-value">${market.pool.toLocaleString()}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">참여자</div>
                <div className="stat-value">{market.participants}명</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">종료일</div>
                <div className="stat-value">
                  {new Date(market.endDate).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-label">생성일</div>
                <div className="stat-value">
                  {new Date(market.createdAt).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </div>
            </div>

            <div className="market-actions">
              <button 
                className="action-button primary"
                onClick={handleBetClick}
                disabled={market.status !== 'active'}
              >
                <span>예측 참여하기</span>
              </button>
              <button className="action-button secondary" onClick={handleShare}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '0.5rem' }}>
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                  <polyline points="16 6 12 2 8 6"/>
                  <line x1="12" y1="2" x2="12" y2="15"/>
                </svg>
                공유하기
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* 베팅 모달 */}
      {showBetModal && (
        <div className="bet-modal-overlay" onClick={() => setShowBetModal(false)}>
          <div className="bet-modal" onClick={(e) => e.stopPropagation()}>
            <div className="bet-modal-header">
              <h2>예측 참여</h2>
              <button className="modal-close" onClick={() => setShowBetModal(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <div className="bet-modal-content">
              <div className="bet-type-selector">
                <button
                  className={`bet-type-btn ${betType === 'buy' ? 'active' : ''}`}
                  onClick={() => setBetType('buy')}
                >
                  <div className="bet-type-content">
                    <span className="bet-type-icon">📈</span>
                    <span className="bet-type-label">사기 (매수)</span>
                    <span className="bet-type-desc">예측이 맞을 것이라고 생각합니다</span>
                  </div>
                </button>
                <button
                  className={`bet-type-btn ${betType === 'sell' ? 'active' : ''}`}
                  onClick={() => setBetType('sell')}
                >
                  <div className="bet-type-content">
                    <span className="bet-type-icon">📉</span>
                    <span className="bet-type-label">팔기 (매도)</span>
                    <span className="bet-type-desc">예측이 틀릴 것이라고 생각합니다</span>
                  </div>
                </button>
              </div>

              <div className="bet-form">
                <div className="form-group">
                  <label className="form-label">베팅 금액 ($)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={betAmount}
                    onChange={(e) => setBetAmount(e.target.value)}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">예측 가격 (0.0 ~ 1.0)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={betPrice}
                    onChange={(e) => setBetPrice(e.target.value)}
                    placeholder="0.5"
                    min="0"
                    max="1"
                    step="0.01"
                  />
                  <p className="form-hint">0.0 = 확실히 틀림, 1.0 = 확실히 맞음</p>
                </div>

                <div className="bet-summary">
                  <div className="summary-row">
                    <span>베팅 타입:</span>
                    <span className="summary-value">{betType === 'buy' ? '매수' : '매도'}</span>
                  </div>
                  <div className="summary-row">
                    <span>베팅 금액:</span>
                    <span className="summary-value">${betAmount || '0.00'}</span>
                  </div>
                  <div className="summary-row">
                    <span>예측 가격:</span>
                    <span className="summary-value">{betPrice}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bet-modal-footer">
              <button className="modal-button cancel" onClick={() => setShowBetModal(false)}>
                취소
              </button>
              <button 
                className="modal-button submit"
                onClick={handleBetSubmit}
                disabled={betting || !betAmount || !betPrice}
              >
                {betting ? '베팅 중...' : '베팅하기'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MarketDetail;

