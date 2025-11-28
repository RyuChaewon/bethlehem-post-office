import { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMessages } from '../firebase/messageService';

export default function NightSkyList() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // 무한 스크롤 감시자
  const observerTarget = useRef(null);

  // 1. 처음 20개 불러오기
  useEffect(() => {
    const fetchFirst = async () => {
      setLoading(true);
      const { data, lastVisible } = await getMessages('sky');
      
      setMessages(data);
      setLastDoc(lastVisible);
      
      if (data.length < 20) setHasMore(false);
      setLoading(false);
    };
    fetchFirst();
  }, []);

  // 2. 추가 데이터 불러오기 (useCallback 적용)
  const handleLoadMore = useCallback(async () => {
    if (!lastDoc || loading) return;

    setLoading(true);
    const { data, lastVisible } = await getMessages('sky', lastDoc);

    if (data.length > 0) {
      setMessages(prev => [...prev, ...data]);
      setLastDoc(lastVisible);
      if (data.length < 20) setHasMore(false);
    } else {
      setHasMore(false);
    }
    setLoading(false);
  }, [lastDoc, loading]); 

  // 3. 스크롤 감지 로직 (의존성 배열 및 cleanup 수정)
  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          handleLoadMore();
        }
      },
      { threshold: 0.5 }
    );

    // ref.current를 변수에 복사하여 cleanup 함수에서 사용
    const currentTarget = observerTarget.current;

    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loading, handleLoadMore]); 

  return (
    <div className="list-layout theme-sky">
      <div className="list-header">
        <div className="back-btn-area">
          <button onClick={() => navigate('/main')} className="back-btn">← Back</button>
        </div>
        <h2>☁️ 하늘에 새기는 밤편지</h2>
        <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>
          공동체를 향한 마음들이 모여있어요
        </p>
      </div>

      <div className="list-content">
        <div className="list-container">
          {messages.length === 0 && <p style={{opacity: 0.5, marginTop: '50px'}}>아직 도착한 편지가 없어요</p>}
          
          {messages.map((msg) => (
            <div 
              key={msg.id}
              onClick={() => navigate(`/read/sky/${msg.id}`, { state: { list: messages } })} 
              className="message-card" 
            >
              <div className="message-icon">{msg.ornament}</div>
              <div className="message-name">{msg.nickname}</div>
            </div>
          ))}
        </div>

        {hasMore && (
          <div 
            ref={observerTarget} 
            style={{ height: '50px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {loading && <span style={{opacity: 0.5}}>불러오는 중...💫</span>}
          </div>
        )}
      </div>

      <div className="list-footer">
        <button onClick={() => navigate('/write/sky')} className="write-btn">
          + 밤편지 쓰기
        </button>
      </div>
    </div>
  );
}