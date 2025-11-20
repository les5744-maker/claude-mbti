import html2canvas from 'html2canvas';
import type { MBTIType } from '@/types';

/**
 * 결과 페이지를 이미지로 저장합니다.
 */
export async function saveAsImage(elementId: string, fileName: string = 'my-mbti-result.png'): Promise<void> {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found');
    }

    const canvas = await html2canvas(element, {
      scale: 2, // 고해상도
      backgroundColor: '#ffffff',
      logging: false,
    });

    // Canvas를 Blob으로 변환
    canvas.toBlob((blob) => {
      if (!blob) {
        throw new Error('Failed to create blob');
      }

      // 다운로드 링크 생성
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  } catch (error) {
    console.error('Error saving image:', error);
    throw error;
  }
}

/**
 * 결과를 공유합니다 (Web Share API 또는 클립보드 복사).
 */
export async function shareResult(mbtiType: MBTIType, nickname: string): Promise<boolean> {
  const title = `나의 MBTI는 ${mbtiType}!`;
  const text = `나는 ${nickname}입니다!`;
  const url = window.location.href;

  try {
    // Web Share API 지원 확인
    if (navigator.share) {
      await navigator.share({
        title,
        text,
        url,
      });
      return true;
    } else {
      // 폴백: 클립보드에 URL 복사
      await navigator.clipboard.writeText(url);
      return false; // 클립보드 복사 성공
    }
  } catch (error) {
    console.error('Error sharing result:', error);
    throw error;
  }
}

/**
 * URL을 클립보드에 복사합니다.
 */
export async function copyToClipboard(text: string = window.location.href): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    throw error;
  }
}
