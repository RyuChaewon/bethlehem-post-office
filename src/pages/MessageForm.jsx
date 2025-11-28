import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function MessageForm() {
  const navigate = useNavigate();
  const { theme } = useParams(); // sky 또는 stable

  const [nickname, setNickname] = useState('');
  const [content, setContent] = useState('');

  const handleNext = () => {
    // 1. 공백 제거 후 빈칸 검사
    if (!nickname.trim() || !content.trim()) {
      alert("닉네임과 내용을 모두 입력해주세요!");
      return;
    }

    // 2. 닉네임 길이 제한 (10자)
    if (nickname.length > 10) {
      alert("닉네임은 10글자까지만 가능해요!");
      return;
    }

    // 3. 내용 길이 제한 (300자)
    if (content.length > 300) {
      alert("내용이 너무 깁니다. 300자 이내로 줄여주세요!");
      return;
    }

    // 통과하면 다음으로 이동
    navigate(`/select/${theme}`, { state: { nickname, content } });
  };

  return (
    <div className="center-box">
      <button onClick={() => navigate(-1)}>X</button>
      <h3>{theme === 'sky' ? '🌙 밤편지 쓰기' : '🎁 예물 드리기'}</h3>
      
      {/* 닉네임 입력창 */}
      <input 
        placeholder="닉네임 (10자 이내)" 
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        maxLength={10} // ⭐️ 입력 자체를 10자로 막음
        style={{ padding: '15px', width: '100%', marginBottom: '10px' }}
      />
      
      {/* 내용 입력창 */}
      <textarea 
        placeholder="내용을 입력하세요 (최대 300자)" 
        rows={5} 
        value={content}
        onChange={(e) => setContent(e.target.value)}
        maxLength={300} // ⭐️ 입력 자체를 300자로 막음
        style={{ width: '100%', padding: '15px' }} 
      />
      
      {/* 글자수 표시 (선택사항) */}
      <div style={{ width: '100%', textAlign: 'right', fontSize: '0.8rem', opacity: 0.6, marginBottom: '20px' }}>
        {content.length} / 300
      </div>
      
      <button onClick={handleNext}>다음 (오너먼트 선택)</button>
    </div>
  );
}