/**
 * Login page.
 * This is the page that will be shown when the user is not authenticated.
 * It will display a login form to the user.
 *
 * @returns {JSX.Element}
 */

import { Metadata } from "next";
import LoginForm from "@/components/form/login-form";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Login to your account to access the Inventory Management System.",
  keywords: [
    "Inventory Management System",
    "Inventory",
    "Management",
    "System",
    "Zequence",
    "Digital",
    "Login",
  ],
};
const Login = () => {
  return <LoginForm />;
};

export default Login;
