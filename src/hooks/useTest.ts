import { useState, useCallback } from 'react';
import type { Answer } from '@/types';
import { questions } from '@/data/questions';

/**
 * 테스트 진행 상태를 관리하는 Hook
 */
export function useTest() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  /**
   * 답변 추가 및 다음 질문으로 이동
   */
  const handleAnswer = useCallback((option: 'A' | 'B') => {
    const question = questions[currentQuestionIndex];
    const selectedOption = question.options[option];

    const newAnswer: Answer = {
      questionId: question.id,
      dimension: question.dimension,
      value: selectedOption.value,
    };

    setAnswers(prev => [...prev, newAnswer]);
    setCurrentQuestionIndex(prev => prev + 1);
  }, [currentQuestionIndex]);

  /**
   * 이전 질문으로 이동
   */
  const handlePrevious = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setAnswers(prev => prev.slice(0, -1));
    }
  }, [currentQuestionIndex]);

  /**
   * 테스트 초기화
   */
  const reset = useCallback(() => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
  }, []);

  /**
   * 테스트 완료 여부
   */
  const isCompleted = currentQuestionIndex >= totalQuestions;

  return {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    progress,
    answers,
    handleAnswer,
    handlePrevious,
    reset,
    isCompleted,
  };
}
