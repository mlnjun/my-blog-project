const Button = ({ children, onClick, type }) => {
  if (type === "secondary") {
    // 밝은 버튼 컴포넌트
    return (
      <button
        className="px-2.5 py-2 body-2 text-justify text-primary text-opacity-75 border-0.25 border-primary border-opacity-75 rounded-[5px] bg-n-1 hover:bg-primary hover:text-n-1"
        onClick={onClick}
      >
        {children}
      </button>
    );
  } else {
    // 기본 버튼 컴포넌트
    return (
      <button
        className="px-2.5 py-2 body-2 text-justify text-n-1 border-0.25 rounded-[5px] bg-primary bg-opacity-80 hover:bg-opacity-100"
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
};

export default Button;

// Next.js에서 지원하는 useRouter 훅으로 Link컴포넌트 대체 가능
