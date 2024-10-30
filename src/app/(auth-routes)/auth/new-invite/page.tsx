import { NewInviteeSignUpForm } from "@/components/form/new-invitee-signup-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Invitee Sign Up",
  description:
    "Complete the new invitee sign up form to get started with Zequence Inventory Management system.",
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
const NewInviteeSignupPage = () => {
  return <NewInviteeSignUpForm />;
};

export default NewInviteeSignupPage;
