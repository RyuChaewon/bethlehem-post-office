import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 경로(pathname)가 바뀔 때마다 스크롤을 맨 위(0, 0)로 강제 이동
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // 화면에는 아무것도 그리지 않음
}