import { createSlice } from "@reduxjs/toolkit";

// 초기 상태를 정의합니다.
const initialState = {
  isLogin: false,
  userName: "",
};

// createSlice 함수를 사용하여 슬라이스를 생성합니다.
export const authSlice = createSlice({
  name: "auth", // 슬라이스의 이름을 설정합니다.
  initialState, // 초기 상태를 설정합니다.
  reducers: {
    // 리듀서 함수들을 정의합니다.
    login: (state, action) => {
      state.isLogin = true;
      state.userName = action.payload;
    },
    logout: (state, action) => {
      state.isLogin = false;
      state.userName = "";
    },
  },
});

// 액션 생성자들을 추출합니다.
export const { login, logout } = authSlice.actions;

// 리듀서를 추출하여 스토어에 등록할 수 있도록 export 합니다.
export default authSlice.reducer;
