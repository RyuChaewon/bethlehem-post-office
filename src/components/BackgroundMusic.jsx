import React, { useState, useEffect, useRef } from 'react';

// [수정] assets 폴더에 넣어두신 wav 파일들을 불러옵니다.
import music1 from '../assets/music1.wav';
import music2 from '../assets/music2.wav';
import music3 from '../assets/music3.wav';
import music4 from '../assets/music4.wav';

const BackgroundMusic = () => {
  // 재생할 곡 리스트 (1 -> 2 -> 3 -> 4)
  const playlist = [music1, music2, music3, music4];
  
  // 현재 재생 중인 곡의 인덱스 (0 ~ 3)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  
  const audioRef = useRef(null);

  useEffect(() => {
    // 트랙이 바뀌면(혹은 처음 로드되면) 재생 시도
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        // 브라우저 정책상 자동 재생이 막히면 로그만 남기고,
        // 아래의 '클릭 이벤트 리스너'가 작동할 때까지 대기합니다.
        console.log("자동 재생 대기 중 (사용자 클릭 필요)");
      });
    }
  }, [currentTrackIndex]);

  useEffect(() => {
    // [핵심] 사용자가 화면을 터치하거나 클릭하면 그때부터 재생 시작
    const handleUserInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().catch(e => console.log(e));
      }
    };

    window.addEventListener('click', handleUserInteraction);
    window.addEventListener('touchstart', handleUserInteraction);

    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

  // 한 곡이 끝나면 다음 곡으로 넘어가는 함수
  const handleTrackEnded = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  return (
    <audio
      ref={audioRef}
      src={playlist[currentTrackIndex]}
      onEnded={handleTrackEnded} // 곡이 끝나면 다음 곡 자동 재생
      loop={false} 
      volume={0.5} // 소리가 너무 크면 0.1 ~ 0.5 사이로 줄여보세요
      style={{ display: 'none' }} // 화면엔 보이지 않음
    />
  );
};

export default BackgroundMusic;