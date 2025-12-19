import { usePrivy } from '@privy-io/react-auth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import './Settings.css';

interface UserProfile {
  id: string;
  privyId: string;
  email: string | null;
  nickname: string | null;
  profileImage: string | null;
  googleName: string | null;
  googlePicture: string | null;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function Settings() {
  const { authenticated, ready, user, logout } = usePrivy();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [nickname, setNickname] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [backendError, setBackendError] = useState<string | null>(null);

  useEffect(() => {
    if (ready && !authenticated) {
      navigate('/login');
    }
  }, [ready, authenticated, navigate]);

  useEffect(() => {
    if (ready && authenticated && user) {
      fetchProfile();
    }
  }, [ready, authenticated, user]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setBackendError(null); // 오류 초기화
      const privyId = user?.id || '';
      
      if (!privyId) {
        console.error('Privy ID가 없습니다.');
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/user/profile/${privyId}`);
      
      if (!response.ok) {
        // 404는 사용자가 아직 생성되지 않은 경우이므로 정상
        if (response.status === 404) {
          setNickname('');
          const userGoogleImg = (user as any)?.google?.picture;
          setImagePreview(userGoogleImg || null);
          setLoading(false);
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();

      if (data.success) {
        setProfile(data.user);
        setNickname(data.user.nickname || '');
        // 이미지 URL 처리 (상대 경로인 경우 API_BASE_URL 추가)
        const profileImg = data.user.profileImage;
        const googleImg = data.user.googlePicture;
        if (profileImg) {
          setImagePreview(profileImg.startsWith('http') ? profileImg : `${API_BASE_URL}${profileImg}`);
        } else if (googleImg) {
          setImagePreview(googleImg);
        } else {
          const userGoogleImg = (user as any)?.google?.picture;
          setImagePreview(userGoogleImg || null);
        }
        setBackendError(null); // 성공 시 오류 메시지 제거
      } else {
        // 백엔드에서 사용자를 생성하지 못한 경우, 기본값 설정
        setNickname('');
        const userGoogleImg = (user as any)?.google?.picture;
        setImagePreview(userGoogleImg || null);
      }
    } catch (error: any) {
      console.error('프로필 조회 오류:', error);
      // 백엔드 연결 실패 시 기본값 설정 (Privy 정보만 사용)
      setNickname('');
      const userGoogleImg = (user as any)?.google?.picture;
      setImagePreview(userGoogleImg || null);
      
      // 백엔드 연결 오류인 경우 UI에 표시
      if (error.message?.includes('Failed to fetch') || error.message?.includes('ERR_CONNECTION_REFUSED')) {
        setBackendError('백엔드 서버에 연결할 수 없습니다. 백엔드 서버가 실행 중인지 확인해주세요.');
        console.warn('백엔드 서버에 연결할 수 없습니다. 백엔드 서버가 실행 중인지 확인해주세요.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!user?.id) {
      alert('사용자 정보를 불러올 수 없습니다.');
      return;
    }

    try {
      setSaving(true);
      const privyId = user.id;

      // 프로필 업데이트
      const updateData: any = {
        nickname: nickname || null,
        email: user.email?.address || null,
        googleName: (user as any).google?.name || null,
        googlePicture: (user as any).google?.picture || null,
      };

      const updateResponse = await fetch(`${API_BASE_URL}/api/user/profile/${privyId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!updateResponse.ok) {
        throw new Error(`HTTP error! status: ${updateResponse.status}`);
      }

      const updateResult = await updateResponse.json();

      // 이미지 업로드
      if (selectedImage) {
        const formData = new FormData();
        formData.append('image', selectedImage);

        const imageResponse = await fetch(`${API_BASE_URL}/api/user/profile/${privyId}/image`, {
          method: 'POST',
          body: formData,
        });

        if (!imageResponse.ok) {
          throw new Error(`Image upload failed! status: ${imageResponse.status}`);
        }

        const imageResult = await imageResponse.json();
        if (imageResult.success) {
          setProfile(imageResult.user);
          // 이미지 URL 처리
          const imgUrl = imageResult.imageUrl || imageResult.user.profileImage;
          setImagePreview(imgUrl.startsWith('http') ? imgUrl : `${API_BASE_URL}${imgUrl}`);
          setSelectedImage(null);
        }
      } else if (updateResult.success) {
        setProfile(updateResult.user);
      }

      alert('변경사항이 저장되었습니다.');
    } catch (error: any) {
      console.error('저장 오류:', error);
      if (error.message?.includes('Failed to fetch') || error.message?.includes('ERR_CONNECTION_REFUSED')) {
        setBackendError('백엔드 서버에 연결할 수 없습니다. 백엔드 서버가 실행 중인지 확인해주세요.');
        alert('백엔드 서버에 연결할 수 없습니다. 백엔드 서버가 실행 중인지 확인해주세요.');
      } else {
        alert('저장 중 오류가 발생했습니다: ' + error.message);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!ready || !authenticated) {
    return (
      <div className="settings-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="settings-container">
        <div className="loading">프로필을 불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className="settings-container">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="settings-main-wrapper">
        {/* Header */}
        <header className="settings-header">
          <h1 className="page-title">Settings</h1>
          <div className="header-actions">
            <button className="logout-btn" onClick={handleLogout}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Logout
            </button>
          </div>
        </header>

        {/* Settings Content */}
        <main className="settings-content">
          {backendError && (
            <div className="backend-error-banner" style={{
              padding: '12px 16px',
              marginBottom: '24px',
              backgroundColor: '#ff4444',
              color: 'white',
              borderRadius: '8px',
              fontSize: '14px',
            }}>
              ⚠️ {backendError}
              <div style={{ marginTop: '8px', fontSize: '12px', opacity: 0.9 }}>
                백엔드 서버를 실행하려면: <code style={{ backgroundColor: 'rgba(0,0,0,0.2)', padding: '2px 6px', borderRadius: '4px' }}>cd weather_backend && npm run dev</code>
              </div>
            </div>
          )}
          <div className="settings-section">
            <h2 className="section-title">귀하의 프로필</h2>
            <p className="section-description">호스트 또는 게스트로 표시되는 방식을 선택하세요.</p>

            <div className="profile-form">
              {/* 프로필 이미지 */}
              <div className="profile-image-section">
                <div className="profile-image-container">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Profile" className="profile-image" />
                  ) : (
                    <div className="profile-image-placeholder">
                      {(user as any)?.google?.name?.charAt(0).toUpperCase() || user?.email?.address?.charAt(0).toUpperCase() || profile?.nickname?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  )}
                  <label className="profile-image-upload">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      style={{ display: 'none' }}
                    />
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/>
                      <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                  </label>
                </div>
              </div>

              {/* 기본 정보 */}
              <div className="form-group">
                <label className="form-label">이름</label>
                <input
                  type="text"
                  className="form-input"
                  value={user?.google?.name || user?.email?.address || 'N/A'}
                  disabled
                  readOnly
                />
                <p className="form-hint">Google에서 가져온 정보입니다.</p>
              </div>

              <div className="form-group">
                <label className="form-label">이메일</label>
                <input
                  type="email"
                  className="form-input"
                  value={profile?.email || user?.email?.address || user?.google?.email || 'N/A'}
                  disabled
                  readOnly
                />
                <p className="form-hint">Privy 로그인 이메일입니다.</p>
              </div>

              <div className="form-group">
                <label className="form-label">닉네임</label>
                <input
                  type="text"
                  className="form-input"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="닉네임을 입력하세요"
                />
                <p className="form-hint">다른 사용자에게 표시될 닉네임입니다.</p>
              </div>

              {/* Google 정보 표시 */}
              {((user as any)?.google || profile?.googleName) && (
                <div className="google-info-section">
                  <h3 className="subsection-title">Google 정보</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="info-label">Google 이름:</span>
                      <span className="info-value">{profile?.googleName || (user as any)?.google?.name || 'N/A'}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Google 이메일:</span>
                      <span className="info-value">{(user as any)?.google?.email || 'N/A'}</span>
                    </div>
                    {((user as any)?.google?.picture || profile?.googlePicture) && (
                      <div className="info-item">
                        <span className="info-label">Google 프로필 사진:</span>
                        <img src={profile?.googlePicture || (user as any)?.google?.picture} alt="Google Profile" className="google-picture" />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 저장 버튼 */}
              <div className="form-actions">
                <button
                  className="save-button"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? '저장 중...' : '변경 사항 저장'}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Settings;

