import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Answer } from '@/types';
import { calculateMBTI } from '@/utils/mbtiCalculator';
import { results } from '@/data/results';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { useStats } from '@/hooks/useStats';
import { saveAsImage, shareResult, copyToClipboard } from '@/utils/share';
import { StatsChart } from '@/components/features/StatsChart';

export const ResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addResult } = useStats();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const answers = location.state?.answers as Answer[] | undefined;

  useEffect(() => {
    if (!answers || answers.length === 0) {
      navigate('/');
      return;
    }

    // 결과를 통계에 추가
    const mbtiType = calculateMBTI(answers);
    addResult(mbtiType);
  }, [answers, navigate, addResult]);

  if (!answers || answers.length === 0) {
    return null;
  }

  const mbtiType = calculateMBTI(answers);
  const result = results[mbtiType];

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSaveImage = async () => {
    try {
      await saveAsImage('result-content', `my-mbti-${mbtiType}.png`);
      showToastMessage('이미지가 저장되었습니다!');
    } catch (error) {
      showToastMessage('이미지 저장에 실패했습니다.');
    }
  };

  const handleShare = async () => {
    try {
      const shared = await shareResult(mbtiType, result.nickname);
      if (shared) {
        showToastMessage('공유되었습니다!');
      } else {
        showToastMessage('링크가 복사되었습니다!');
      }
    } catch (error) {
      try {
        await copyToClipboard();
        showToastMessage('링크가 복사되었습니다!');
      } catch {
        showToastMessage('공유에 실패했습니다.');
      }
    }
  };

  const handleRestart = () => {
    navigate('/test');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 결과 컨텐츠 (이미지 저장 대상) */}
        <div id="result-content" className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-8">
          {/* 헤더 섹션 */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-primary to-secondary text-white p-8 md:p-12 text-center"
          >
            <motion.h1
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-5xl md:text-6xl font-bold mb-4"
            >
              {result.type}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-2xl md:text-3xl font-semibold"
            >
              {result.nickname}
            </motion.p>
          </motion.div>

          <div className="p-6 md:p-10">
            {/* 설명 섹션 */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mb-10"
            >
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {result.description}
              </p>
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">핵심 특징</h3>
                <ul className="space-y-2">
                  {result.traits.map((trait, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span className="text-gray-700">{trait}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.section>

            {/* 강점/약점 섹션 */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="grid md:grid-cols-2 gap-6 mb-10"
            >
              {/* 강점 */}
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">💪 강점</h3>
                <ul className="space-y-2">
                  {result.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span className="text-gray-700 text-sm">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 약점 */}
              <div className="bg-orange-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">⚠️ 주의할 점</h3>
                <ul className="space-y-2">
                  {result.weaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-orange-600 mr-2">•</span>
                      <span className="text-gray-700 text-sm">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.section>

            {/* 추천 직업 섹션 */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="mb-10"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">💼 추천 직업</h3>
              <div className="flex flex-wrap gap-2">
                {result.careers.map((career, index) => (
                  <span
                    key={index}
                    className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {career}
                  </span>
                ))}
              </div>
            </motion.section>

            {/* 유명인 섹션 */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="mb-6"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">⭐ 같은 유형의 유명인</h3>
              <div className="flex flex-wrap gap-2">
                {result.celebrities.map((celebrity, index) => (
                  <span
                    key={index}
                    className="bg-pink-100 text-pink-800 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {celebrity}
                  </span>
                ))}
              </div>
            </motion.section>
          </div>
        </div>

        {/* 액션 버튼 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
        >
          <Button onClick={handleSaveImage} variant="primary">
            📥 이미지로 저장
          </Button>
          <Button onClick={handleShare} variant="secondary">
            📤 공유하기
          </Button>
          <Button onClick={handleRestart} variant="outline">
            🔄 다시 하기
          </Button>
        </motion.div>

        {/* 통계 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.5 }}
        >
          <Card>
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              📊 MBTI 유형 통계
            </h3>
            <StatsChart currentType={mbtiType} />
          </Card>
        </motion.div>
      </div>

      {/* Toast 메시지 */}
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg z-50"
        >
          {toastMessage}
        </motion.div>
      )}
    </div>
  );
};
