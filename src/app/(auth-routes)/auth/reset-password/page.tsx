import ResetPasswordForm from "@/components/form/reset-password-form";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset your password to access the Inventory Management System.",
  keywords: [
    "Inventory Management System",
    "Inventory",
    "Management",
    "System",
    "Zequence",
    "Digital",
    "Reset Password",
  ],
};
const ResetPassword = () => {
  return <ResetPasswordForm />;
};

export default ResetPassword;
