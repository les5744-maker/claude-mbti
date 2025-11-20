# MBTI 성격 유형 테스트

12개의 질문으로 알아보는 나의 MBTI 성격 유형 테스트 웹사이트입니다.

## 🎯 주요 기능

- **12개의 질문**: 각 MBTI 차원(E/I, S/N, T/F, J/P)당 3문항
- **16가지 유형**: 모든 MBTI 유형에 대한 상세한 설명
- **실시간 진행률**: 프로그레스 바로 테스트 진행 상황 확인
- **결과 공유**: 이미지 저장 및 Web Share API 지원
- **통계 차트**: 유형별 분포를 시각화한 차트
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 최적화

## 🚀 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 http://localhost:5173 접속

### 프로덕션 빌드

```bash
npm run build
```

### 빌드 결과 미리보기

```bash
npm run preview
```

## 📁 프로젝트 구조

```
src/
├── components/         # UI 컴포넌트
│   ├── common/        # 공통 컴포넌트 (Button, Card, ProgressBar)
│   └── features/      # 기능별 컴포넌트 (StatsChart)
├── pages/             # 페이지 컴포넌트
│   ├── LandingPage.tsx
│   ├── TestPage.tsx
│   └── ResultPage.tsx
├── hooks/             # 커스텀 Hooks
│   ├── useLocalStorage.ts
│   ├── useTest.ts
│   └── useStats.ts
├── utils/             # 유틸리티 함수
│   ├── mbtiCalculator.ts
│   ├── storage.ts
│   └── share.ts
├── data/              # 정적 데이터
│   ├── questions.ts   # 12개 질문
│   └── results.ts     # 16가지 유형 결과
├── types/             # TypeScript 타입
└── styles/            # 전역 스타일
```

## 🛠️ 기술 스택

- **React 18**: 함수형 컴포넌트 + Hooks
- **TypeScript**: 타입 안전성
- **Vite**: 빠른 빌드 도구
- **Tailwind CSS**: 유틸리티 기반 스타일링
- **React Router**: 클라이언트 사이드 라우팅
- **Framer Motion**: 부드러운 애니메이션
- **Chart.js**: 통계 차트
- **html2canvas**: 이미지 저장

## 📊 데이터 저장

- 로컬 스토리지를 사용하여 통계 데이터 저장
- 개인정보 수집 없음 (익명 통계만 저장)
- 브라우저별 독립적인 데이터 관리

## 🎨 디자인 특징

- 보라색-파란색 그라디언트 메인 컬러
- 모던하고 미니멀한 UI/UX
- 부드러운 애니메이션과 전환 효과
- 접근성(a11y) 고려

## 📝 개발 가이드

자세한 개발 가이드라인은 [CLAUDE.md](./CLAUDE.md) 파일을 참조하세요.

## 📄 PRD

프로젝트 요구사항 문서는 [MBTI_PRD.md](./MBTI_PRD.md) 파일을 참조하세요.

## 🚀 배포

### Vercel (추천)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# dist 폴더를 Netlify에 업로드
```

### GitHub Pages

```bash
npm run build
# dist 폴더를 gh-pages 브랜치에 배포
```

## 📱 브라우저 지원

- Chrome (최신 버전)
- Firefox (최신 버전)
- Safari (최신 버전)
- Edge (최신 버전)

## 📜 라이선스

MIT

## 👨‍💻 개발자

Claude Code로 생성된 프로젝트입니다.
