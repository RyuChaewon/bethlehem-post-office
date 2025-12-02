import { useEffect, useState } from 'react';

// 이미지 URL 배열을 받아 미리 브라우저 캐시에 로딩하는 커스텀 훅
export default function useImagePreloader(imageUrls) {
  const [imagesPreloaded, setImagesPreloaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const preloadImages = async () => {
      // 모든 이미지 로딩을 Promise로 처리
      const promises = imageUrls.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          // 성공하든 실패하든 다음으로 넘어가도록 처리
          img.onload = resolve;
          img.onerror = resolve; 
        });
      });

      // 모든 이미지가 처리될 때까지 대기
      await Promise.all(promises);

      if (isMounted) {
        setImagesPreloaded(true);
      }
    };

    preloadImages();

    return () => {
      isMounted = false;
    };
  }, [imageUrls]);

  return imagesPreloaded;
}