"use client";

import { Welcome } from "../dashboard/welcome";

export function TopBar() {
  return (
    <div className="sticky top-0 right-0 left-0 shrink-0 px-6 py-[16px] bg-white flex shadow-md border-b border-secondary-650 z-50 w-full justify-between items-center">
      <Welcome />
    </div>
  );
}
