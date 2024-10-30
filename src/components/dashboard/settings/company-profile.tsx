type Props = {};
export const CompanyProfile = ({}: Props) => {
  return (
    <>
      <div className="h-[52px] flex items-center justify-between">
        <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
          <div className="self-stretch text-slate-700 text-lg font-semibold leading-7">
            Company’s info
          </div>
          <div className="self-stretch text-slate-500 text-sm font-normal leading-tight">
            Update your photo and personal details here.
          </div>
        </div>
        <div className="justify-start items-center gap-3 flex">
          <div className="rounded-lg cursor-pointer justify-start items-start flex">
            <div className="px-4 py-2.5 bg-white rounded-lg shadow border border-slate-300 justify-center items-center gap-2 flex">
              <div className="text-slate-700 text-sm font-semibold leading-tight">
                Cancel
              </div>
            </div>
          </div>
          <div className="rounded-lg cursor-pointer justify-start items-start flex">
            <div className="px-4 py-2.5 bg-primary-100 rounded-lg shadow border border-primary-100 justify-center items-center gap-2 flex">
              <div className="text-white text-sm font-semibold leading-tight">
                Save
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-px mt-4 bg-muted-600" />
    </>
  );
};
