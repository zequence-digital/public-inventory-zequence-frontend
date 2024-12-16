import { BusinessProfileCard } from "./business-profile-card";
import { BusinessSizeCard } from "./business-size-card";
import flight from "/public/images/flight.svg";
import flower from "/public/images/flower.svg";
import love from "/public/images/love.svg";

export function InventoryNeeds() {
  return (
    <div
      id="resources"
      className="flex flex-col max-w-[1200px] w-full px-4  justify-center items-center mx-auto mt-20"
    >
      <div className="text-center text-black lg:text-5xl md:text-4xl mb-16 text-3xl font-bold">
        Covering all your inventories need
      </div>
      <div className=" grid grid-auto-fit-lg w-full gap-6">
        <BusinessSizeCard
          className=" bg-secondary-400 shrink-0 w-full"
          src={flight}
          alt="Flight"
          description="Designed for businesses of all sizes"
        />
        <BusinessProfileCard
          element={
            <div className="relative">
              <picture>
                <img
                  className=" rounded-b-3xl w-full object-cover"
                  src="/images/sales.svg"
                  alt="Sales"
                />
              </picture>
            </div>
          }
          title="Increase sales"
          description="Expand your business with our multi-channel system"
          href="#"
        />

        <BusinessSizeCard
          src={flower}
          alt="Flight"
          description="Goodbye to manual tracking"
          className=" bg-secondary-500 shrink-0 w-full"
        />
        <BusinessProfileCard
          element={
            <div className="relative">
              <picture>
                <img
                  className=" rounded-b-3xl w-full object-cover"
                  src="/images/products.svg"
                  alt="Expand your business"
                />
              </picture>
            </div>
          }
          title="Track your items"
          description="Expand your business with our multi-channel system"
          href="#"
        />
        <BusinessSizeCard
          src={love}
          alt="Flight"
          description="Your inventory, simplified"
          className=" bg-primary-200 shrink-0 w-full"
        />
        <BusinessProfileCard
          element={
            <div className="relative">
              <picture>
                <img
                  className=" rounded-b-3xl w-full object-cover"
                  src="/images/warehouse.svg"
                  alt="Warehouse management"
                />
              </picture>
            </div>
          }
          title="Warehouse management"
          description="Expand your business with our multi-channel system"
          href="#"
        />
      </div>
    </div>
  );
}
