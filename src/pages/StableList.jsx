import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMessages } from '../firebase/messageService';

export default function StableList() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMessages('stable');
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

      <h2>👑 예수님께 드리는 생일 예물</h2>
      <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '20px' }}>
        예수님을 향한 사랑의 마음을 적어보아요
      </p>
      
      {/* 리스트 영역 */}
      <div className="list-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
        {messages.length === 0 && <p style={{opacity: 0.5, marginTop: '50px'}}>아직 도착한 예물이 없어요</p>}

        {messages.map((msg) => (
          <div 
            key={msg.id}
            onClick={() => navigate(`/read/stable/${msg.id}`)} 
            className="message-card" // 👈 여기도 똑같은 디자인 적용!
          >
            <div className="message-icon">{msg.ornament}</div>
            <div className="message-name">{msg.nickname}</div>
          </div>
        ))}
      </div>

      <button onClick={() => navigate('/write/stable')} className="write-btn">
        + 예물 드리기
      </button>
    </div>
  );
}