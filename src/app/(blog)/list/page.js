import Card from "@/components/Card";
import Button from "@/components/Button";

const page = () => {
  return (
    <div className="flex my-6">
      <div className="flex flex-col mx-auto max-w-[1080]">
        <div className="flex flex-wrap items-center justify-between px-4 py-2 w-[1080] bg-primary bg-opacity-25 rounded-lg">
          <div>
            <select className="px-2 w-full bg-white rounded-lg border box-border border-primary border-opacity-25 border-solid min-h-[36px] max-md:max-w-full focus:outline-none focus:border-n-6 focus:border-[2px]">
              <option>카테고리</option>
              <option>개발일지</option>
            </select>
          </div>
          <div className="flex items-center gap-1 w-full mt-2 sm:w-auto sm:mt-0">
            <input
              className="px-2 w-full bg-white rounded-lg border box-border border-primary border-opacity-25 border-solid min-h-[36px] max-md:max-w-full focus:outline-none focus:border-n-6 focus:border-[2px]"
              type="text"
            />
            <Button className="font-semibold">검색</Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 mt-2">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  );
};

export default page;
