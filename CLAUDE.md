# MBTI 성격 유형 테스트 - 개발 가이드라인

본 문서는 MBTI 성격 유형 테스트 웹사이트 개발 시 참조해야 할 기술 스택, 코드 스타일, 개발 원칙을 정리한 가이드입니다.

---

## 1. 기술 스택

### 1.1 코어 기술
- **프레임워크**: React 18+ (함수형 컴포넌트, Hooks 기반)
- **언어**: TypeScript (strict 모드)
- **빌드 도구**: Vite
- **스타일링**: Tailwind CSS + CSS Modules (복잡한 애니메이션)
- **상태 관리**: React Context API + useState/useReducer (Redux 불필요)

### 1.2 주요 라이브러리
- **라우팅**: React Router v6
- **차트**: Chart.js 또는 Recharts (통계 시각화)
- **애니메이션**: Framer Motion (페이지 전환, 마이크로 인터랙션)
- **이미지 생성**: html2canvas (결과 이미지 저장)
- **아이콘**: React Icons 또는 Lucide React
- **타입 체킹**: TypeScript + ESLint + Prettier

### 1.3 개발 도구
- **패키지 매니저**: npm 또는 pnpm
- **코드 포맷팅**: Prettier
- **린팅**: ESLint (Airbnb 또는 Standard 스타일 가이드)
- **타입 체크**: TypeScript Compiler + strict 옵션
- **Git 훅**: Husky + lint-staged (커밋 전 자동 포맷팅)

### 1.4 배포
- **호스팅**: Vercel, Netlify, 또는 GitHub Pages
- **빌드**: 정적 사이트 생성 (SSG)
- **성능**: Code splitting, lazy loading 적용

---

## 2. 프로젝트 구조

```
src/
├── assets/              # 정적 리소스 (이미지, 폰트 등)
├── components/          # 재사용 가능한 UI 컴포넌트
│   ├── common/         # 공통 컴포넌트 (Button, Card, ProgressBar 등)
│   ├── layout/         # 레이아웃 컴포넌트 (Header, Footer 등)
│   └── features/       # 기능별 컴포넌트 (Question, Result, Stats 등)
├── pages/              # 페이지 컴포넌트
│   ├── LandingPage.tsx
│   ├── TestPage.tsx
│   └── ResultPage.tsx
├── hooks/              # 커스텀 Hooks
│   ├── useLocalStorage.ts
│   ├── useTest.ts
│   └── useStats.ts
├── utils/              # 유틸리티 함수
│   ├── mbtiCalculator.ts
│   ├── storage.ts
│   └── share.ts
├── data/               # 정적 데이터
│   ├── questions.ts    # 12개 질문 데이터
│   └── results.ts      # 16가지 유형별 결과 데이터
├── types/              # TypeScript 타입 정의
│   └── index.ts
├── contexts/           # React Context
│   └── TestContext.tsx
├── styles/             # 전역 스타일
│   └── globals.css
├── App.tsx
└── main.tsx
```

---

## 3. 코드 스타일 가이드

### 3.1 TypeScript 규칙

#### 타입 정의
```typescript
// ✅ 좋은 예: 명시적 타입 정의
interface Question {
  id: number;
  dimension: 'EI' | 'SN' | 'TF' | 'JP';
  text: string;
  options: {
    A: { text: string; value: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P' };
    B: { text: string; value: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P' };
  };
}

// ❌ 나쁜 예: any 사용
const questions: any[] = [...];

// ✅ 좋은 예: Enum 대신 Union Type 사용
type MBTIType =
  | 'INTJ' | 'INTP' | 'ENTJ' | 'ENTP'
  | 'INFJ' | 'INFP' | 'ENFJ' | 'ENFP'
  | 'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFJ'
  | 'ISTP' | 'ISFP' | 'ESTP' | 'ESFP';
```

#### 함수 타이핑
```typescript
// ✅ 좋은 예: 명시적 반환 타입
function calculateMBTI(answers: Answer[]): MBTIType {
  // ...
}

// ✅ 좋은 예: 제네릭 활용
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // ...
}
```

### 3.2 React 컴포넌트 스타일

