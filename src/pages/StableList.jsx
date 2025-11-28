import { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMessages } from '../firebase/messageService';

export default function StableList() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);

  const [lastDoc, setLastDoc] = useState(null); 
  const [hasMore, setHasMore] = useState(true); 
  const [loading, setLoading] = useState(false); 

  const observerTarget = useRef(null);

  useEffect(() => {
    const fetchFirst = async () => {
      setLoading(true);
      const { data, lastVisible } = await getMessages('stable'); 
      
      setMessages(data);
      setLastDoc(lastVisible);
      
      if (data.length < 20) setHasMore(false);
      setLoading(false);
    };
    fetchFirst();
  }, []);

  const handleLoadMore = useCallback(async () => {
    if (!lastDoc || loading) return; 

    setLoading(true);
    const { data, lastVisible } = await getMessages('stable', lastDoc); 

    if (data.length > 0) {
      setMessages(prev => [...prev, ...data]);
      setLastDoc(lastVisible);
      
      if (data.length < 20) setHasMore(false);
    } else {
      setHasMore(false); 
    }
    setLoading(false);
  }, [lastDoc, loading]);

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
    <div className="list-layout theme-stable">
      <div className="list-header">
        <div className="back-btn-area">
          <button onClick={() => navigate('/main')} className="back-btn">
            ← Back
          </button>
        </div>
        <h2>👑 예수님께 드리는 생일 예물</h2>
        <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>
          예수님을 향한 사랑의 마음을 적어보아요
        </p>
      </div>
      
      <div className="list-content">
        <div className="list-container">
          {messages.length === 0 && <p style={{opacity: 0.5, marginTop: '50px'}}>아직 도착한 예물이 없어요</p>}

          {messages.map((msg) => (
            <div 
              key={msg.id}
              onClick={() => navigate(`/read/stable/${msg.id}`, { state: { list: messages } })} 
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
            {loading && <span style={{opacity: 0.5}}>불러오는 중...🎁</span>}
          </div>
        )}
      </div>

      <div className="list-footer">
        <button onClick={() => navigate('/write/stable')} className="write-btn">
          + 예물 드리기
        </button>
      </div>
    </div>
  );
}