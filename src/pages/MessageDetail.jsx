import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BackgroundLayout from '../components/BackgroundLayout';
import { getMessageById, getAdjacentMessageId } from '../firebase/messageService';

import bgNightSkyRead from '../assets/bg-nightsky-read.svg'; 
import bgStableRead from '../assets/bg-stable-read.svg';

import btnReadX from '../assets/btn-read-x.svg';
import imgReadBox from '../assets/img-read-box.svg'; // 327x450 비율의 이미지 사용 권장
import btnLeft from '../assets/btn-left.svg';
import btnRight from '../assets/btn-right.svg';

const MessageDetail = () => {
  const { theme, id } = useParams();
  const navigate = useNavigate();
  
  const [message, setMessage] = useState(null);
  const [prevId, setPrevId] = useState(null);
  const [nextId, setNextId] = useState(null);
  const [loading, setLoading] = useState(true);

  // 테마 매칭
  const bgImage = theme === 'sky' ? bgStableRead : bgNightSkyRead;

  useEffect(() => {
    const fetchMessageData = async () => {
      setLoading(true);
      try {
        const data = await getMessageById(id);
        setMessage(data);

        if (data) {
          const prev = await getAdjacentMessageId(theme, data.createdAt, 'prev');
          setPrevId(prev);
          const next = await getAdjacentMessageId(theme, data.createdAt, 'next');
          setNextId(next);
        }
      } catch (error) {
        console.error("데이터 로딩 실패:", error);
      }
      setLoading(false);
    };

    fetchMessageData();
  }, [id, theme]);

  const handlePrev = () => { if (prevId) navigate(`/${theme}/detail/${prevId}`); };
  const handleNext = () => { if (nextId) navigate(`/${theme}/detail/${nextId}`); };

  if (loading) return <BackgroundLayout image={bgImage} />;

  return (
    <BackgroundLayout image={bgImage}>
      
      <style>
        {`@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css");`}
      </style>

      {/* X 버튼 */}
      <button
        onClick={() => navigate(`/${theme}`)} 
        style={{
          position: 'absolute',
          top: '15%', 
          left: '80%',
          width: '36px',
          height: '37px',
          background: 'none', border: 'none', padding: 0, cursor: 'pointer', zIndex: 20
        }}
      >
        <img src={btnReadX} alt="Close" style={{ width: '100%', height: '100%' }} />
      </button>

      {/* 메시지 확인 창 */}
      <div style={{
        position: 'absolute',
        top: '23.34%',
        left: '50%',
        transform: 'translateX(-50%)',
        
        // [수정] 너비는 기존 327px 유지, 높이만 450px로 변경
        width: '327px',
        height: '450px',
        
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10
      }}>
        
        <img 
          src={imgReadBox} 
          alt="Message Box" 
          style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }} 
        />

        {prevId && (
          <button
            onClick={handlePrev}
            style={{
              position: 'absolute', top: '15px', left: '20px',
              background: 'none', border: 'none', cursor: 'pointer', zIndex: 30
            }}
          >
            <img src={btnLeft} alt="Prev" />
          </button>
        )}

        {nextId && (
          <button
            onClick={handleNext}
            style={{
              position: 'absolute', top: '15px', right: '20px',
              background: 'none', border: 'none', cursor: 'pointer', zIndex: 30
            }}
          >
            <img src={btnRight} alt="Next" />
          </button>
        )}

        <div style={{
          position: 'absolute', top: '80px', left: '45px', 
          fontFamily: "'Pretendard', sans-serif", fontSize: '16.5px',
          display: 'flex', gap: '8px', zIndex: 20
        }}>
          <span style={{ color: '#536B8F', fontWeight: 'bold' }}>From.</span>
          <span style={{ color: 'black', fontWeight: '500' }}>
            {message?.nickname || '익명'}
          </span>
        </div>

        {/* 텍스트 내용 영역 */}
        <div style={{
          position: 'absolute', top: '116px', 
          
          // [수정] 너비 복구 (327px 박스에 맞는 크기)
          width: '250px', 
          
          // [수정] 늘어난 박스 높이만큼 텍스트 영역도 확장 (240px -> 295px)
          height: '295px', 
          
          overflowY: 'auto', 
          fontFamily: "'Pretendard', sans-serif", fontSize: '15px', color: '#333',
          lineHeight: '1.6', whiteSpace: 'pre-wrap', zIndex: 20,
        }} className="hide-scrollbar">
          {message?.content}
        </div>

      </div>
    </BackgroundLayout>
  );
};

export default MessageDetail;