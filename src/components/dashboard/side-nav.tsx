"use client";

import NavLinks from "@/components/dashboard/nav-links";
import { SubLinks } from "./sub-links";
import { UserMenu } from "../user-menu/user-menu";
import { useMediaQuery } from "usehooks-ts";

export function SideNav() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <>
      {isMobile ? (
        <div className="h-fit fixed top-0 w-full bg-gray-50 shadow-lg z-50">
          <UserMenu />
          <div className="flex items-start justify-between">
            <NavLinks />
            <SubLinks />
          </div>
        </div>
      ) : (
        <aside className="flex md:w-64 w-fit h-full flex-col px-3 py-4 md:pt-10 pt-0 md:px-2">
          <>
            <UserMenu />

            <NavLinks />
          </>
          <div className=" md:h-full w-full md:items-end md:mt-auto flex">
            <SubLinks />
          </div>
        </aside>
      )}
    </>
  );
}
