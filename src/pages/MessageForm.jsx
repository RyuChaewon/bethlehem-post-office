import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom'; // useLocation 추가
import BackgroundLayout from '../components/BackgroundLayout';

// 이미지 에셋
import bgWrite from '../assets/bg-write.svg';
import btnWriteX from '../assets/btn-write-x.svg';
import imgNicknameBox from '../assets/img-nickname-box.svg';
import imgWriteBox from '../assets/img-write-box.svg';
import btnNext from '../assets/btn-next.svg';

export default function MessageForm() {
  const navigate = useNavigate();
  const { theme } = useParams();
  const location = useLocation(); // location 객체 가져오기

  // 이전 페이지(OrnamentSelect)에서 돌아왔을 때 넘겨받은 데이터가 있다면 초기값으로 설정
  const [nickname, setNickname] = useState(location.state?.nickname || '');
  const [content, setContent] = useState(location.state?.content || '');

  const handleNext = () => {
    if (!nickname.trim() || !content.trim()) {
      alert("닉네임과 내용을 모두 입력해주세요!");
      return;
    }
    if (nickname.length > 10) {
      alert("닉네임은 10글자까지만 가능해요!");
      return;
    }
    if (content.length > 300) {
      alert("내용이 너무 깁니다. 300자 이내로 줄여주세요!");
      return;
    }

    navigate(`/select/${theme}`, { state: { nickname, content } });
  };

  return (
    <BackgroundLayout image={bgWrite}>
      
      <style>
        {`
          @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css");
          ::placeholder {
            color: rgba(255, 255, 255, 0.5) !important;
          }
        `}
      </style>

      {/* --- 1. X 닫기 버튼 --- */}
      <button
        onClick={() => navigate(-1)}
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

      {/* --- 2. 닉네임 입력 영역 --- */}
      <div style={{
        position: 'absolute',
        top: '18%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '300px', 
      }}>
        {/* 배경 이미지 */}
        <img 
          src={imgNicknameBox} 
          alt="Nickname Box" 
          style={{ width: '100%', height: 'auto', display: 'block' }} 
        />
        
        {/* 입력창 */}
        <input 
          type="text"
          placeholder="닉네임 (10자 이내)"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          maxLength={10}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%', 
            height: '100%',
            
            background: 'transparent',
            border: 'none',
            outline: 'none',
            
            textAlign: 'left',
            paddingLeft: '15px', 
            
            fontSize: '15px',
            fontFamily: "'Pretendard', sans-serif",
            color: 'white',
            zIndex: 10,
            boxSizing: 'border-box'
          }}
        />
      </div>

      {/* --- 3. 내용 입력 영역 --- */}
      <div style={{
        position: 'absolute',
        top: '26%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '300px', 
      }}>
        {/* 배경 이미지 */}
        <img 
          src={imgWriteBox} 
          alt="Content Box" 
          style={{ width: '100%', height: 'auto', display: 'block' }} 
        />

        {/* 입력창 */}
        <textarea
          placeholder="따뜻한 마음을 남겨주세요 (최대 300자)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={300}
          style={{
            position: 'absolute',
            top: 0, 
            left: 0,
            width: '100%',
            height: '100%',
            
            background: 'transparent',
            border: 'none',
            outline: 'none',
            
            padding: '17px', 
            
            fontSize: '15px',
            fontFamily: "'Pretendard', sans-serif",
            color: 'white',
            lineHeight: '1.5',
            resize: 'none',
            zIndex: 10,
            boxSizing: 'border-box'
          }}
        />
        
        {/* 글자수 카운트 */}
        <div style={{
          position: 'absolute',
          bottom: '14px',
          right: '18px',
          fontSize: '12px',
          color: 'rgba(255, 255, 255, 0.4)',
          fontFamily: "'Pretendard', sans-serif",
          zIndex: 15
        }}>
          {content.length} / 300
        </div>
      </div>

      {/* --- 4. Next 버튼 --- */}
      <button
        onClick={handleNext}
        style={{
          position: 'absolute',
          top: '85%', 
          right: '11%',
          width: '48px',
          height: '22px',
          background: 'none', border: 'none', padding: 0, cursor: 'pointer', zIndex: 20
        }}
      >
        <img src={btnNext} alt="Next" style={{ width: '100%', height: '100%' }} />
      </button>

    </BackgroundLayout>
  );
}