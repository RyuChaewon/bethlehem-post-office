# Bethlehem Post Office

크리스마스 분위기의 온라인 우체통입니다. 방문자는 밤하늘 또는 마구간 테마를 선택해 메시지를 남기고, 오너먼트를 골라 저장된 메시지를 둘러볼 수 있습니다.

## 주요 기능

- 밤하늘과 마구간 두 가지 테마별 메시지 목록 제공
- 닉네임과 메시지 작성, 오너먼트 선택 후 Firebase Firestore에 저장
- 메시지 상세 보기와 이전/다음 메시지 이동
- 방문자 수 집계
- 페이지 전환 중 배경 이미지 프리로드
- 네 곡의 배경 음악 순차 재생

## 기술 스택

- React 19
- Vite 7
- React Router DOM
- Firebase Firestore / Analytics
- ESLint

## 시작하기

```bash
npm install
npm run dev
```

프로덕션 빌드와 로컬 미리보기는 아래 명령어를 사용합니다.

```bash
npm run build
npm run preview
```

## 환경 변수

Firebase 설정은 Vite 환경 변수로 주입됩니다. 로컬 실행 시 `.env` 파일에 다음 값을 준비합니다.

```env
VITE_API_KEY=
VITE_AUTH_DOMAIN=
VITE_PROJECT_ID=
VITE_STORAGE_BUCKET=
VITE_MESSAGING_SENDER_ID=
VITE_APP_ID=
VITE_MEASUREMENT_ID=
```

## 프로젝트 구조

```text
src/
  assets/        배경, 버튼, 오너먼트, 음악 파일
  components/    공통 레이아웃과 배경 음악 컴포넌트
  firebase/      Firebase 설정과 메시지 서비스
  hooks/         이미지 프리로드 훅
  pages/         라우트별 화면
  styles/        전역 스타일
```

## 배포

저장소 홈 URL은 Vercel 배포 주소(`https://bethlehem-post-office.vercel.app`)를 사용합니다.
