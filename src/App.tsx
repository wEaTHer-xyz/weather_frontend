import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Markets from './pages/Markets';
import MarketDetail from './pages/MarketDetail';
import Predictions from './pages/Predictions';
import Settings from './pages/Settings';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/app" element={<Dashboard />} />
      <Route path="/markets" element={<Markets />} />
      <Route path="/markets/:id" element={<MarketDetail />} />
      <Route path="/predictions" element={<Predictions />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default App;
