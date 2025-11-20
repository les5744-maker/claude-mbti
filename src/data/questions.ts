import type { Question } from '@/types';

export const questions: Question[] = [
  // E/I 차원 (외향성/내향성) - 3문항
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
  {
    id: 2,
    dimension: 'EI',
    text: '파티나 모임에 참석했을 때 나는?',
    options: {
      A: {
        text: '사람들과 이야기하며 에너지를 얻는다',
        value: 'E'
      },
      B: {
        text: '소수의 친한 사람들과만 대화하고 금방 지친다',
        value: 'I'
      }
    }
  },
  {
    id: 3,
    dimension: 'EI',
    text: '힘든 일이 있을 때 나는?',
    options: {
      A: {
        text: '친구들을 만나서 이야기를 나누며 푼다',
        value: 'E'
      },
      B: {
        text: '혼자만의 시간을 가지며 생각을 정리한다',
        value: 'I'
      }
    }
  },

  // S/N 차원 (감각/직관) - 3문항
  {
    id: 4,
    dimension: 'SN',
    text: '새로운 프로젝트를 시작할 때 나는?',
    options: {
      A: {
        text: '구체적인 계획과 실행 방법부터 생각한다',
        value: 'S'
      },
      B: {
        text: '전체적인 그림과 가능성부터 상상한다',
        value: 'N'
      }
    }
  },
  {
    id: 5,
    dimension: 'SN',
    text: '이야기를 할 때 나는?',
    options: {
      A: {
        text: '구체적인 사실과 세부사항을 중심으로 말한다',
        value: 'S'
      },
      B: {
        text: '전체적인 맥락과 의미를 중심으로 말한다',
        value: 'N'
      }
    }
  },
  {
    id: 6,
    dimension: 'SN',
    text: '문제를 해결할 때 나는?',
    options: {
      A: {
        text: '검증된 방법과 경험을 활용한다',
        value: 'S'
      },
      B: {
        text: '새로운 방법과 아이디어를 시도한다',
        value: 'N'
      }
    }
  },

  // T/F 차원 (사고/감정) - 3문항
  {
    id: 7,
    dimension: 'TF',
    text: '친구가 고민 상담을 해올 때 나는?',
    options: {
      A: {
        text: '문제의 원인을 분석하고 해결책을 제시한다',
        value: 'T'
      },
      B: {
        text: '친구의 감정에 공감하고 위로를 건넨다',
        value: 'F'
      }
    }
  },
  {
    id: 8,
    dimension: 'TF',
    text: '중요한 결정을 내릴 때 나는?',
    options: {
      A: {
        text: '객관적인 사실과 논리를 우선시한다',
        value: 'T'
      },
      B: {
        text: '관련된 사람들의 감정과 관계를 고려한다',
        value: 'F'
      }
    }
  },
  {
    id: 9,
    dimension: 'TF',
    text: '누군가 실수를 했을 때 나는?',
    options: {
      A: {
        text: '왜 그런 실수가 발생했는지 분석한다',
        value: 'T'
      },
      B: {
        text: '그 사람의 마음이 어떨지 먼저 생각한다',
        value: 'F'
      }
    }
  },

  // J/P 차원 (판단/인식) - 3문항
  {
    id: 10,
    dimension: 'JP',
    text: '여행을 계획할 때 나는?',
    options: {
      A: {
        text: '일정과 예약을 미리 완벽하게 준비한다',
        value: 'J'
      },
      B: {
        text: '대략적인 계획만 세우고 즉흥적으로 즐긴다',
        value: 'P'
      }
    }
  },
  {
    id: 11,
    dimension: 'JP',
    text: '업무나 과제를 진행할 때 나는?',
    options: {
      A: {
        text: '마감일 훨씬 전에 미리미리 끝낸다',
        value: 'J'
      },
      B: {
        text: '마감일이 임박해야 집중력이 생긴다',
        value: 'P'
      }
    }
  },
  {
    id: 12,
    dimension: 'JP',
    text: '일상생활에서 나는?',
    options: {
      A: {
        text: '계획표와 체크리스트를 만들어 관리한다',
        value: 'J'
      },
      B: {
        text: '그때그때 상황에 맞춰 유연하게 행동한다',
        value: 'P'
      }
    }
  },
];
