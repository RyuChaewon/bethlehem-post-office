import React from 'react';
import MessageListLayout from '../components/MessageListLayout';

// 이미지 불러오기
import bgStableRead from '../assets/bg-stable.svg';
import btnWrite from '../assets/btn-write.svg';
import { STABLE_ICONS } from '../assets'; // index.js에 묶어둔 마구간 아이콘들

const StableList = () => {
  return (
    <MessageListLayout
      theme="stable"            // DB에 저장할 테마명
      bgImage={bgStableRead}    // 마구간 읽기 배경
      writeBtnImage={btnWrite}  // 하단 쓰기 버튼
      writePath="/stable/write" // 버튼 클릭 시 이동할 경로
      icons={STABLE_ICONS}      // 마구간 아이콘 배열
    />
  );
};

export default StableList;