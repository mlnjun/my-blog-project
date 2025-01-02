import { createSlice } from "@reduxjs/toolkit";

// 초기 상태를 정의합니다.
const initialState = {
  value: 0,
};

// createSlice 함수를 사용하여 슬라이스를 생성합니다.
export const counterSlice = createSlice({
  name: "counter", // 슬라이스의 이름을 설정합니다.
  initialState, // 초기 상태를 설정합니다.
  reducers: {
    // 리듀서 함수들을 정의합니다.
    increment: (state) => {
      // state를 직접 변경해도 Immer 라이브러리 덕분에 불변성이 유지됩니다.
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

// 액션 생성자들을 추출합니다.
export const { increment, decrement } = counterSlice.actions;
// 리듀서를 추출하여 스토어에 등록할 수 있도록 export 합니다.
export default counterSlice.reducer;
