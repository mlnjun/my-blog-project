import Image from "next/image";

const page = () => {
  return (
    <div className="flex transform origin-center translate-y-1/2">
      <section className="flex flex-col overflow-hidden self-center px-12 py-9 mx-auto max-w-full rounded-2xl border border-solid bg-blue-600 bg-opacity-30 w-[640px] max-md:px-5 ">
        <h1 className="h3 text-center">로그인</h1>
        <form>
          <div className="flex overflow-hidden flex-col mt-5 w-full text-base text-black whitespace-nowrap max-md:max-w-full">
            <label htmlFor="id">ID</label>
            <input
              type="id"
              // id={id}
              className="flex mt-1.5 px-1 w-full bg-white rounded-lg border border-primary border-opacity-25 border-solid min-h-[36px] max-md:max-w-full focus:outline-none focus:border-n-6 focus:border-[2px]"
              aria-label="id"
            />
          </div>
          <div className="flex overflow-hidden flex-col mt-5 w-full text-base text-black whitespace-nowrap max-md:max-w-full">
            <label htmlFor="password">PW</label>
            <input
              type="password"
              // id={id}
              className="flex mt-1.5 px-1 w-full bg-white rounded-lg border border-primary border-opacity-25 border-solid min-h-[36px] max-md:max-w-full focus:outline-none focus:border-n-6 focus:border-[2px]"
              aria-label="password"
            />
          </div>
          <div className="flex mt-5 mx-auto gap-4 justify-between w-[45%]">
            <button>
              <Image
                src="/icon/google_btn.svg"
                alt="google"
                width={40}
                height={40}
              />
            </button>
            <button>
              <Image src="naver_btn.svg" alt="naver" width={40} height={40} />
            </button>
          </div>
        </form>
        <button className="h5 text-n-1 w-full h-[45px] mt-5 bg-primary rounded-md hover:bg-[#005dc0]">
          로그인
        </button>
      </section>
    </div>
  );
};

export default page;
