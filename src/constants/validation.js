// 프론트엔드와 백엔드에서 동일한 규칙 사용
const validationRules = {
  id: {
    minLength: 4,
    pattern: /^[a-zA-Z0-9]+$/,
  },
  password: {
    minLength: 6,
    pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  },
};

export default validationRules;
