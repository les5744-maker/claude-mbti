import type { Statistics, MBTIType } from '@/types';

const STORAGE_KEY = 'mbti-test-stats';

/**
 * 초기 통계 데이터
 */
export const initialStats: Statistics = {
  totalTests: 0,
  typeDistribution: {
    INTJ: 0, INTP: 0, ENTJ: 0, ENTP: 0,
    INFJ: 0, INFP: 0, ENFJ: 0, ENFP: 0,
    ISTJ: 0, ISFJ: 0, ESTJ: 0, ESFJ: 0,
    ISTP: 0, ISFP: 0, ESTP: 0, ESFP: 0,
  },
  lastUpdated: new Date().toISOString()
};

/**
 * 로컬 스토리지에서 통계 데이터를 가져옵니다.
 */
export function getStatistics(): Statistics {
  try {
    const item = window.localStorage.getItem(STORAGE_KEY);
    if (item) {
      return JSON.parse(item);
    }
    return initialStats;
  } catch (error) {
    console.error('Error loading statistics from localStorage:', error);
    return initialStats;
  }
}

/**
 * 로컬 스토리지에 통계 데이터를 저장합니다.
 */
export function saveStatistics(stats: Statistics): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (error) {
    console.error('Error saving statistics to localStorage:', error);
  }
}

/**
 * 통계 데이터를 업데이트합니다.
 */
export function updateStatistics(mbtiType: MBTIType): Statistics {
  const stats = getStatistics();

  const updatedStats: Statistics = {
    totalTests: stats.totalTests + 1,
    typeDistribution: {
      ...stats.typeDistribution,
      [mbtiType]: stats.typeDistribution[mbtiType] + 1,
    },
    lastUpdated: new Date().toISOString(),
  };

  saveStatistics(updatedStats);
  return updatedStats;
}

/**
 * 특정 유형의 백분율을 계산합니다.
 */
export function getTypePercentage(type: MBTIType, stats: Statistics): number {
  if (stats.totalTests === 0) return 0;
  return Math.round((stats.typeDistribution[type] / stats.totalTests) * 100 * 10) / 10;
}
