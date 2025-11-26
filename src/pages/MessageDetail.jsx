import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// 🛠️ getMessageById 대신 getMessages를 가져옵니다.
import { getMessages } from '../firebase/messageService'; 

export default function MessageDetail() {
  const navigate = useNavigate();
  const { theme, id } = useParams(); // URL에서 현재 테마와 ID 가져오기
  
  const [messages, setMessages] = useState([]); // 전체 리스트
  const [loading, setLoading] = useState(true);

  // 1. 해당 테마의 모든 메시지를 다 불러옵니다.
  useEffect(() => {
    const fetchAllMessages = async () => {
      setLoading(true);
      const data = await getMessages(theme); // 'sky' 또는 'stable' 전체 데이터
      setMessages(data);
      setLoading(false);
    };
    fetchAllMessages();
  }, [theme]); // 테마가 바뀔 때만 다시 불러옴

  // 로딩 중 표시
  if (loading) {
    return <div className="center-box"><p>편지 목록을 불러오는 중...📮</p></div>;
  }

  // 2. 현재 보고 있는 메시지의 순서(Index) 찾기
  const currentIndex = messages.findIndex((msg) => msg.id === id);
  const currentMessage = messages[currentIndex];

  // 예외 처리: 주소를 치고 들어왔는데 메시지가 없을 때
  if (!currentMessage) {
    return (
      <div className="center-box">
        <p>존재하지 않는 편지입니다 😢</p>
        <button onClick={() => navigate(`/${theme}`)} className="write-btn">돌아가기</button>
      </div>
    );
  }

  // 3. 이전/다음 ID 계산하기
  // 인덱스가 0보다 커야 이전이 있음
  const prevId = currentIndex > 0 ? messages[currentIndex - 1].id : null;
  // 인덱스가 마지막(length-1)보다 작아야 다음이 있음
  const nextId = currentIndex < messages.length - 1 ? messages[currentIndex + 1].id : null;

  // 4. 이동 함수
  const handleMove = (targetId) => {
    if (targetId) {
      navigate(`/read/${theme}/${targetId}`);
    }
  };

  return (
    <div className="center-box">
      {/* 상단 닫기 버튼 (리스트로 돌아가기) */}
      <div className="back-btn-area" style={{ textAlign: 'right' }}>
        <button onClick={() => navigate(`/${theme}`)} className="back-btn" style={{ fontSize: '1.5rem', border: 'none' }}>
          ✕
        </button>
      </div>

      {/* 메인 컨텐츠 영역 (좌 화살표 + 카드 + 우 화살표) */}
      <div className="detail-card-container">
        
        {/* ⬅️ 이전 버튼 */}
        <button 
          className="nav-arrow-btn" 
          onClick={() => handleMove(prevId)} 
          disabled={!prevId} // 이전이 없으면 버튼 비활성화
        >
          ‹
        </button>

        {/* 💌 메시지 카드 (통일된 디자인 적용) */}
        <div className="detail-card">
          <div style={{ fontSize: '5rem', marginBottom: '20px' }}>
            {currentMessage.ornament}
          </div>
          
          {/* 본문 내용 (줄바꿈 적용, 왼쪽 정렬) */}
          <div style={{ 
            fontSize: '1.1rem', 
            lineHeight: '1.6', 
            whiteSpace: 'pre-wrap', 
            textAlign: 'left',
            flexGrow: 1, // 내용이 적어도 높이 유지
            display: 'flex', alignItems: 'center', // 내용 중앙 정렬
            marginBottom: '20px'
          }}>
            {currentMessage.content}
          </div>

          <div style={{ textAlign: 'right', opacity: 0.8, marginTop: 'auto' }}>
            From. <strong>{currentMessage.nickname}</strong>
          </div>
        </div>

        {/* ➡️ 다음 버튼 */}
        <button 
          className="nav-arrow-btn" 
          onClick={() => handleMove(nextId)} 
          disabled={!nextId} // 다음이 없으면 버튼 비활성화
        >
          ›
        </button>

      </div>
      
      {/* 하단 현재 위치 표시 (선택사항) */}
      <p style={{marginTop: '20px', opacity: 0.5}}>
        {currentIndex + 1} / {messages.length}
      </p>

    </div>
  );
}