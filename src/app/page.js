import Link from "next/link";

// 컴포넌트
import Button from "@/components/Button";
import Card from "@/components/Card";

const BlogMain = () => {
  return (
    <div className="container">
      {/* <div class="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center p-4">
        <h1 class="text-2xl font-bold">Welcome to Our Website!</h1>
        <p class="mt-2">Sign up now to get the latest updates.</p>
      </div> */}
      <Link href="/list">
        <Button>블로그 목록</Button>
      </Link>
      <Link href="/blog/create">
        <Button type="secondary">블로그 생성</Button>
      </Link>
      <Link href="/blog/modify">
        <Button type="secondary">블로그 수정</Button>
      </Link>

      <hr />

      <p className="h1">테스트 텍스트입니다.</p>
      <p className="h2">테스트 텍스트입니다.</p>
      <p className="h3">테스트 텍스트입니다.</p>
      <p className="h4">테스트 텍스트입니다.</p>
      <p className="h5">테스트 텍스트입니다.</p>
      <p className="h6">테스트 텍스트입니다.</p>
      <br />
      <hr />
      <p className="body-1">테스트 텍스트입니다.</p>
      <p className="body-2">테스트 텍스트입니다.</p>
      <p className="body-3">테스트 텍스트입니다.</p>

      <br />
      <hr />
      <br />
      <Button>예시 버튼</Button>
      <Button type="secondary">예시 버튼</Button>

      <br />
      <br />
      <hr />
      <br />
      <Card></Card>
    </div>
  );
};

export default BlogMain;
