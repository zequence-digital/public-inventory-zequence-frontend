export function EmptyNotificationMessage() {
  return (
    <div className="h-[169px] flex-col justify-start items-center gap-[25px] inline-flex">
      <div className="h-[61px] flex-col justify-center items-center gap-3 flex">
        <div className="w-[160px] h-[21px] relative bg-muted-350/75 rounded-md border border-muted-150/20">
          <div className="w-[120px] h-1.5 left-[20px] top-[7.50px] absolute bg-muted-250/70 rounded-md" />
        </div>
        <div className="w-[103.50px] h-[21px] relative bg-muted-350/75 rounded-md border border-muted-150/20">
          <div className="w-[74.25px] h-1.5 left-[15px] top-[7.50px] absolute bg-muted-250/70 rounded-md" />
        </div>
      </div>
      <div className="h-[83px] flex-col justify-start items-center gap-4 flex">
        <div className="self-stretch text-center text-slate-700 text-2xl font-semibold">
          All clear, no new notifications
        </div>
        <div className="self-stretch text-center text-slate-500 text-base font-medium">
          You will be notified here when you receive a new update or reminder
        </div>
      </div>
    </div>
  );
}
