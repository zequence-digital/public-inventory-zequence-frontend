import { TestimonialCarousel } from "../testimonial/testimonial-carousel";

export function SuccessStory() {
  return (
    <section className=" flex flex-col max-w-[1200px] w-full px-4  justify-center items-start mx-auto mt-20">
      <div className="max-w-[650px] w-full text-black lg:text-5xl md:text-4xl text-2xl font-bold lg:leading-[57.60px] ">
        <>
          <h3>
            Real success stories from satisfied customers{" "}
            <picture>
              <img
                className="object-cover inline"
                src="/images/story.svg"
                alt="Success Story"
              />
            </picture>
          </h3>
        </>
      </div>
      <TestimonialCarousel />
    </section>
  );
}
