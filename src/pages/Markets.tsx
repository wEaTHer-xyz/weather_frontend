import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Markets.css';

interface Market {
  id: string;
  country: string;
  city: string;
  question: string;
  pool: number;
  participants: number;
  endDate: string;
  status: 'active' | 'closed';
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
    endDate: '2024-12-15',
    status: 'active',
  },
  {
    id: '2',
    country: 'US',
    city: 'Los Angeles',
    question: 'Will temperature exceed 25°C?',
    pool: 856,
    participants: 32,
    endDate: '2024-12-16',
    status: 'active',
  },
  {
    id: '3',
    country: 'CN',
    city: 'Beijing',
    question: 'Will it snow this week?',
    pool: 2145,
    participants: 67,
    endDate: '2024-12-17',
    status: 'active',
  },
  {
    id: '4',
    country: 'JP',
    city: 'Tokyo',
    question: 'Will humidity be above 70%?',
    pool: 1567,
    participants: 54,
    endDate: '2024-12-18',
    status: 'active',
  },
  {
    id: '5',
    country: 'GB',
    city: 'London',
    question: 'Will temperature drop below 5°C?',
    pool: 987,
    participants: 38,
    endDate: '2024-12-19',
    status: 'active',
  },
  {
    id: '6',
    country: 'KR',
    city: 'Seoul',
    question: 'Will it be sunny for 3+ days?',
    pool: 1756,
    participants: 61,
    endDate: '2024-12-20',
    status: 'active',
  },
];

function Markets() {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMarkets = sampleMarkets.filter((market) => {
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
      <aside className="markets-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo" onClick={() => navigate('/app')}>
            <div className="logo-icon">🌍</div>
            <span className="logo-text">wEaTHer</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          <div className="nav-section">
            <div className="nav-item" onClick={() => navigate('/app')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7"/>
                <rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/>
              </svg>
              <span>Dashboard</span>
            </div>
            <div className="nav-item active">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
              <span>Markets</span>
            </div>
            <div className="nav-item" onClick={() => navigate('/app')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
              <span>My Predictions</span>
            </div>
          </div>
        </nav>
      </aside>

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
                return (
                  <div
                    key={market.id}
                    className="market-card"
                    onClick={() => handleMarketClick(market.id)}
                  >
                    <div className="market-card-header">
                      <div className="market-location">
                        <span className="market-flag">{countryData?.flag}</span>
                        <div>
                          <h3 className="market-city">{market.city}</h3>
                          <p className="market-country">{countryData?.name}</p>
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

