import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BackgroundLayout from '../components/BackgroundLayout';
// 배경
import bgEntrance from '../assets/bg-entrance.svg';
// [NEW] 문구와 박스가 합쳐진 통이미지
import imgPwBoxGroup from '../assets/img-pw-box.svg';
// OK 버튼
import btnOk from '../assets/btn-ok.svg';

const EntrancePage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    const onlyNumber = value.replace(/[^0-9]/g, '');
    if (onlyNumber.length <= 4) {
      setPassword(onlyNumber);
    }
  };

  const handleOkClick = () => {
    if (password === "1225") {
      navigate('/main');
    } else {
      alert("비밀번호가 틀렸습니다.");
      setPassword("");
    }
  };

  return (
    <BackgroundLayout image={bgEntrance}>
      
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Passero+One&display=swap');
          .font-passero { font-family: 'Passero One', cursive; }
        `}
      </style>

      {/* [1. 문구 + 박스 통이미지] 
        위치: 582px (약 68.9%) 
        설명: 이미지 자체에 텍스트와 박스가 다 그려져 있습니다.
      */}
      <div style={{
        position: 'absolute',
        top: '68.9%', // 582 / 844
        left: '50%',
        transform: 'translateX(-50%)',
        width: '176px', // 390 - (107 * 2) = 176px (좌우 여백 107px 기준 계산)
        zIndex: 10
      }}>
        <img 
          src={imgPwBoxGroup} 
          alt="password input area" 
          style={{ width: '100%', height: 'auto' }} 
        />
      </div>

      {/* [2. 투명 입력창 (Hidden Input)]
        사용자가 박스 근처를 누르면 키보드가 올라오게 합니다.
        통이미지 위치를 덮도록 설정
      */}
      <input
        type="number"
        value={password}
        onChange={handleInputChange}
        style={{
          position: 'absolute',
          top: '68%',    
          left: '50%',
          transform: 'translateX(-50%)',
          width: '200px', 
          height: '100px',
          opacity: 0,
          zIndex: 30, // 이미지보다 위에
          fontSize: '16px'
        }}
      />

      {/* [3. 입력된 숫자 표시 (Overlay)]
        통이미지의 '박스' 부분 위에 숫자를 정확히 띄웁니다.
        박스 시작 위치였던 603px (약 71.4%) 지점에 배치합니다.
      */}
      <div style={{
        position: 'absolute',
        top: '71.4%', // 603 / 844
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        justifyContent: 'center',
        gap: '9px', // 원래 디자인(37px 박스, 9px 간격)에 맞춤
        width: '176px', // 이미지 너비와 동일
        zIndex: 20,
        pointerEvents: 'none' // 클릭 시 뒤에 있는 input이 눌리도록
      }}>
        {[0, 1, 2, 3].map((index) => (
          <div 
            key={index} 
            style={{ 
              width: '37px', // 박스 영역 크기
              height: '41px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative'
            }}
          >
            {password[index] && (
              <span
                className="font-passero"
                style={{
                  fontSize: '37px',
                  color: '#FFFADA',
                  marginTop: '-7px' // 시각적 위치 미세 조정
                }}
              >
                {password[index]}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* [4. OK 버튼]
        위치: 700px (약 82.9%)
      */}
      <button
        onClick={handleOkClick}
        style={{
          position: 'absolute',
          top: '82.9%', 
          left: '50%',
          transform: 'translateX(-50%)',
          width: '36px', 
          height: '31px',
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          zIndex: 40
        }}
      >
        <img 
          src={btnOk} 
          alt="OK" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
        />
      </button>

    </BackgroundLayout>
  );
};

export default EntrancePage;