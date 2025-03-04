"use client";

import Editor from "@/components/Editor";
import Button from "@/components/Button";
import BlogCategoryEditor from "@/components/BlogCategoryEditor";
import { useState, useEffect } from "react";
import axios from "@/utils/axios";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 카테고리 데이터
  const [categories, setCategories] = useState([]);

  // 게시글 데이터
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: [],
  });

  // 게시글 데이터 업데이트
  const handleFormData = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // 게시글 내용 데이터 업데이트
  const handleFormDataContent = (content) => {
    setFormData((prev) => ({ ...prev, content: content }));
  };

  // 태그 입력 처리
  const handleTagInput = (e) => {
    // .trim() > 문자열 양쪽 끝의 공백 제거
    const tag = e.target.value.trim();

    if (tag && e.key === "Enter") {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
      e.target.value = "";
    }
  };

  // 카테고리 데이터 가져오기
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get("/api/blog/category");
      setCategories(response.data.categories);
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col px-4 mx-auto max-w-[1080px] min-h-[calc(100vh-57px)]">
      <div className="flex flex-col flex-1 gap-2">
        <input
          className="h2 my-1.5 p-2 w-full bg-white rounded-lg min-h-[36px] max-md:max-w-full box-border border-[2px] border-transparent focus:border-primary focus:border-opacity-30 focus:outline-none"
          type="text"
          placeholder="제목"
          value={formData.title}
          onChange={(e) => handleFormData("title", e.target.value)}
        />

        <hr />

        <div className="flex justify-between items-center">
          <input
            className="body-1 mt-2 p-2 w-[50%] bg-white rounded-lg min-h-[36px] max-md:max-w-full box-border border-[2px] border-transparent focus:border-primary focus:border-opacity-30 focus:outline-none"
            type="text"
            placeholder="태그 추가"
            onKeyDown={handleTagInput}
          />

          <div className="my-2 p-2 w-[33%] flex gap-1.5">
            <select
              type="text"
              className="w-full bg-white rounded-lg min-h-[36px] max-md:max-w-full box-border border-[2px] border-n-5 focus:border-primary focus:border-opacity-30 focus:outline-none"
              value={formData.category}
              onChange={(e) => handleFormData("category", e.target.value)}
            >
              <option>카테고리</option>
              {categories.map((category, index) => (
                <option key={index} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            <Button
              type="secondary"
              className="h-[36px]"
              onClick={() => setIsModalOpen(true)}
            >
              생성
            </Button>
          </div>
        </div>
        <div className="flex gap-1.5 mt-1 mb-2">
          <div className="font-semibold text-white bg-primary bg-opacity-80 p-2 border-[0.25px] rounded-lg">
            JavaScript
          </div>
          <div className="font-semibold text-white bg-primary bg-opacity-80 p-2 border-[0.25px] rounded-lg">
            Node.js
          </div>
          {formData.tags.map((tag, index) => (
            <div
              key={index}
              className="font-semibold text-white bg-primary bg-opacity-80 p-2 border-[0.25px] rounded-lg"
            >
              {tag}
            </div>
          ))}
        </div>

        <hr />

        <div className="flex-1">
          <Editor onUpdate={handleFormDataContent} />
        </div>
      </div>

      <BlogCategoryEditor
        // props로 모달 열기/닫기 상태 전달
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Page;
