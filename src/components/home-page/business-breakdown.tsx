export function BusinessBreakdown() {
  return (
    <div className="border-t flex border-b border-slate-700 mt-20">
      <div className="max-w-[1200px] mx-auto w-full py-20 bg-white flex-col justify-start items-center gap-6 inline-flex">
        <div className="text-center text-black text-lg font-bold leading-[27px]">
          Trusted by 10,000+ businesses across 50 countries
        </div>
        <div className="self-stretch py-2 justify-center items-center gap-6 inline-flex max-md:flex-col md:items-start">
          <div className="flex-col justify-start items-center gap-2 inline-flex">
            <div className="self-stretch text-center text-black text-5xl font-semibold ">
              ₦50m +
            </div>
            <div className="self-stretch text-center text-black text-base font-normal leading-normal">
              In inventory managed annually
            </div>
          </div>
          <div className="flex-col justify-start items-center gap-2 inline-flex">
            <div className="self-stretch text-center text-black text-5xl font-semibold">
              99.9%
            </div>
            <div className="self-stretch text-center text-black text-base font-normal leading-normal">
              Faster inventory tracking
            </div>
          </div>
          <div className="flex-col justify-start items-center gap-2 inline-flex">
            <div className="text-center text-black text-5xl font-semibold">
              98%
            </div>
            <div className="text-center text-black text-base font-normal leading-normal">
              Customer satisfaction rate
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
