import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import authReducer from "./features/auth/authSlice";
import counterReducer from "./features/counterSlice";

// SSR인 Next.js 환경에서는 localStorage를 사용할 수 없으므로 빈 storage 객체를 생성합니다.

// SSR을 위한 빈 storage 객체
// Promise.resolve() 는 비동기 작업을 동기적으로 처리하는 데 사용됩니다.
// 즉 이미 진행된 코드를 Promise.resolve()로 감싸서 반환하는 것입니다.
const createNoopStorage = () => {
  return {
    getItem: (key) => {
      // 서버 환경에서는 아무것도 조회를 하지 않기 때문에 null을 반환합니다.
      return Promise.resolve(null);
    },
    setItem: (key, item) => {
      // redux-persist는 서버 환경에서 아무 작업도 하지 않는다.
      // 하지만 setItem 메서드는 반드시 반환값을 반환해야 하므로 빈 item을 반환합니다.
      return Promise.resolve();
    },
    removeItem: (key) => {
      // 서버 환경에서는 아무 localStorage를 삭제하지 않을 것이기 때문에 빈 값을 반환합니다.
      return Promise.resolve();
    },
  };
};

// storage 초기화
const storage =
  typeof window !== "undefined"
    ? {
        getItem: (key) => {
          const item = localStorage.getItem(key);

          // 동기적으로 localStorage를 조회한 값을
          // 비동기적으로 반환한다.
          return Promise.resolve(item);
        },
        setItem: (key, item) => {
          localStorage.setItem(key, item);

          // 비동기적으로 반환하기 위해 Promise.resolve()를 반환합니다.
          return Promise.resolve();
        },
        removeItem: (key) => {
          localStorage.removeItem(key);

          // 비동기적으로 반환하기 위해 Promise.resolve()를 반환합니다.
          return Promise.resolve();
        },
      }
    : createNoopStorage();

// persist 설정
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["isAuthenticated", "name"], // 유지할 상태
};

// persist reducer 생성
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

// store 생성
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

// persistor 생성 (브라우저 환경에서만)
let persistor;
if (typeof window !== "undefined") {
  persistor = persistStore(store);
}

export { persistor };
