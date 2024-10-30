import { Metadata } from "next";
import { SignUpForm } from "@/components/form/sign-up-form";

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
const SignUp = () => {
  return <SignUpForm />;
};

export default SignUp;
