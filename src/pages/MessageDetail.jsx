import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
// ⭐️ getMessageById (단건 조회) 함수가 필요합니다.
import { getMessageById } from '../firebase/messageService'; 

export default function MessageDetail() {
  const navigate = useNavigate();
  const { theme, id } = useParams();
  const { state } = useLocation(); // 🚚 리스트에서 보낸 짐(목록) 받기

  const [messages, setMessages] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      // 1. 리스트에서 넘어온 목록이 있는 경우 (화살표 가능)
      if (state && state.list) {
        setMessages(state.list);
        setLoading(false);
      } 
      // 2. 새로고침 등으로 목록 없이 들어온 경우 (화살표 불가, 단건 조회)
      else {
        const singleMsg = await getMessageById(id);
        if (singleMsg) {
          setMessages([singleMsg]); // 목록에 이거 하나만 넣음
        }
        setLoading(false);
      }
    };
    loadData();
  }, [id, state]);

  // 로딩 중
  if (loading) return <div className="center-box"><p>편지를 뜯는 중...📮</p></div>;

  // 현재 보고 있는 메시지 찾기
  const currentIndex = messages.findIndex((msg) => msg.id === id);
  const currentMessage = messages[currentIndex];

  if (!currentMessage) {
    return (
      <div className="center-box">
        <p>편지를 찾을 수 없어요 😢</p>
        <button onClick={() => navigate(`/${theme}`)} className="back-btn">목록으로</button>
      </div>
    );
  }

  // 이전/다음 ID 계산 (목록이 1개뿐이면 앞뒤가 없으므로 자동으로 버튼이 숨겨짐)
  const prevId = currentIndex > 0 ? messages[currentIndex - 1].id : null;
  const nextId = currentIndex < messages.length - 1 ? messages[currentIndex + 1].id : null;

  const handleMove = (targetId) => {
    if (targetId) {
      // 이동할 때도 현재 목록(messages)을 계속 들고 다녀야 함!
      navigate(`/read/${theme}/${targetId}`, { state: { list: messages } });
    }
  };

  return (
    <div className={`center-box theme-${theme}`}>
      {/* 닫기 버튼 */}
      <div className="back-btn-area" style={{ textAlign: 'right' }}>
        <button onClick={() => navigate(`/${theme}`)} className="back-btn" style={{ fontSize: '1.5rem', border: 'none' }}>
          ✕
        </button>
      </div>

      <div className="detail-card-container">
        {/* ⬅️ 이전 버튼 (없으면 안 보임) */}
        <button 
          className="nav-arrow-btn" 
          onClick={() => handleMove(prevId)} 
          disabled={!prevId}
          style={{ visibility: !prevId ? 'hidden' : 'visible' }}
        >
          ‹
        </button>

        {/* 💌 메시지 내용 */}
        <div className="detail-card">
          <div style={{ fontSize: '5rem', marginBottom: '20px' }}>
            {currentMessage.ornament}
          </div>
          
          <div style={{ 
            fontSize: '1.1rem', 
            lineHeight: '1.6', 
            whiteSpace: 'pre-wrap', 
            textAlign: 'left',
            flexGrow: 1, 
            display: 'flex', alignItems: 'center',
            marginBottom: '20px'
          }}>
            {currentMessage.content}
          </div>

          <div style={{ textAlign: 'right', opacity: 0.8, marginTop: 'auto' }}>
            From. <strong>{currentMessage.nickname}</strong>
          </div>
        </div>

        {/* ➡️ 다음 버튼 (없으면 안 보임) */}
        <button 
          className="nav-arrow-btn" 
          onClick={() => handleMove(nextId)} 
          disabled={!nextId}
          style={{ visibility: !nextId ? 'hidden' : 'visible' }}
        >
          ›
        </button>
      </div>
    </div>
  );
}