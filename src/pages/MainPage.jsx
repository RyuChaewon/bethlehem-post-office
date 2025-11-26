import { useNavigate } from 'react-router-dom';

export default function MainPage() {
  const navigate = useNavigate();
  return (
    <div className="center-box">
      <h2>메인 로비</h2>
      <div style={{display:'flex', justifyContent:'space-between', marginTop:'50px'}}>
        <button onClick={() => navigate('/stable')}>🐴 마구간</button>
        <button onClick={() => navigate('/sky')}>⭐️ 밤하늘</button>
      </div>
      <button onClick={() => navigate('/outro')} style={{marginTop:'50px'}}>나가기</button>
    </div>
  );
}