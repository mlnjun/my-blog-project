const page = () => {
  return (
    <div className="flex transform origin-center translate-y-1/4">
      <section className="flex flex-col overflow-hidden self-center px-12 py-9 mx-auto max-w-full rounded-2xl border border-solid bg-blue-600 bg-opacity-30 w-[640px] max-md:px-5 ">
        <h1 className="h3 text-center">회원가입</h1>
        <form>
          <div className="flex overflow-hidden flex-col mt-5 w-full text-base text-black whitespace-nowrap max-md:max-w-full">
            <label htmlFor="name" className="h6 text-n-9">
              이름
            </label>
            <input
              type="id"
              // id={id}
              className="flex mt-1.5 px-2 w-full bg-white rounded-lg border border-primary border-opacity-25 border-solid min-h-[36px] max-md:max-w-full focus:outline-none focus:border-n-6 focus:border-[2px]"
              aria-label="name"
            />
          </div>
          <div className="flex overflow-hidden flex-col mt-5 w-full text-base text-black whitespace-nowrap max-md:max-w-full">
            <label htmlFor="id" className="h6 text-n-9">
              아이디
            </label>
            <input
              type="id"
              // id={id}
              className="flex mt-1.5 px-2 w-full bg-white rounded-lg border border-primary border-opacity-25 border-solid min-h-[36px] max-md:max-w-full focus:outline-none focus:border-n-6 focus:border-[2px]"
              aria-label="id"
            />
          </div>
          <div className="flex overflow-hidden flex-col mt-5 w-full text-base text-black whitespace-nowrap max-md:max-w-full">
            <label htmlFor="password" className="h6 text-n-9">
              비밀번호
            </label>
            <input
              type="password"
              // id={id}
              className="flex mt-1.5 px-2 w-full bg-white rounded-lg border border-primary border-opacity-25 border-solid min-h-[36px] max-md:max-w-full focus:outline-none focus:border-n-6 focus:border-[2px]"
              aria-label="password"
            />
          </div>
          <div className="flex overflow-hidden flex-col mt-5 w-full text-base text-black whitespace-nowrap max-md:max-w-full">
            <label htmlFor="passwordCheck" className="h6 text-n-9">
              비밀번호 재확인
            </label>
            <input
              type="password"
              // id={id}
              className="flex mt-1.5 px-2 w-full bg-white rounded-lg border border-primary border-opacity-25 border-solid min-h-[36px] max-md:max-w-full focus:outline-none focus:border-n-6 focus:border-[2px]"
              aria-label="passwordCheck"
            />
          </div>
        </form>
        <button className="h5 text-n-1 w-full h-[45px] mt-7 bg-primary rounded-md hover:bg-[#005dc0]">
          회원가입
        </button>
      </section>
    </div>
  );
};

export default page;
