export function OverviewCardSkeleton() {
  return (
    <div className="w-full h-[206px] p-6 bg-white rounded-lg shadow border border-gray-200 flex-col justify-start items-start gap-6 inline-flex">
      <p className="h-3 w-56 animate-pulse bg-gray-300 rounded-full" />

      <div className=" size-10 shrink-0  bg-gray-300 rounded-full animate-pulse" />
      <div className="  flex items-center gap-2">
        <div className="h-2 w-20 animate-pulse bg-gray-300 rounded-full" />
        <div className="h-2 w-20 animate-pulse bg-gray-300 rounded-full" />
        <div className="h-2 w-20 animate-pulse bg-gray-300 rounded-full" />
      </div>
      <div className="flex items-center gap-2">
        <div className="h-2 w-20 animate-pulse bg-slate-300 rounded-full" />
        <div className="h-2 w-20 animate-pulse bg-slate-300 rounded-full" />
        <div className="h-2 w-20 animate-pulse bg-slate-300 rounded-full" />
      </div>
    </div>
  );
}
