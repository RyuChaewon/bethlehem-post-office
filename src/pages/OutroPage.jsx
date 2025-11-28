import { useNavigate } from 'react-router-dom';

export default function OutroPage() {
  const navigate = useNavigate();
  return (
    <div className="center-box">
      <h2>성탄을 축하합니다!</h2>
      <button onClick={() => window.location.href='https://www.instagram.com/yullin_yct/'}>홍보물 보러가기</button><br/>
      <button onClick={() => navigate('/')}>첫 화면으로</button>
      <button onClick={() => navigate('/main')}>Home</button>
    </div>
  );
}