#### 컴포넌트 구조
```typescript
// ✅ 좋은 예: 함수형 컴포넌트 + Props 인터페이스
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant}`}
    >
      {children}
    </button>
  );
};

// ❌ 나쁜 예: 클래스 컴포넌트 사용 금지
class Button extends React.Component { ... }
```

#### Hooks 사용 원칙
```typescript
// ✅ 좋은 예: 커스텀 Hook으로 로직 분리
function useTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const handleAnswer = useCallback((answer: Answer) => {
    setAnswers(prev => [...prev, answer]);
    setCurrentQuestion(prev => prev + 1);
  }, []);

  return { currentQuestion, answers, handleAnswer };
}

// 컴포넌트에서 사용
function TestPage() {
  const { currentQuestion, answers, handleAnswer } = useTest();
  // ...
}
```

### 3.3 네이밍 컨벤션

```typescript
// 컴포넌트: PascalCase
export const QuestionCard: React.FC = () => { ... };

// 함수/변수: camelCase
const calculateScore = (answers: Answer[]) => { ... };
const totalQuestions = 12;

// 상수: UPPER_SNAKE_CASE
const MAX_QUESTIONS = 12;
const STORAGE_KEY = 'mbti-test-stats';

// 타입/인터페이스: PascalCase
interface UserAnswer { ... }
type MBTIType = ...;

// 파일명:
// - 컴포넌트: PascalCase (Button.tsx, QuestionCard.tsx)
// - 유틸리티: camelCase (mbtiCalculator.ts, storage.ts)
```

### 3.4 Import 순서

```typescript
// 1. React 관련
import React, { useState, useEffect } from 'react';

// 2. 외부 라이브러리
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// 3. 내부 컴포넌트
import { Button } from '@/components/common/Button';
import { ProgressBar } from '@/components/common/ProgressBar';

// 4. Hooks
import { useTest } from '@/hooks/useTest';

// 5. 유틸리티/타입
import { calculateMBTI } from '@/utils/mbtiCalculator';
import type { Question, Answer } from '@/types';

// 6. 스타일
import styles from './TestPage.module.css';
```

---

## 4. 개발 원칙

### 4.1 성능 최적화

#### Code Splitting
```typescript
// ✅ 좋은 예: 페이지별 Lazy Loading
import { lazy, Suspense } from 'react';

const ResultPage = lazy(() => import('@/pages/ResultPage'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ResultPage />
    </Suspense>
  );
}
```

#### 메모이제이션
```typescript
// ✅ 좋은 예: 비용이 큰 계산 메모이제이션
const result = useMemo(() => calculateMBTI(answers), [answers]);

// ✅ 좋은 예: 콜백 메모이제이션
const handleClick = useCallback(() => {
  // ...
}, [dependencies]);

// ❌ 나쁜 예: 불필요한 메모이제이션
const simpleValue = useMemo(() => count + 1, [count]); // 단순 계산은 불필요
```

#### 이미지 최적화
```typescript
// ✅ 좋은 예: 이미지 lazy loading
<img src={src} alt={alt} loading="lazy" />

// ✅ 좋은 예: WebP + 폴백
<picture>
  <source srcSet="image.webp" type="image/webp" />
  <img src="image.png" alt="..." />
</picture>
```

### 4.2 상태 관리 원칙

```typescript
// ✅ 좋은 예: Context로 전역 상태 관리
interface TestContextType {
  currentQuestion: number;
  answers: Answer[];
  addAnswer: (answer: Answer) => void;
  reset: () => void;
}

export const TestContext = createContext<TestContextType | null>(null);

export const TestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const addAnswer = useCallback((answer: Answer) => {
    setAnswers(prev => [...prev, answer]);
    setCurrentQuestion(prev => prev + 1);
  }, []);

  const reset = useCallback(() => {
    setCurrentQuestion(0);
    setAnswers([]);
  }, []);

  return (
    <TestContext.Provider value={{ currentQuestion, answers, addAnswer, reset }}>
      {children}
    </TestContext.Provider>
  );
};

