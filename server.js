const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// CORS 설정
app.use((req, res, next) => {
  // 프로덕션 환경에서만 특정 도메인 허용
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// DB 연결 함수
const connectDB = async () => {
  try {
    // 프로덕션 환경에서만 실제 DB에 연결
    if (process.env.NODE_ENV === 'production') {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('프로덕션 DB 연결 성공');
    } else {
      console.log('개발 환경: DB 연결 생략');
    }
  } catch (error) {
    console.error('DB 연결 실패:', error);
    process.exit(1);
  }
};

// 서버 시작
const startServer = async () => {
  await connectDB();
  
  app.listen(port, () => {
    console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
  });
};

startServer();

// 기본 라우트
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', environment: process.env.NODE_ENV });
});

// 에러 핸들링
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: '서버 에러가 발생했습니다.' });
});