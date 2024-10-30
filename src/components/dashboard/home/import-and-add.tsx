import { Add, Import } from "@/assets";

import CustomButton from "../custom-button";

const ImportAndAdd = () => {
  return (
    <div className="flex shrink-0 md:mt-0 mt-4 items-center gap-4">
      <CustomButton
        src={Import}
        width={10}
        height={10}
        imageClassName="w-4"
        alt="import"
        label="Import"
        className=" border-slate-300 bg-white hover:bg-gray-50/90 text-slate-700 hover:text-gray-800"
      />
      <CustomButton
        imageClassName="w-4"
        width={10}
        height={10}
        src={Add}
        alt="add"
        label="Add"
        className="bg-primary-100 text-white border-primary-100 hover:bg-primary-100/90"
      />
    </div>
  );
};

export default ImportAndAdd;
