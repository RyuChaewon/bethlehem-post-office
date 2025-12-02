import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BackgroundLayout from '../components/BackgroundLayout';
import { getMessageById, getAdjacentMessageId } from '../firebase/messageService';

import bgNightSkyRead from '../assets/bg-nightsky-read.svg'; 
import bgStableRead from '../assets/bg-stable-read.svg';

import btnReadX from '../assets/btn-read-x.svg';
import imgReadBox from '../assets/img-read-box.svg';
import btnLeft from '../assets/btn-left.svg';
import btnRight from '../assets/btn-right.svg';

const MessageDetail = () => {
  const { theme, id } = useParams();
  const navigate = useNavigate();
  
  const [message, setMessage] = useState(null);
  const [prevId, setPrevId] = useState(null);
  const [nextId, setNextId] = useState(null);
  const [loading, setLoading] = useState(true);

  // [수정] 테마와 이미지가 반대로 매칭되도록 순서를 바꿨습니다.
  // 혹시 파일명이 헷갈리게 저장되어 있을 수 있어서, 
  // 화면에 '마구간'이 뜬다면 여기서 bgStableRead와 bgNightSkyRead의 위치를 바꿔주시면 됩니다.
  // const bgImage = theme === 'sky' ? bgNightSkyRead : bgStableRead;
  
  // 만약 위 코드로도 반대로 나온다면, 아래 주석 코드로 바꿔보세요!
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

  const handlePrev = () => {
    if (prevId) navigate(`/${theme}/detail/${prevId}`);
  };

  const handleNext = () => {
    if (nextId) navigate(`/${theme}/detail/${nextId}`);
  };

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
          top: '17.41%', 
          left: '82.82%',
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
        width: '327px',
        height: '397px',
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
              position: 'absolute', top: '15px', left: '5px',
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
              position: 'absolute', top: '15px', right: '5px',
              background: 'none', border: 'none', cursor: 'pointer', zIndex: 30
            }}
          >
            <img src={btnRight} alt="Next" />
          </button>
        )}

        <div style={{
          position: 'absolute', top: '80px', left: '35px', 
          fontFamily: "'Pretendard', sans-serif", fontSize: '18px',
          display: 'flex', gap: '8px', zIndex: 20
        }}>
          <span style={{ color: '#536B8F', fontWeight: 'bold' }}>From.</span>
          <span style={{ color: 'black', fontWeight: '500' }}>
            {message?.nickname || '익명'}
          </span>
        </div>

        <div style={{
          position: 'absolute', top: '130px', 
          width: '256px', height: '240px', 
          overflowY: 'auto', 
          fontFamily: "'Pretendard', sans-serif", fontSize: '17px', color: '#333',
          lineHeight: '1.6', whiteSpace: 'pre-wrap', zIndex: 20,
        }} className="hide-scrollbar">
          {message?.content}
        </div>

      </div>
    </BackgroundLayout>
  );
};

export default MessageDetail;