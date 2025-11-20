import { useState } from 'react';
import type { Statistics, MBTIType } from '@/types';
import { getStatistics, updateStatistics } from '@/utils/storage';

/**
 * 통계 데이터를 관리하는 Hook
 */
export function useStats() {
  const [stats, setStats] = useState<Statistics>(() => getStatistics());

  /**
   * 새로운 테스트 결과를 통계에 추가
   */
  const addResult = (mbtiType: MBTIType) => {
    const updatedStats = updateStatistics(mbtiType);
    setStats(updatedStats);
  };

  /**
   * 통계 새로고침
   */
  const refreshStats = () => {
    setStats(getStatistics());
  };

  return {
    stats,
    addResult,
    refreshStats,
  };
}
