import { useNavigate } from 'react-router-dom';

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <div className="center-box">
      {/* 1. 상단 제목 영역 */}
      <h2 style={{ marginTop: '20px' }}>메인 로비</h2>
      <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '20px' }}>
        마구간 또는 별을 선택해주세요
      </p>

      {/* 2. 메인 버튼 영역 (여기가 핵심!) 
          - flex-grow: 1 -> 남는 공간을 다 차지해서 위아래로 길어짐
          - space-between -> 버튼 두 개를 양 끝(위/아래)으로 밀어버림
      */}
      <div style={{
        width: '100%',
        flexGrow: 1,           /* 화면 높이만큼 쭉 늘어남 */
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between', /* 위아래 끝으로 배치 */
        padding: '40px 0'      /* 버튼이 너무 끝에 붙지 않게 여백 */
      }}>
        
        {/* ⭐️ 밤하늘 버튼 (우측 상단) */}
        <button 
          onClick={() => navigate('/sky')}
          style={{
            alignSelf: 'flex-end', /* 오른쪽 벽으로 붙임 */
            backgroundColor: '#2c3e50', /* (임시) 밤하늘색 */
            color: 'white',
            width: '140px',
            height: '140px',
            borderRadius: '50%',   /* 동그랗게 */
            fontSize: '1.2rem',
            boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
          }}
        >
          ⭐️<br/>밤하늘
        </button>

        {/* 🐴 마구간 버튼 (좌측 하단) */}
        <button 
          onClick={() => navigate('/stable')}
          style={{
            alignSelf: 'flex-start', /* 왼쪽 벽으로 붙임 */
            backgroundColor: '#8d6e63', /* (임시) 마구간색 */
            color: 'white',
            width: '140px',
            height: '140px',
            borderRadius: '50%',    /* 동그랗게 */
            fontSize: '1.2rem',
            boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
          }}
        >
          🐴<br/>마구간
        </button>

      </div>

      {/* 3. 하단 나가기 버튼 */}
      <button 
        onClick={() => navigate('/outro')} 
        style={{ 
          marginBottom: '20px',
          background: 'transparent',
          border: '1px solid rgba(255,255,255,0.5)',
          color: 'white'
        }}
      >
        나가기
      </button>
    </div>
  );
}