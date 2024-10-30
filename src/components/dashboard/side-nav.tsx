"use client";

import NavLinks from "@/components/dashboard/nav-links";
import { SubLinks } from "./sub-links";
import { UserMenu } from "../user-menu/user-menu";

export function SideNav() {
  return (
    <aside className="flex md:w-64 w-fit h-full flex-col px-3 py-4 md:pt-10 pt-0 md:px-2">
      <div>
        <UserMenu />

        <NavLinks />
      </div>
      <div className=" md:h-full w-full md:items-end md:mt-auto flex">
        <SubLinks />
      </div>
    </aside>
  );
}
