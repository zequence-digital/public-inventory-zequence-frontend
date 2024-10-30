import { OverviewCardSkeleton } from "../skeleton/overview-card-skeleton";

type TCardProps = {
  isPending: boolean;
  title: string;
  totalItems: number;
  inStock: number;
  runningOut: number;
  outOfStock: number;
};
export function OverviewCard({
  isPending,
  title,
  totalItems,
  inStock,
  runningOut,
  outOfStock,
}: TCardProps) {
  if (isPending) {
    return <OverviewCardSkeleton />;
  }

  return (
    <div className="w-full h-[206px] p-6 bg-white rounded-lg shadow border border-gray-200 flex-col justify-start items-start gap-6 inline-flex">
      <div className="self-stretch h-6 flex-col justify-center items-start gap-2 flex">
        <div className="self-stretch text-slate-700 text-base font-semibold leading-normal">
          {title}
        </div>
      </div>
      <div className="self-stretch justify-start items-end gap-4 inline-flex">
        <div className="grow shrink basis-0 flex-col justify-start items-start gap-4 inline-flex">
          <div className="self-stretch text-slate-900 text-4xl font-semibold leading-[44px]">
            {totalItems}
          </div>
        </div>
      </div>
      <div className="flex-col justify-start items-start gap-4 flex">
        <div className="justify-start items-center gap-2 inline-flex w-full">
          <div className="max-w-[100px] w-full h-2 p-0.5 bg-emerald-700 rounded" />
          <div className="max-w-40 w-full h-2 p-0.5 bg-amber-500 rounded" />
          <div className="max-w-[130px] w-full h-2 p-0.5 bg-red-700 rounded" />
        </div>
        <div className="justify-start items-start gap-4 inline-flex">
          <div className="h-[18px] justify-start items-center gap-2 flex">
            <div className="p-0.5 bg-emerald-100 rounded-[50px] justify-start items-center gap-2.5 flex">
              <div className="w-2 h-2 bg-emerald-700 rounded-full" />
            </div>
            <div className="justify-start items-center gap-2 flex">
              <div className="text-center text-slate-700 text-xs font-normal   leading-[18px]">
                In stock:
              </div>
              <div className="text-center text-slate-900 text-xs font-normal   leading-[18px]">
                {inStock}
              </div>
            </div>
          </div>
          <div className="justify-start items-center gap-2 flex">
            <div className="p-0.5 bg-amber-100 rounded-[50px] justify-start items-center gap-2.5 flex">
              <div className="w-2 h-2 bg-amber-500 rounded-full" />
            </div>
            <div className="justify-start items-center gap-2 flex">
              <div className="text-center text-slate-700 text-xs font-normal   leading-[18px]">
                Running out:
              </div>
              <div className="text-center text-slate-900 text-xs font-normal   leading-[18px]">
                {runningOut}
              </div>
            </div>
          </div>
          <div className="justify-start items-center gap-2 flex">
            <div className="p-0.5 bg-red-100 rounded-[50px] justify-start items-center gap-2.5 flex">
              <div className="w-2 h-2 bg-red-700 rounded-full" />
            </div>
            <div className="justify-start items-center gap-2 flex">
              <div className="text-center text-slate-700 text-xs font-normal   leading-[18px]">
                Out of stock:
              </div>
              <div className="text-center text-slate-900 text-xs font-normal   leading-[18px]">
                {outOfStock}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
