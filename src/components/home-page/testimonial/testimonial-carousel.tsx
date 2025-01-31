"use client";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import * as React from "react";

import { UserTestimonial } from "./user-testimonial";

export function TestimonialCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="w-full mt-16 pb-2">
      <Carousel
        // plugins={[
        //   Autoplay({
        //     delay: 2000,
        //     stopOnMouseEnter: true,
        //     stopOnInteraction: false,
        //   }),
        // ]}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent className=" max-w-lg w-full">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem className="px-8 w-full" key={index}>
              <UserTestimonial />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex items-center justify-between gap-2 pt-16">
          <div className="py-2 text-center text-sm text-muted-foreground">
            {Array.from({ length: count }).map((_, index) => (
              <span
                key={index}
                className={cn(
                  "inline-block w-2 h-2 rounded-full bg-muted-900 mx-1",
                  {
                    " bg-muted-500": index === current - 1,
                  },
                )}
              />
            ))}
          </div>
          <div className="flex items-center gap-8">
            <button
              disabled={current === 1}
              className="size-8 rounded-full flex items-center justify-center bg-gray-100"
              onClick={() => {
                if (api) {
                  api.scrollPrev();
                }
              }}
            >
              <ArrowLeftIcon className="size-4" />
              <span className="sr-only">Previous slide</span>
            </button>
            <button
              disabled={current === count}
              className="size-8 rounded-full flex items-center justify-center bg-gray-100"
              onClick={() => {
                if (api) {
                  api.scrollNext();
                }
              }}
            >
              <ArrowLeftIcon className="size-4 transform rotate-180" />
              <span className="sr-only">Next slide</span>
            </button>
          </div>
        </div>
      </Carousel>
    </div>
  );
}
