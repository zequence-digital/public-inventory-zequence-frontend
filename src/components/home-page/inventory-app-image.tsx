import Image from "next/image";

import crown from "/public/images/crown.svg";

export function InventoryAppImage() {
  return (
    <div className="flex lg:w-[80%] md:px-8 px-4 w-[90%] justify-center items-center mt-20 mx-auto relative">
      <div className="absolute -top-[22px] left-[173px]">
        <Image src={crown} alt="Crown" width={45} height={40} />
      </div>

      <div className="absolute -top-[22px] right-[144px]">
        <Image
          className=" rotate-45"
          src={crown}
          alt="Crown"
          width={45}
          height={40}
        />
      </div>

      <picture>
        <img
          className=" h-auto"
          src="/images/inventory-app-sample.svg"
          alt="Inventory App Image"
        />
      </picture>
    </div>
  );
}
