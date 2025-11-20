// MBTI 차원 타입
export type MBTIDimension = 'EI' | 'SN' | 'TF' | 'JP';

// MBTI 개별 특성 타입
export type MBTITrait = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';

// MBTI 유형 (16가지)
export type MBTIType =
  | 'INTJ' | 'INTP' | 'ENTJ' | 'ENTP'
  | 'INFJ' | 'INFP' | 'ENFJ' | 'ENFP'
  | 'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFJ'
  | 'ISTP' | 'ISFP' | 'ESTP' | 'ESFP';

// 질문 옵션
export interface QuestionOption {
  text: string;
  value: MBTITrait;
}

// 질문 인터페이스
export interface Question {
  id: number;
  dimension: MBTIDimension;
  text: string;
  options: {
    A: QuestionOption;
    B: QuestionOption;
  };
}

// 사용자 답변
export interface Answer {
  questionId: number;
  dimension: MBTIDimension;
  value: MBTITrait;
}

// MBTI 결과 데이터
export interface ResultData {
  type: MBTIType;
  nickname: string;
  description: string;
  traits: string[];
  strengths: string[];
  weaknesses: string[];
  careers: string[];
  celebrities: string[];
}

// 통계 데이터
export interface Statistics {
  totalTests: number;
  typeDistribution: Record<MBTIType, number>;
  lastUpdated: string;
}

// 점수 집계
export interface Scores {
  E: number;
  I: number;
  S: number;
  N: number;
  T: number;
  F: number;
  J: number;
  P: number;
}
