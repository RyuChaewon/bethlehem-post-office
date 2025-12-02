import React from 'react';
import MessageListLayout from '../components/MessageListLayout';

// 이미지 불러오기 (경로: src/assets/...)
import bgNightSkyRead from '../assets/bg-nightsky.svg';
import btnWrite from '../assets/btn-write.svg'; // 글쓰기 버튼
import { SKY_ICONS } from '../assets'; // index.js에 묶어둔 하늘 아이콘들

const NightSkyList = () => {
  return (
    <MessageListLayout
      theme="sky"               // DB에 저장할 테마명 (firebase query용)
      bgImage={bgNightSkyRead}  // 밤하늘 읽기 배경
      writeBtnImage={btnWrite}  // 하단 쓰기 버튼
      writePath="/sky/write"    // 버튼 클릭 시 이동할 경로
      icons={SKY_ICONS}         // 하늘 아이콘 배열
    />
  );
};

export default NightSkyList;