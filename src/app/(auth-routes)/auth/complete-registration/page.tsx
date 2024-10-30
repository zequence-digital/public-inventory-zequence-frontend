import { CompleteSignUpForm } from "@/components/form/complete-reg-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Complete Sign Up",
  description:
    "Complete your sign up process to access the Inventory Management System.",
  keywords: [
    "Inventory Management System",
    "Inventory",
    "Management",
    "System",
    "Zequence",
    "Digital",
    "Complete",
    "Sign Up",
  ],
};
const CompleteRegistrationPage = () => {
  return <CompleteSignUpForm />;
};

export default CompleteRegistrationPage;
