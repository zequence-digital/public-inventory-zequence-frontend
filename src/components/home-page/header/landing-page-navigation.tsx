"use client";

import { Cross1Icon, TextAlignJustifyIcon } from "@radix-ui/react-icons";
import { useReducer, useState } from "react";

import { LandingPageCta } from "./landing-page-cta";
import { LandingPageLinks } from "./landing-page-links";
import { Logo } from "../logo";
import { cn } from "@/lib/utils";

export function LandingPageNavigation() {
  const [open, dispatch] = useReducer((state: boolean) => !state, false);
  const [hashLocation, setHashLocation] = useState("");

  return (
    <header
      role="banner"
      className=" mb-10 shadow sticky bg-white top-0 left-0 z-50 h-16 lg:py-2 py-4"
    >
      <div className="flex justify-between items-center max-w-[1440px] w-full md:px-16  px-4 mx-auto">
        <div className="flex items-center gap-20 w-full">
          <Logo className=" shrink-0" />
          {open ? (
            <Cross1Icon
              onClick={dispatch}
              className=" lg:hidden text-black flex justify-end ml-auto size-5 cursor-pointer"
            />
          ) : (
            <TextAlignJustifyIcon
              onClick={dispatch}
              className=" lg:hidden text-black flex justify-end ml-auto size-8 cursor-pointer"
            />
          )}
          <div
            className={cn(
              `
                lg:flex lg:flex-row lg:gap-8 lg:justify-between justify-start flex lg:items-center items-start flex-col gap-6
                lg:w-full lg:relative absolute z-40 top-16 left-0 lg:top-0 bg-white w-full transition-all duration-300 ease-in-out mx-auto lg:px-0 py-8 lg:py-0 lg:translate-x-0 md:px-16  px-4 h-screen lg:h-fit

                
                `,
              {
                "-translate-x-[100vw]": !open,
                "translate-x-0": open,
              },
            )}
          >
            <LandingPageLinks
              setHashLocation={setHashLocation}
              hashLocation={hashLocation}
              dispatch={dispatch}
            />
            <LandingPageCta />
          </div>
          {/* Overlay */}

          <div
            onClick={dispatch}
            className={cn(
              `
                        lg:hidden absolute top-16 left-0 w-full min-h-screen z-30 bg-black/50
                        `,
              {
                hidden: !open,
              },
            )}
          />
        </div>
      </div>
    </header>
  );
}
