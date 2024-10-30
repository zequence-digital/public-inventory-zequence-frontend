import { CustomImage } from "@/components/custom-image/custom-image";

export function UserTestimonial() {
  return (
    <div className=" flex-col max-w-lg justify-start items-start gap-8 inline-flex">
      <div className="self-stretch text-black text-xl font-medium leading-7">
        &quot;This system revolutionized our inventory management. We&apos;ve
        cut costs by 30% and improved efficiency by 50%.&quot;
      </div>
      <div className="justify-start items-center gap-5 inline-flex">
        <CustomImage
          src="/images/basket.jpg"
          className=" border border-gray-500 w-[56px] h-[56px] rounded-full"
          alt="User Testimonial"
        />
        <div className="flex-col justify-start items-start inline-flex">
          <div className="text-black text-base font-semibold leading-normal">
            Jane Doe
          </div>
          <div className="text-black text-base font-normal leading-normal">
            CEO, XYZ Corp.
          </div>
        </div>
        <div className="w-[61px] h-[0px] origin-top-left rotate-90 border border-muted-900"></div>
      </div>
    </div>
  );
}
