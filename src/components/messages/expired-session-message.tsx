"use client";

import { logOut } from "@/services/auth";
import SubmitButton from "../form/components/submit-button";

export function ExpiredSessionMessage() {
  return (
    <div>
      <p>Your session has expired. Please log in again.</p>
      <SubmitButton
        className="mt-4 bg-primary-100 w-full hover:bg-primary-100/80 "
        onClick={logOut}
        label="Log in"
      />
    </div>
  );
}
