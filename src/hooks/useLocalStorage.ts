import { useState } from 'react';

/**
 * 로컬 스토리지와 동기화되는 상태를 관리하는 Hook
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // 초기 상태: 로컬 스토리지에서 가져오거나 초기값 사용
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return initialValue;
    }
  });

  // 값 변경 시 로컬 스토리지에 저장
  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  };

  return [storedValue, setValue];
}
