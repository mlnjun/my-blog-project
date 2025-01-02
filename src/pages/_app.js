import { Provider } from "react-redux";
import { store } from "../store/store";

// MyApp 컴포넌트는 모든 페이지를 감싸는 최상위 컴포넌트입니다.
function MyApp({ Component, pageProps }) {
  return (
    // Redux 스토어를 모든 컴포넌트에서 사용할 수 있도록 Provider로 감쌉니다.
    <Provider store={store}>
      {/* 현재 페이지 컴포넌트를 렌더링합니다. */}
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
