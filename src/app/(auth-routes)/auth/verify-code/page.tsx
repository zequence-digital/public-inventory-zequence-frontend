import VerifyCodeForm from "@/components/form/verify-code-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Code",
  description: "Verify your account to access the Inventory Management System.",
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
const VerifyCode = () => {
  return <VerifyCodeForm />;
};

export default VerifyCode;
