// 토큰 만료 시 로그아웃 처리 인터셉터

import axios from 'axios';
import { store } from '@/store/store';
import { logout } from '@/store/features/auth/authSlice';

const api = axios.create();  // withCredentials 제거

// 응답 인터셉터 추가
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && 
        error.response?.data?.message === "인증이 만료되었습니다" ||
        error.response?.data?.message === "인증이 필요합니다") {
      store.dispatch(logout());
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api; 