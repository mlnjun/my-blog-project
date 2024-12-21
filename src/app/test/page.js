"use client";

import { useState } from "react";

const Page = () => {
  // 샘플 데이터
  const recentVisitors = [
    {
      id: 1,
      name: "김철수",
      timestamp: "방금 전",
      message: "좋은 글 감사합니다!",
    },
    {
      id: 2,
      name: "이영희",
      timestamp: "10분 전",
      message: "많이 배워갑니다.",
    },
    {
      id: 3,
      name: "박지성",
      timestamp: "30분 전",
      message: "잘 보고 갑니다&#126;",
    },
  ];

  const popularPosts = [
    { id: 1, title: "React 시작하기", views: 1234 },
    { id: 2, title: "JavaScript 기초 문법", views: 987 },
    { id: 3, title: "CSS Grid 레이아웃", views: 756 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* 메인 컨텐츠 영역 */}
        <main className="flex-1">
          <article className="prose lg:prose-xl max-w-none">
            <h1>블로그 포스트 제목</h1>
            <p className="text-gray-600">작성일: 2024.02.20 | 조회수: 123</p>
            <div className="mt-6">
              <p>
                여기에 블로그 본문 내용이 들어갑니다. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </p>
              <p>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              {/* 더 많은 컨텐츠... */}
            </div>
          </article>
        </main>

        {/* 사이드바 */}
        <aside className="md:w-80 md:sticky md:top-4 h-fit">
          {/* 최근 방명록 */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <h3 className="text-lg font-semibold mb-4">최근 방명록</h3>
            <div className="space-y-4">
              {recentVisitors.map((visitor) => (
                <div key={visitor.id} className="border-b last:border-0 pb-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{visitor.name}</span>
                    <span className="text-sm text-gray-500">
                      {visitor.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {visitor.message}
                  </p>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-800">
              방명록 작성하기
            </button>
          </div>

          {/* 인기 게시물 */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-lg font-semibold mb-4">인기 게시물</h3>
            <div className="space-y-3">
              {popularPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between"
                >
                  <a
                    href="#"
                    className="text-sm hover:text-blue-600 flex-1 truncate"
                  >
                    {post.title}
                  </a>
                  <span className="text-xs text-gray-500 ml-2">
                    조회 {post.views}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 태그 클라우드 */}
          <div className="bg-white rounded-lg shadow-sm p-4 mt-6">
            <h3 className="text-lg font-semibold mb-4">태그</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-gray-100 rounded-md text-sm">
                React
              </span>
              <span className="px-2 py-1 bg-gray-100 rounded-md text-sm">
                JavaScript
              </span>
              <span className="px-2 py-1 bg-gray-100 rounded-md text-sm">
                CSS
              </span>
              <span className="px-2 py-1 bg-gray-100 rounded-md text-sm">
                HTML
              </span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Page;
