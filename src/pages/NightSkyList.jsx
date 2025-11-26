import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMessages } from '../firebase/messageService';

export default function NightSkyList() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMessages('sky');
      setMessages(data);
    };
    fetchData();
  }, []);

  return (
    <div className="center-box">
      {/* 뒤로가기 영역 */}
      <div className="back-btn-area">
        <button onClick={() => navigate('/main')} className="back-btn">
          ← Back
        </button>
      </div>

      <h2>☁️ 하늘에 새기는 밤편지</h2>
      <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '20px' }}>
        공동체를 향한 마음들이 모여있어요
      </p>
      
      {/* 리스트 영역 (CSS Grid 사용 추천) */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
        {messages.length === 0 && <p style={{opacity: 0.5, marginTop: '50px'}}>아직 도착한 편지가 없어요</p>}

        {messages.map((msg) => (
          <div 
            key={msg.id}
            onClick={() => navigate(`/read/sky/${msg.id}`)} 
            className="message-card" // 👈 아까 만든 공통 디자인 적용!
          >
            <div className="message-icon">{msg.ornament}</div>
            <div className="message-name">{msg.nickname}</div>
          </div>
        ))}
      </div>

      <button onClick={() => navigate('/write/sky')} className="write-btn">
        + 밤편지 쓰기
      </button>
    </div>
  );
}