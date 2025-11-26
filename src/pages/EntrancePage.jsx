import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EntrancePage() {
  const navigate = useNavigate();
  const [pw, setPw] = useState('');

  const checkPw = () => {
    if(pw === '1225') navigate('/main'); // 비밀번호 1225
    else alert('비밀번호가 틀렸습니다.');
  };

  return (
    <div className="center-box">
      <p>지극히 높은 곳에서는 하나님께 영광이요...</p>
      <input 
        type="password" 
        placeholder="****" 
        onChange={(e)=>setPw(e.target.value)} 
        style={{fontSize: '20px', textAlign: 'center', marginTop: '20px'}}
      />
      <br/>
      <button onClick={checkPw}>OK</button>
    </div>
  );
}