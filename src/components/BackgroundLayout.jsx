import React from 'react';

const BackgroundLayout = ({ children, className, image }) => {
  return (
    // 1. [Outer Wrapper] PC 화면 전체 배경 (남색)
    <div 
      style={{
        width: '100vw',
        
        /* [중요 1] 높이 제한 해제: 내용물(Inner)이 길면 자연스럽게 늘어나게 둠 */
        minHeight: '100vh',
        height: 'auto',
        
        backgroundColor: '#1C2333', 
        display: 'flex',
        justifyContent: 'center', // 가로 중앙 정렬
        alignItems: 'flex-start', // [중요 2] 세로는 무조건 위에서부터 시작 (center 금지)
        
        /* 스크롤바 숨김 처리 (선택) */
        overflowY: 'auto',
        overflowX: 'hidden'
      }}
    >
      {/* 2. [Inner Container] 실제 비율이 고정되는 앱 화면 */}
      <div
        className={className}
        style={{
          width: '100%',
          maxWidth: '430px', // PC에서 너무 커지지 않게 제한
          
          /* =========================================================
             [핵심 해결책] 
             화면 높이(vh)를 신경 쓰지 않고, 가로 너비 대비 390:844 비율을 
             강제로 고정합니다. (aspect-ratio 속성 사용)
             
             -> 아이폰 화면이 작아서(예: 700px) 이미지가 짤려야 하는 상황이 와도,
                이 박스는 844px 높이를 유지하므로 스크롤바가 생깁니다.
          ========================================================= */
          aspectRatio: '390 / 844',
          
          /* 혹시 aspect-ratio 지원 안하는 구형 브라우저 대비용 계산식 */
          minHeight: 'calc(100vw * (844 / 390))', 

          /* 배경 이미지 설정 */
          backgroundImage: image ? `url(${image})` : 'none',
          backgroundRepeat: 'no-repeat',
          
          /* [중요 3] 비율이 박스와 완벽히 일치하므로 cover 대신 100% 사용 가능 */
          backgroundSize: '100% 100%', 
          
          /* [중요 4] 무조건 위쪽 끝에 맞춤 (잘려도 아래가 잘리게) */
          backgroundPosition: 'top center',
          
          // 내부 요소 정렬
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          
          // 시각적 디테일
          boxShadow: '0 0 20px rgba(0,0,0,0.5)',
          overflow: 'hidden' // 둥근 모서리 밖으로 나가는 것 방지
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default BackgroundLayout;