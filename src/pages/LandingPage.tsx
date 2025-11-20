import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/common/Button';
import { useStats } from '@/hooks/useStats';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { stats } = useStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full text-center"
      >
        {/* 메인 타이틀 */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6"
        >
          MBTI 성격 유형 테스트
        </motion.h1>

        {/* 부제목 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-xl md:text-2xl text-gray-700 mb-8"
        >
          12개의 질문으로 알아보는 나의 성격 유형
        </motion.p>

        {/* 특징 카드 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">12</div>
              <div className="text-gray-600">간단한 질문</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">5분</div>
              <div className="text-gray-600">소요 시간</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">
                {stats.totalTests.toLocaleString()}+
              </div>
              <div className="text-gray-600">참여자 수</div>
            </div>
          </div>
        </motion.div>

        {/* CTA 버튼 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Button
            onClick={() => navigate('/test')}
            className="text-xl px-12 py-4 mb-4"
          >
            테스트 시작하기
          </Button>
          <p className="text-sm text-gray-500">
            무료 • 회원가입 불필요 • 익명 보장
          </p>
        </motion.div>

        {/* 안내 문구 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 text-gray-600 text-sm"
        >
          <p>솔직하게 답변할수록 더 정확한 결과를 얻을 수 있습니다</p>
        </motion.div>
      </motion.div>
    </div>
  );
};
