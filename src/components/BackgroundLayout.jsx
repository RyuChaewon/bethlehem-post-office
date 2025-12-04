import React, { useState, useEffect } from 'react';

const BackgroundLayout = ({ children, className, image }) => {
  // 초기값을 false로 두되, 이미지가 없을 경우를 대비해 useEffect에서 처리합니다.
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 1. 이미지가 없으면 바로 로딩 끝 처리
    if (!image) {
      // [수정] setTimeout으로 감싸서 "Synchronous setState" 경고 해결
      setTimeout(() => {
        setIsLoaded(true);
      }, 0);
      return;
    }

    // 2. 이미지 미리 다운로드(Preload)
    const img = new Image();
    img.src = image;
    
    // 로드 완료 시
    img.onload = () => {
      setIsLoaded(true);
    };
    
    // 혹시라도 로드 실패 시 무한 로딩 방지 (화면은 보여줌)
    img.onerror = () => {
        setIsLoaded(true);
    };

  }, [image]);

  return (
    <div 
      style={{
        width: '100vw',
        height: '100vh', 
        backgroundColor: '#1C2333', 
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center',
        overflow: 'hidden',
        position: 'fixed', 
        top: 0,
        left: 0
      }}
    >
      {/* [로딩 화면] */}
      {!isLoaded && (
        <div style={{
          position: 'absolute',
          color: 'rgba(255,255,255,0.5)',
          fontFamily: 'sans-serif',
          fontSize: '14px',
          zIndex: 0
        }}>
          Loading...
        </div>
      )}

      {/* 메인 컨테이너 */}
      <div
        className={className}
        style={{
          width: '100%',
          maxWidth: '390px', 
          
          /* 390 x 720 비율 고정 */
          aspectRatio: '390 / 720',
          maxHeight: '720px',
          height: '100%', 

          /* 배경 이미지 설정 */
          backgroundImage: image ? `url(${image})` : 'none',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%', 
          backgroundPosition: 'center center',
          
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          
          boxShadow: '0 0 20px rgba(0,0,0,0.5)',
          overflow: 'hidden',

          /* 로딩 완료 시 부드럽게 등장 */
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