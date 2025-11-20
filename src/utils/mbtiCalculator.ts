import type { Answer, MBTIType, Scores } from '@/types';

/**
 * 답변 배열을 기반으로 MBTI 유형을 계산합니다.
 */
export function calculateMBTI(answers: Answer[]): MBTIType {
  const scores: Scores = {
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

/**
 * 답변 배열로부터 점수를 계산합니다.
 */
export function calculateScores(answers: Answer[]): Scores {
  const scores: Scores = {
    E: 0, I: 0,
    S: 0, N: 0,
    T: 0, F: 0,
    J: 0, P: 0,
  };

  answers.forEach(answer => {
    scores[answer.value]++;
  });

  return scores;
}