// ❌ 나쁜 예: Props Drilling (3단계 이상)
<Parent>
  <Child1 data={data}>
    <Child2 data={data}>
      <Child3 data={data} />
    </Child2>
  </Child1>
</Parent>
```

### 4.3 로컬 스토리지 사용

```typescript
// ✅ 좋은 예: 타입 안전한 로컬 스토리지 Hook
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  };

  return [storedValue, setValue];
}

// 사용
const [stats, setStats] = useLocalStorage<Statistics>('mbti-stats', initialStats);
```

### 4.4 에러 처리

```typescript
// ✅ 좋은 예: Error Boundary 구현
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}

// ✅ 좋은 예: Try-Catch로 안전한 처리
async function shareResult(resultData: ResultData) {
  try {
    if (navigator.share) {
      await navigator.share({
        title: `나의 MBTI는 ${resultData.type}!`,
        text: `나는 ${resultData.nickname}입니다!`,
        url: window.location.href,
      });
    } else {
      // 폴백: 클립보드 복사
      await navigator.clipboard.writeText(window.location.href);
      showToast('링크가 복사되었습니다!');
    }
  } catch (error) {
    console.error('공유 실패:', error);
    showToast('공유에 실패했습니다. 다시 시도해주세요.');
  }
}
```

### 4.5 접근성 (a11y)

```typescript
// ✅ 좋은 예: 시맨틱 HTML + ARIA
<button
  onClick={handleAnswer}
  aria-label={`답변 선택: ${option.text}`}
  aria-pressed={isSelected}
>
  {option.text}
</button>

// ✅ 좋은 예: 키보드 네비게이션 지원
function QuestionCard() {
  const handleKeyDown = (e: React.KeyboardEvent, option: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleAnswer(option);
    }
  };

  return (
    <div
      role="radiogroup"
      aria-labelledby="question-text"
    >
      {/* ... */}
    </div>
  );
}

// ✅ 좋은 예: 충분한 색상 대비 (WCAG AA)
const colors = {
  text: '#1a1a1a',      // 배경 대비 4.5:1 이상
  background: '#ffffff',
  primary: '#6366f1',
};
```

### 4.6 반응형 디자인

```typescript
// ✅ 좋은 예: Tailwind CSS 반응형 클래스
<div className="
  px-4 py-6              // 모바일 기본
  md:px-8 md:py-10       // 태블릿 (768px~)
  lg:px-12 lg:py-16      // 데스크톱 (1024px~)
  max-w-4xl mx-auto      // 최대 너비 제한
">
  {/* 컨텐츠 */}
</div>

// ✅ 좋은 예: 모바일 우선 디자인
// Tailwind 기본값은 모바일, md/lg로 큰 화면 대응
```

### 4.7 애니메이션 원칙

```typescript
// ✅ 좋은 예: Framer Motion으로 부드러운 전환
import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3, ease: 'easeOut' }
};

function QuestionCard({ question }: Props) {
  return (
    <motion.div {...fadeIn}>
      <h2>{question.text}</h2>
    </motion.div>
  );
}

// ❌ 나쁜 예: 과도한 애니메이션 (성능 저하)
// 모든 요소에 복잡한 애니메이션 적용은 지양
```

---

## 5. 데이터 구조 설계

### 5.1 질문 데이터

```typescript
// data/questions.ts
export const questions: Question[] = [
  {
    id: 1,
    dimension: 'EI',
    text: '주말에 친구들이 갑자기 놀자고 연락이 왔다. 나는?',
    options: {
      A: {
        text: '좋아! 바로 약속 잡고 나간다',
        value: 'E'
      },
      B: {
        text: '오늘은 집에서 쉬고 싶은데... 다음에 만나자고 한다',
        value: 'I'
      }
    }
  },
  // ... 11개 더
];
```

### 5.2 결과 데이터

```typescript
// data/results.ts
export const results: Record<MBTIType, ResultData> = {
  INTJ: {
    type: 'INTJ',
    nickname: '전략가',
    description: '논리적이고 전략적인 사고를 하는 완벽주의자...',
    traits: [
      '뛰어난 분석력과 통찰력',
      '독립적이고 자기주도적',
      // ...
    ],
    strengths: [
      '복잡한 문제를 체계적으로 해결',
      '장기적인 비전 수립에 탁월',
      // ...
    ],
    weaknesses: [
      '감정 표현에 서툴 수 있음',
      '완벽주의로 인한 스트레스',
      // ...
    ],
    careers: [
      '소프트웨어 엔지니어', '데이터 과학자', '연구원',
      '전략 컨설턴트', '투자 분석가', '건축가',
      // ...
    ],
    celebrities: [
      '일론 머스크', '마크 저커버그', '크리스토퍼 놀란',
      // ...
    ]
  },
  // ... 나머지 15개 유형
};
```

### 5.3 통계 데이터

```typescript
// 로컬 스토리지에 저장될 통계
interface Statistics {
  totalTests: number;
  typeDistribution: Record<MBTIType, number>;
  lastUpdated: string; // ISO 8601 날짜
}

