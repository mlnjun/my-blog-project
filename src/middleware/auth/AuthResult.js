class AuthResult {
  constructor(isValid, user = null, error = null) {
    this.isValid = isValid;    // 인증 성공 여부
    this.user = user;          // 유저 정보
    this.error = error;        // 에러 메시지
  }
}

export default AuthResult;
