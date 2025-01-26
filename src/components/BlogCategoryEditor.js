// 모달 형식으로 띄워 블로그의 카테고리를 생성하는 컴포넌트
'use client'
import api from '@/utils/axios';
import { useState } from 'react';

const BlogCategoryEditor = ({ isOpen, onClose }) => {
    const [categoryName, setCategoryName] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);
    const [isError, setIsError] = useState(false);
    const [completedMessage, setCompletedMessage] = useState('');

    const handleCategoryName = (e) => {
        setCategoryName(e.target.value);
    }
    
    // 카테고리 생성 함수
    const createCategory = async () => {
        try {
            const response = await api.post('/api/blog/category/create', {
                name: categoryName
            });
            setIsCompleted(true);
            setCompletedMessage("카테고리가 생성되었습니다.");
        } catch (error) {
            // 401 토큰 만료는 인터셉터에서 자동 처리됨
            if (error.response?.status === 400) {
                setIsCompleted(false);
                setCompletedMessage(error.response.data.message);
                setIsError(true);
            }else {
                setIsCompleted(false);
                setCompletedMessage("카테고리 생성에 실패했습니다.");
                setIsError(true);
            }
        }
    }

    if (!isOpen) return null;

    return (
        // 모달 배경 (전체 화면을 덮는 오버레이)
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            {/* 모달 컨텐츠 */}
            <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">블로그 카테고리 생성</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>
                
                <input 
                    type="text" 
                    placeholder="카테고리 이름" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={categoryName}
                    onChange={handleCategoryName}
                />

                {isCompleted && (
                    <p className="text-green-500 mt-2">{completedMessage}</p>
                )}

                {isError && (
                    <p className="text-red-500 mt-2">{completedMessage}</p>
                )}
                
                <div className="flex justify-end mt-3 gap-2">
                    <button 
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                    >
                        취소
                    </button>
                    <button 
                        onClick={createCategory}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        생성
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlogCategoryEditor;