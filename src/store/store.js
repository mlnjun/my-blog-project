import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";

// configureStore 함수를 사용하여 스토어를 생성합니다.
export const store = configureStore({
  // 리듀서들을 등록합니다.
  reducer: {
    // counter 슬라이스의 리듀서를 'counter' 키로 등록합니다.
    counter: counterReducer,
  },
  // // 미들웨어를 설정합니다.
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     // 직렬화 불가능한 값 감지 기능을 비활성화합니다. (필요한 경우)
  //     serializableCheck: false,
  //   })
  //     .concat
  //     // 추가 미들웨어를 여기에 추가합니다.
  //     // 예시: logger 미들웨어
  //     // logger,
  //     (),
  // 개발 도구 설정을 합니다.
  devTools: process.env.NODE_ENV !== "production",
  // 초기 상태를 설정합니다. (선택 사항)
  preloadedState: {
    // 예시: counter의 초기값을 10으로 설정
    // counter: { value: 10 },
  },
  // 스토어 향상자를 설정합니다. (고급 설정)
  enhancers: [],
});
