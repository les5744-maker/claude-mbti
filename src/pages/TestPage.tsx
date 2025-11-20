import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ProgressBar } from '@/components/common/ProgressBar';
import { Card } from '@/components/common/Card';
import { useTest } from '@/hooks/useTest';

export const TestPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    progress,
    handleAnswer,
    handlePrevious,
    isCompleted,
    answers,
  } = useTest();

  // 테스트 완료 시 결과 페이지로 이동
  useEffect(() => {
    if (isCompleted) {
      navigate('/result', { state: { answers } });
    }
  }, [isCompleted, navigate, answers]);

  if (!currentQuestion) {
    return null;
  }

  const handleOptionClick = (option: 'A' | 'B') => {
    handleAnswer(option);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 프로그레스 바 */}
        <ProgressBar
          current={currentQuestionIndex + 1}
          total={totalQuestions}
          progress={progress}
        />

        {/* 질문 카드 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
                {currentQuestion.text}
              </h2>

              <div className="space-y-4">
                {/* 옵션 A */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleOptionClick('A')}
                  className="w-full p-6 text-left bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border-2 border-transparent hover:border-primary rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <div className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold mr-4">
                      A
                    </span>
                    <span className="text-lg text-gray-800 flex-1">
                      {currentQuestion.options.A.text}
                    </span>
                  </div>
                </motion.button>

                {/* 옵션 B */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleOptionClick('B')}
                  className="w-full p-6 text-left bg-gradient-to-r from-pink-50 to-purple-50 hover:from-pink-100 hover:to-purple-100 border-2 border-transparent hover:border-secondary rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <div className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center font-bold mr-4">
                      B
                    </span>
                    <span className="text-lg text-gray-800 flex-1">
                      {currentQuestion.options.B.text}
                    </span>
                  </div>
                </motion.button>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* 이전 버튼 */}
        {currentQuestionIndex > 0 && (
          <div className="text-center">
            <button
              onClick={handlePrevious}
              className="text-gray-600 hover:text-gray-800 underline"
            >
              ← 이전 질문으로
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
