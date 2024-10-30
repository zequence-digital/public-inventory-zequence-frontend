import { TestimonialCarousel } from "../testimonial/testimonial-carousel";

export function SuccessStory() {
  return (
    <section className=" flex flex-col max-w-[1200px] w-full px-4  justify-center items-start mx-auto mt-20">
      <div className="max-w-[650px] w-full text-black lg:text-5xl md:text-4xl text-2xl font-bold lg:leading-[57.60px] ">
        <div>
          Real success stories from satisfied customers
          <div>
            <picture>
              <img
                className=" flex max-sm:flex-col justify-end lg:ml-[29rem] md:ml-[12rem] sm:ml-[32rem] sm:-mt-9 mt-2 object-cover"
                src="/images/story.svg"
                alt="Success Story"
              />
            </picture>
          </div>
        </div>
      </div>
      <TestimonialCarousel />
    </section>
  );
}
