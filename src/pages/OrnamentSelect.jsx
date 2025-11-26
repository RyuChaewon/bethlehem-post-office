import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { saveMessage } from '../firebase/messageService';

export default function OrnamentSelect() {
  const navigate = useNavigate();
  const { theme } = useParams(); // 'sky' 또는 'stable'
  const { state } = useLocation(); // 작성 페이지에서 넘어온 데이터

  // 1. 테마별 오너먼트 리스트 정의
  const skyOrnaments = [
    { icon: '⭐', name: '샛별' },
    { icon: '🌙', name: '달님' },
    { icon: '🌌', name: '은하수' },
    { icon: '🌠', name: '별똥별' },
    { icon: '☁️', name: '구름' },
    { icon: '❄️', name: '눈송이' },
  ];

  const stableOrnaments = [
    { icon: '🎁', name: '선물상자' },
    { icon: '👑', name: '황금(왕관)' },
    { icon: '🏺', name: '몰약(향유)' },
    { icon: '🌿', name: '유향(풀)' },
    { icon: '🕯️', name: '촛불' },
    { icon: '🧶', name: '털실' },
  ];

  // 2. 현재 테마에 맞는 리스트 선택
  const currentList = theme === 'sky' ? skyOrnaments : stableOrnaments;

  const handleSelect = async (selectedItem) => {
    // 예외 처리: 만약 작성 내용 없이 바로 들어왔다면 튕겨내기
    if (!state) {
      alert("잘못된 접근입니다. 편지를 먼저 써주세요!");
      navigate(`/write/${theme}`);
      return;
    }

    try {
      const messageData = {
        nickname: state.nickname,
        content: state.content,
        ornament: selectedItem.icon, // 아이콘 저장
        ornamentName: selectedItem.name, // (선택사항) 이름도 저장해두면 나중에 좋음
        theme: theme,
      };

      // 저장 중임을 알림
      const confirmSave = confirm(`'${selectedItem.name}' 오너먼트로 보내시겠습니까?`);
      if (!confirmSave) return;

      await saveMessage(messageData);
      
      alert("배달이 완료되었습니다! 📮");
      navigate(theme === 'sky' ? '/sky' : '/stable'); // 해당 리스트로 이동

    } catch (error) {
      console.error(error);
      alert("전송에 실패했습니다.");
    }
  };

  return (
    <div className="center-box">
      <h3 style={{ marginBottom: '10px' }}>
        {theme === 'sky' ? '☁️ 밤하늘 꾸미기' : '👑 예물 고르기'}
      </h3>
      <p style={{ marginBottom: '30px', opacity: 0.8 }}>
        {theme === 'sky' 
          ? '공동체의 하늘에 띄울 별을 골라주세요' 
          : '아기 예수님께 드릴 예물을 골라주세요'}
      </p>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', // 한 줄에 3개씩
        gap: '20px', 
        justifyContent: 'center' 
      }}>
        {currentList.map((item) => (
          <button 
            key={item.name} 
            onClick={() => handleSelect(item)}
            style={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '15px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)', // 반투명 배경
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '15px',
              cursor: 'pointer'
            }}
          >
            <span style={{ fontSize: '30px', marginBottom: '5px' }}>{item.icon}</span>
            <span style={{ fontSize: '12px' }}>{item.name}</span>
          </button>
        ))}
      </div>

      <button 
        onClick={() => navigate(-1)} 
        style={{ marginTop: '30px', background: 'transparent', border: '1px solid gray', color: 'gray' }}
      >
        뒤로가기
      </button>
    </div>
  );
}