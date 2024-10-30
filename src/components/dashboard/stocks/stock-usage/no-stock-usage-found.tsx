export function NoStockUsageFound() {
  return (
    <div className=" flex items-center justify-center">
      <div className="w-[395px] h-16 flex-col justify-start items-center gap-4 inline-flex">
        <div className="self-stretch text-center text-slate-700 text-2xl font-semibold">
          No usage has been recorded yet
        </div>
        <div className="self-stretch text-center text-slate-500 text-base font-medium">
          Click the button above to create a new one
        </div>
      </div>
    </div>
  );
}