const initialStats: Statistics = {
  totalTests: 0,
  typeDistribution: {
    INTJ: 0, INTP: 0, ENTJ: 0, ENTP: 0,
    INFJ: 0, INFP: 0, ENFJ: 0, ENFP: 0,
    ISTJ: 0, ISFJ: 0, ESTJ: 0, ESFJ: 0,
    ISTP: 0, ISFP: 0, ESTP: 0, ESFP: 0,
  },
  lastUpdated: new Date().toISOString()
};
```

---

## 6. 핵심 알고리즘

### 6.1 MBTI 계산 로직

```typescript
// utils/mbtiCalculator.ts
interface Answer {
  dimension: 'EI' | 'SN' | 'TF' | 'JP';
  value: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';
}

export function calculateMBTI(answers: Answer[]): MBTIType {
  const scores = {
    E: 0, I: 0,
    S: 0, N: 0,
    T: 0, F: 0,
    J: 0, P: 0,
  };

  // 각 답변에 대해 점수 집계
  answers.forEach(answer => {
    scores[answer.value]++;
  });

  // 각 차원에서 우세한 선호 결정
  const type = [
    scores.E >= scores.I ? 'E' : 'I',
    scores.S >= scores.N ? 'S' : 'N',
    scores.T >= scores.F ? 'T' : 'F',
    scores.J >= scores.P ? 'J' : 'P',
  ].join('') as MBTIType;

  return type;
}
```

### 6.2 통계 업데이트

```typescript
// utils/statistics.ts
export function updateStatistics(mbtiType: MBTIType, stats: Statistics): Statistics {
  return {
    totalTests: stats.totalTests + 1,
    typeDistribution: {
      ...stats.typeDistribution,
      [mbtiType]: stats.typeDistribution[mbtiType] + 1,
    },
    lastUpdated: new Date().toISOString(),
  };
}

export function getTypePercentage(type: MBTIType, stats: Statistics): number {
  if (stats.totalTests === 0) return 0;
  return (stats.typeDistribution[type] / stats.totalTests) * 100;
}
```

---

## 7. 테스팅 전략

### 7.1 단위 테스트 (Vitest)

```typescript
// __tests__/mbtiCalculator.test.ts
import { describe, it, expect } from 'vitest';
import { calculateMBTI } from '@/utils/mbtiCalculator';

describe('calculateMBTI', () => {
  it('should return INTJ for specific answers', () => {
    const answers: Answer[] = [
      { dimension: 'EI', value: 'I' },
      { dimension: 'EI', value: 'I' },
      { dimension: 'EI', value: 'I' },
      { dimension: 'SN', value: 'N' },
      // ... 12개 답변
    ];

    expect(calculateMBTI(answers)).toBe('INTJ');
  });
});
```

### 7.2 컴포넌트 테스트 (React Testing Library)

```typescript
// __tests__/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/common/Button';

