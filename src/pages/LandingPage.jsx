import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="center-box">
      <h1>📮 베들레헴 우체국</h1>
      <button onClick={() => navigate('/entrance')}>START</button>
    </div>
  );
}