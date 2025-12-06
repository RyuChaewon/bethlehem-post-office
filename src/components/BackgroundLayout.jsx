import React, { useState, useEffect } from 'react';

const BackgroundLayout = ({ children, className, image }) => {
  // 1. 로딩 상태 관리
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 이미지가 없으면 바로 로딩 끝 (setTimeout으로 경고 방지)
    if (!image) {
      setTimeout(() => setIsLoaded(true), 0);
      return;
    }

    // 이미지 미리 다운로드 (Preload)
    const img = new Image();
    img.src = image;
    
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setIsLoaded(true); // 에러 나도 화면은 보여줌
  }, [image]);

  return (
    // 1. [Outer Wrapper] 기존 레이아웃 설정 완벽 유지
    <div 
      style={{
        width: '100vw',
        
        /* 기존 설정 유지: 내용물이 길면 늘어나도록 */
        minHeight: '100vh',
        height: 'auto',
        
        backgroundColor: '#1C2333', 
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'flex-start', // 위에서부터 시작
        
        overflowY: 'auto',
        overflowX: 'hidden',
        position: 'relative' // 로딩 텍스트 위치 잡기 위해 추가
      }}
    >
      {/* 2. [로딩 텍스트] 이미지가 뜨기 전까지 중앙에 표시 */}
      {!isLoaded && (
        <div style={{
          position: 'absolute',
          top: '50vh', // 화면 중앙쯤
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'rgba(255,255,255,0.5)',
          fontFamily: 'sans-serif',
          fontSize: '14px',
          zIndex: 0
        }}>
          Loading...
        </div>
      )}

      {/* 2. [Inner Container] 실제 핸드폰 화면 비율 고정 */}
      <div
        className={className}
        style={{
          width: '100%',
          
          /* [핵심 1] 너비를 390px 근처로 제한 (너무 커지지 않게) */
          maxWidth: '390px', 
          
          /* [핵심 2] 비율을 390:720으로 '강제 고정' */
          /* 화면이 커지든 작아지든 무조건 이 비율을 유지합니다 */
          aspectRatio: '390 / 720', 

          /* [핵심 3] 배경 이미지를 박스 크기에 100% 딱 맞춤 */
          backgroundImage: image ? `url(${image})` : 'none',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%', 
          
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          
          boxShadow: '0 0 20px rgba(0,0,0,0.5)',
          overflow: 'hidden', /* 박스 밖으로 나가는 건 자름 */

          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out'
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default BackgroundLayout;