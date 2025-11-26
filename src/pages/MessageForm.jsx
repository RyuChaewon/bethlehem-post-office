import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function MessageForm() {
  const navigate = useNavigate();
  const { theme } = useParams(); // sky 또는 stable

  const [nickname, setNickname] = useState('');
  const [content, setContent] = useState('');

  const handleNext = () => {
    if (!nickname || !content) {
      alert("닉네임과 내용을 모두 입력해주세요!");
      return;
    }
    // 다음 페이지(오너먼트 선택)로 데이터 배달 🚚
    navigate(`/select/${theme}`, { state: { nickname, content } });
  };

  return (
    <div className="center-box">
      <button onClick={() => navigate(-1)}>X</button>
      <h3>{theme === 'sky' ? '🌙 밤편지 쓰기' : '🎁 예물 드리기'}</h3>
      
      <input 
        placeholder="닉네임" 
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
      />
      
      <textarea 
        placeholder="내용을 입력하세요" 
        rows={5} 
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ width: '100%', padding: '10px' }} 
      />
      
      <button onClick={handleNext}>다음 (오너먼트 선택)</button>
    </div>
  );
}