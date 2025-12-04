import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import BackgroundLayout from '../components/BackgroundLayout';
import { saveMessage } from '../firebase/messageService';

// 이미지 에셋
import bgWrite from '../assets/bg-write.svg';
import btnWriteX from '../assets/btn-write-x.svg'; // X 버튼 (MessageForm과 동일)
import imgIconBox from '../assets/img-icon-box.svg'; // 아이콘 박스 배경
import btnBack from '../assets/btn-back.svg'; // 뒤로가기 버튼

// 아이콘들
import { SKY_ICONS, STABLE_ICONS } from '../assets';

export default function OrnamentSelect() {
  const { theme } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // 이전 페이지(MessageForm)에서 넘겨준 데이터 받기
  const { nickname, content } = location.state || { nickname: '', content: '' };

  // 테마에 맞는 아이콘 세트 선택
  const icons = theme === 'sky' ? SKY_ICONS : STABLE_ICONS;
  
  // 저장 중복 방지용 상태
  const [isSaving, setIsSaving] = useState(false);

  // [기능 1] X 버튼: 목록 페이지로 취소하고 나감
  const handleClose = () => {
    navigate(`/${theme}`);
  };

  // [기능 2] Back 버튼: 작성 페이지로 돌아가기 (내용 유지)
  // MessageForm의 Next 버튼 위치와 대칭되도록 배치하고, 데이터를 다시 전달합니다.
  const handleBack = () => {
    navigate(`/${theme}/write`, { state: { nickname, content } });
  };

  // [기능 3] 아이콘 클릭: 저장 후 목록으로 이동
  const handleIconClick = async (index) => {
    if (isSaving) return; 
    
    if (!nickname || !content) {
      alert("메시지 내용이 없습니다. 다시 작성해주세요.");
      navigate(`/${theme}/write`);
      return;
    }

    setIsSaving(true);
    try {
      await saveMessage({
        theme,
        nickname,
        content,
        iconIndex: index,
      });

      // 저장 후 해당 테마의 리스트로 이동
      navigate(`/${theme}`);
      
    } catch (error) {
      console.error("저장 실패:", error);
      alert("오류가 발생했습니다.");
      setIsSaving(false);
    }
  };

  return (
    <BackgroundLayout image={bgWrite}>
      
      <style>
        {`@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css");`}
      </style>

      {/* --- 1. X 닫기 버튼 (MessageForm과 동일 위치) --- */}
      <button
        onClick={handleClose}
        style={{
          position: 'absolute',
          top: '10%', 
          left: '50%',
          transform: 'translateX(-50%)',
          width: '36px',
          height: '37px',
          background: 'none', border: 'none', padding: 0, cursor: 'pointer', zIndex: 20
        }}
      >
        <img src={btnWriteX} alt="Close" style={{ width: '100%', height: '100%' }} />
      </button>

      {/* --- 2. 안내 텍스트 (닉네임 칸 위치) --- */}
      <div style={{
        position: 'absolute',
        top: '16%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '300px', // MessageForm과 동일 너비
        height: '60px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20
      }}>
        <span style={{
          fontFamily: "'Pretendard', sans-serif",
          fontSize: '16px',
          color: 'white',
          fontWeight: '200',
        }}>
          메세지를 담을 별을 고르세요
        </span>
      </div>

      {/* --- 3. 아이콘 선택 박스 (내용 칸 위치) --- */}
      <div style={{
        position: 'absolute',
        top: '25%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '300px', // MessageForm과 동일 너비
      }}>
        {/* 박스 배경 이미지 (높이는 자동 조절) */}
        <img 
          src={imgIconBox} 
          alt="Icon Box" 
          style={{ width: '100%', height: 'auto', display: 'block' }} 
        />

        {/* 아이콘 그리드 컨테이너 (이미지 위에 덮어씌움) */}
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          
          padding: '20px', // 박스 내부 여백
          boxSizing: 'border-box',
          
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)', // 3열 배치
          gap: '20px',
          
          overflowY: 'auto', // 아이콘 많으면 스크롤
          alignContent: 'start',
          
          // 스크롤바 숨김
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }} className="hide-scrollbar">
          
          <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>

          {icons.map((icon, index) => (
            <div
              key={index}
              onClick={() => handleIconClick(index)}
              style={{
                aspectRatio: '1/1', // 정사각형 비율
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'transform 0.1s',
              }}
            >
              <img 
                src={icon} 
                alt={`icon-${index}`} 
                style={{ width: '95%', height: '95%', objectFit: 'contain' }} 
              />
            </div>
          ))}
        </div>
      </div>

      {/* --- 4. Back 버튼 (하단 좌측) --- */}
      <button
        onClick={handleBack}
        style={{
          position: 'absolute',
          top: '85%', // MessageForm의 Next 버튼(bottom: 15%)과 높이 맞춤
          left: '11%',   // MessageForm(right: 8%)과 좌우 대칭
          width: '48px',
          height: '22px',
          background: 'none', border: 'none', padding: 0, cursor: 'pointer', zIndex: 20
        }}
      >
        <img src={btnBack} alt="Back" style={{ width: '100%', height: '100%' }} />
      </button>

    </BackgroundLayout>
  );
}