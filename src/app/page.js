import Button from "@/components/Button";
import Card from "@/components/Card";

const BlogMain = () => {
  return (
    <div className="container">
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
