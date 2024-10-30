const OrDivider = () => {
  return (
    <div className="w-full h-5 pt-6 justify-start items-center gap-2 inline-flex">
      <div className="grow shrink basis-0 h-px bg-gray-200" />
      <div
        className={`text-center text-slate-500 text-sm font-normal   leading-tight`}
      >
        OR
      </div>
      <div className="grow shrink basis-0 h-px bg-gray-200" />
    </div>
  );
};

export default OrDivider;
