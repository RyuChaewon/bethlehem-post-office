import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundLayout from './BackgroundLayout';
import { getMessages } from '../firebase/messageService';
import btnBack from '../assets/btn-back.svg';

const fontStyle = {
  fontFamily: "'Pretendard', sans-serif",
  fontSize: '12px',
  fontWeight: 100,
  color: 'white',
  textAlign: 'center',
  marginTop: '3px',
};

const MessageListLayout = ({ theme, bgImage, writeBtnImage, icons, writePath }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  const scrollRef = useRef(null);

  // 1. 메시지 가져오기
  const fetchMessages = useCallback(async (isFirst = false) => {
    if (loading || (!isFirst && !hasMore)) return;
    
    setLoading(true);
    try {
      const currentLastDoc = isFirst ? null : lastDoc;
      const result = await getMessages(theme, currentLastDoc);
      
      if (result.data.length === 0) {
        setHasMore(false);
      } else {
        const newMessages = result.data.map(msg => ({
          ...msg,
          // DB에 저장된 아이콘 번호 사용 (없으면 랜덤)
          iconIndex: msg.iconIndex !== undefined ? msg.iconIndex : Math.floor(Math.random() * icons.length),
          
          // [수정] 더 자연스럽게 흩뿌리기 위해 X, Y 좌표 랜덤 값 생성
          randomX: Math.floor(Math.random() * 30) - 15, // 좌우로 -15px ~ +15px 흔들림
          randomY: Math.floor(Math.random() * 70),      // 위아래로 0px ~ 60px 랜덤 여백 (높낮이 차이)
        }));

        setMessages(prev => isFirst ? newMessages : [...prev, ...newMessages]);
        setLastDoc(result.lastVisible);
        
        if (result.data.length < 10) setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to load messages", error);
    }
    setLoading(false);
  }, [theme, loading, hasMore, lastDoc, icons]);

  // 2. 초기 로딩
  useEffect(() => {
    fetchMessages(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 3. 스크롤 이벤트
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 50) {
        fetchMessages(false);
      }
    }
  };

  return (
    <BackgroundLayout image={bgImage}>
      
      <style>
        {`@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css");`}
      </style>

      {/* Back 버튼 */}
      <button
        onClick={() => navigate('/main')}
        style={{
          position: 'absolute',
          top: '5.68%', 
          left: '11.02%', 
          width: '48px',
          height: '22px',
          background: 'none', border: 'none', padding: 0, cursor: 'pointer', zIndex: 10
        }}
      >
        <img src={btnBack} alt="Back" style={{ width: '100%', height: '100%' }} />
      </button>

      {/* 메시지 리스트 영역 */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        style={{
          position: 'absolute',
          top: '30%', 
          left: '50%',
          transform: 'translateX(-50%)',
          width: '320px',
          height: '370px',
          
          overflowY: 'auto', 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none', 
          
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)', // 3열
          gap: '10px', 
          padding: '5px 0px', 
          alignContent: 'start', // 아이템들이 위에서부터 차곡차곡 쌓이게
        }}
        className="hide-scrollbar"
      >
        <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>

        {/* [수정] map에서 index 제거 (ESLint 오류 해결) */}
        {messages.map((msg) => (
          <div 
            key={msg.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              
              // [수정] 높낮이를 0~60px 사이 랜덤값으로 설정 -> 가로줄이 딱 안 맞게 됨
              marginTop: `${msg.randomY}px`,
              
              // [수정] 좌우로도 살짝 흔들어서 격자 느낌 줄임
              transform: `translateX(${msg.randomX}px)`,
              
              cursor: 'pointer'
            }}
            onClick={() => navigate(`/${theme}/detail/${msg.id}`)}
          >
            <img 
              src={icons[msg.iconIndex] || icons[0]} 
              alt="icon" 
              style={{ width: '75px', height: '75px', objectFit: 'contain' }} 
            />
            <div style={fontStyle}>
              {msg.nickname || '익명'}
            </div>
          </div>
        ))}
        
        {loading && <div style={{...fontStyle, gridColumn: 'span 3'}}>로딩 중...</div>}
      </div>

      {/* 쓰기 버튼 */}
      <button
        onClick={() => navigate(writePath)}
        style={{
          position: 'absolute',
          top: '86.01%', 
          left: '42.05%', 
          width: '52px',
          height: '55px',
          background: 'none', border: 'none', padding: 0, cursor: 'pointer', zIndex: 10
        }}
      >
        <img src={writeBtnImage} alt="Write" style={{ width: '100%', height: '100%' }} />
      </button>

    </BackgroundLayout>
  );
};

export default MessageListLayout;