describe('Button', () => {
  it('should call onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

---

## 8. 배포 및 최적화

### 8.1 빌드 최적화

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true }), // 번들 사이즈 분석
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'chart-vendor': ['chart.js', 'react-chartjs-2'],
        },
      },
    },
  },
});
```

### 8.2 성능 목표

- **First Contentful Paint (FCP)**: < 1.5초
- **Largest Contentful Paint (LCP)**: < 2.5초
- **Time to Interactive (TTI)**: < 3.5초
- **Lighthouse 점수**: 90점 이상 (Performance, Accessibility, Best Practices, SEO)

### 8.3 SEO 최적화

```html
<!-- index.html -->
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="12개의 질문으로 알아보는 나의 MBTI 성격 유형 테스트" />
  <meta property="og:title" content="MBTI 성격 유형 테스트" />
  <meta property="og:description" content="5분 안에 완료하는 간편한 MBTI 테스트" />
  <meta property="og:image" content="/og-image.png" />
  <title>MBTI 성격 유형 테스트</title>
</head>
```

---

## 9. 보안 가이드라인

### 9.1 XSS 방지

```typescript
// ✅ 좋은 예: React는 기본적으로 XSS 방지
<div>{userInput}</div> // 자동 이스케이프

// ❌ 나쁜 예: dangerouslySetInnerHTML 사용 지양
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ 불가피한 경우 DOMPurify 사용
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />
```

### 9.2 민감 정보 관리

```typescript
// ❌ 나쁜 예: API 키를 클라이언트에 노출
const API_KEY = 'sk-1234567890abcdef';

// ✅ 좋은 예: 환경 변수 사용 (필요 시)
const API_URL = import.meta.env.VITE_API_URL;

// 참고: 이 프로젝트는 클라이언트 사이드만 사용하므로 민감 정보 불필요
```

---

## 10. 커밋 & PR 가이드라인

### 10.1 커밋 메시지 규칙

```
<type>: <subject>

<body> (선택)

Type:
- feat: 새로운 기능 추가
- fix: 버그 수정
- style: 코드 포맷팅, 세미콜론 누락 등
- refactor: 코드 리팩토링
- docs: 문서 수정
- test: 테스트 코드
- chore: 빌드 업무, 패키지 매니저 설정 등

예시:
feat: Add question navigation buttons
fix: Fix progress bar animation issue
style: Format code with Prettier
refactor: Extract MBTI calculation logic to utils
```

### 10.2 코드 리뷰 체크리스트

- [ ] TypeScript 타입 에러 없음
- [ ] ESLint 경고/에러 없음
- [ ] 불필요한 console.log 제거
- [ ] 접근성 (a11y) 고려됨
- [ ] 반응형 디자인 동작 확인
- [ ] 성능 최적화 적용 (필요 시)
- [ ] 주석이 필요한 복잡한 로직에 설명 추가

---

## 11. 참고 자료

### 11.1 공식 문서
- React: https://react.dev
- TypeScript: https://www.typescriptlang.org
- Tailwind CSS: https://tailwindcss.com
- Vite: https://vitejs.dev

### 11.2 스타일 가이드
- Airbnb JavaScript Style Guide: https://github.com/airbnb/javascript
- React TypeScript Cheatsheet: https://react-typescript-cheatsheet.netlify.app

### 11.3 성능 & 접근성
- Web.dev: https://web.dev
- WCAG 2.1 Guidelines: https://www.w3.org/WAI/WCAG21/quickref/

---

## 12. 개발 워크플로우

### 12.1 개발 시작

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (localhost:5173)
npm run dev

# 타입 체크
npm run type-check

# 린팅
npm run lint

# 포맷팅
npm run format
```

### 12.2 빌드 & 배포

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview

# 배포 (Vercel 예시)
vercel --prod
```

---

## 마무리

이 가이드라인은 프로젝트의 일관성과 품질을 유지하기 위한 **개발 참조 문서**입니다.

**핵심 원칙:**
1. **타입 안전성**: TypeScript strict 모드로 런타임 에러 방지
2. **성능 우선**: 불필요한 렌더링 최소화, 코드 스플리팅 적극 활용
3. **접근성**: 모든 사용자가 사용할 수 있는 웹 경험 제공
4. **유지보수성**: 명확한 구조, 일관된 코드 스타일, 충분한 주석

새로운 기능 추가나 리팩토링 시 이 문서를 참조하여 프로젝트의 품질과 일관성을 유지해주세요.
