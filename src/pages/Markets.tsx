import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import './Markets.css';

interface Market {
  id: string;
  country: string;
  countryName?: string;
  city: string;
  question: string;
  pool: number;
  participants: number;
  endDate: string;
  status: 'active' | 'closed' | 'resolved';
}

const countries = [
  { code: 'US', name: 'United States', flag: '🇺🇸', cities: ['New York', 'Los Angeles', 'Chicago', 'Houston'] },
  { code: 'CN', name: 'China', flag: '🇨🇳', cities: ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen'] },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', cities: ['Tokyo', 'Osaka', 'Yokohama', 'Kyoto'] },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', cities: ['London', 'Manchester', 'Birmingham', 'Edinburgh'] },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', cities: ['Seoul', 'Busan', 'Incheon', 'Daegu'] },
];

const sampleMarkets: Market[] = [
  {
    id: '1',
    country: 'US',
    city: 'New York',
    question: 'Will it rain tomorrow?',
    pool: 1234,
    participants: 45,
    endDate: '2025-12-15',
    status: 'active',
  },
  {
    id: '2',
    country: 'US',
    city: 'Los Angeles',
    question: 'Will temperature exceed 25°C?',
    pool: 856,
    participants: 32,
    endDate: '2025-12-16',
    status: 'active',
  },
  {
    id: '3',
    country: 'CN',
    city: 'Beijing',
    question: 'Will it snow this week?',
    pool: 2145,
    participants: 67,
    endDate: '2025-12-17',
    status: 'active',
  },
  {
    id: '4',
    country: 'JP',
    city: 'Tokyo',
    question: 'Will humidity be above 70%?',
    pool: 1567,
    participants: 54,
    endDate: '2025-12-18',
    status: 'active',
  },
  {
    id: '5',
    country: 'GB',
    city: 'London',
    question: 'Will temperature drop below 5°C?',
    pool: 987,
    participants: 38,
    endDate: '2025-12-19',
    status: 'active',
  },
  {
    id: '6',
    country: 'KR',
    city: 'Seoul',
    question: 'Will it be sunny for 3+ days?',
    pool: 1756,
    participants: 61,
    endDate: '2025-12-20',
    status: 'active',
  },
];

function Markets() {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [markets, setMarkets] = useState<Market[]>(sampleMarkets);
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  // 백엔드에서 마켓 데이터 가져오기
  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (selectedCountry !== 'all') params.append('country', selectedCountry);
        if (selectedCity !== 'all') params.append('city', selectedCity);
        if (searchQuery) params.append('search', searchQuery);

        const response = await fetch(`${API_BASE_URL}/api/markets?${params.toString()}`);
        const data = await response.json();

        if (data.success) {
          setMarkets(data.data);
        } else {
          // 백엔드 오류 시 샘플 데이터 사용
          setMarkets(sampleMarkets);
        }
      } catch (error) {
        console.error('마켓 조회 오류:', error);
        // 네트워크 오류 시 샘플 데이터 사용
        setMarkets(sampleMarkets);
      } finally {
        setLoading(false);
      }
    };

    fetchMarkets();
  }, [selectedCountry, selectedCity, searchQuery]);

  const filteredMarkets = markets.filter((market) => {
    const countryMatch = selectedCountry === 'all' || market.country === selectedCountry;
    const cityMatch = selectedCity === 'all' || market.city === selectedCity;
    const searchMatch =
      searchQuery === '' ||
      market.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      market.question.toLowerCase().includes(searchQuery.toLowerCase());
    return countryMatch && cityMatch && searchMatch;
  });

  const selectedCountryData = countries.find((c) => c.code === selectedCountry);
  const availableCities = selectedCountryData?.cities || [];

  const handleMarketClick = (marketId: string) => {
    navigate(`/markets/${marketId}`);
  };

  return (
    <div className="markets-container">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="markets-main-wrapper">
        {/* Header */}
        <header className="markets-header">
          <div className="header-content">
            <h1 className="page-title">Weather Markets</h1>
            <div className="header-search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Search markets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </header>

        {/* Filters */}
        <div className="filters-section">
          <div className="filter-group">
            <label className="filter-label">Country</label>
            <div className="country-selector">
              <button
                className={`country-btn ${selectedCountry === 'all' ? 'active' : ''}`}
                onClick={() => {
                  setSelectedCountry('all');
                  setSelectedCity('all');
                }}
              >
                All Countries
              </button>
              {countries.map((country) => (
                <button
                  key={country.code}
                  className={`country-btn ${selectedCountry === country.code ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedCountry(country.code);
                    setSelectedCity('all');
                  }}
                >
                  <span className="country-flag">{country.flag}</span>
                  <span>{country.name}</span>
                </button>
              ))}
            </div>
          </div>

          {selectedCountry !== 'all' && (
            <div className="filter-group">
              <label className="filter-label">City</label>
              <div className="city-selector">
                <button
                  className={`city-btn ${selectedCity === 'all' ? 'active' : ''}`}
                  onClick={() => setSelectedCity('all')}
                >
                  All Cities
                </button>
                {availableCities.map((city) => (
                  <button
                    key={city}
                    className={`city-btn ${selectedCity === city ? 'active' : ''}`}
                    onClick={() => setSelectedCity(city)}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Markets Grid */}
        <main className="markets-content">
          {filteredMarkets.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <h3>No markets found</h3>
              <p>Try adjusting your filters or search query</p>
            </div>
          ) : (
            <div className="markets-grid">
              {filteredMarkets.map((market) => {
                const countryData = countries.find((c) => c.code === market.country);
                const getCountryFlag = (code: string) => {
                  const flags: { [key: string]: string } = {
                    US: '🇺🇸',
                    CN: '🇨🇳',
                    JP: '🇯🇵',
                    GB: '🇬🇧',
                    KR: '🇰🇷',
                  };
                  return flags[code] || '🌍';
                };
                return (
                  <div
                    key={market.id}
                    className="market-card"
                    onClick={() => handleMarketClick(market.id)}
                  >
                    <div className="market-card-header">
                      <div className="market-location">
                        <span className="market-flag">{getCountryFlag(market.country)}</span>
                        <div>
                          <h3 className="market-city">{market.city}</h3>
                          <p className="market-country">{market.countryName || countryData?.name || market.country}</p>
                        </div>
                      </div>
                      <span className={`market-status ${market.status}`}>
                        {market.status === 'active' ? 'Active' : 'Closed'}
                      </span>
                    </div>

                    <div className="market-question">
                      <p>{market.question}</p>
                    </div>

                    <div className="market-stats">
                      <div className="market-stat">
                        <span className="stat-label">Pool</span>
                        <span className="stat-value">${market.pool.toLocaleString()}</span>
                      </div>
                      <div className="market-stat">
                        <span className="stat-label">Participants</span>
                        <span className="stat-value">{market.participants}</span>
                      </div>
                      <div className="market-stat">
                        <span className="stat-label">Ends</span>
                        <span className="stat-value">{new Date(market.endDate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <button className="market-action-btn">View Market</button>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Markets;

