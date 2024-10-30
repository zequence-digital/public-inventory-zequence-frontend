import ContinueSignUpForm from "@/components/form/continue-sign-up";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description:
    "Sign up for an account to access the Inventory Management System.",
  keywords: [
    "Inventory Management System",
    "Inventory",
    "Management",
    "System",
    "Zequence",
    "Digital",
    "Sign Up",
  ],
};
const ContinueSignUp = () => {
  return <ContinueSignUpForm />;
};

export default ContinueSignUp;
