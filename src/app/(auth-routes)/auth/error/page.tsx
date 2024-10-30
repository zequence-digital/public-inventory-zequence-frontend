/**
 * Auth Error Page
 * This is the page that will be shown when an error occurs during the authentication process.
 * It will display an error message to the user.
 *
 * @returns {JSX.Element} - The Auth Error Page
 */

import { ErrorCard } from "@/components/auth/error-card";

const AuthErrorPage = () => {
  return <ErrorCard />;
};

export default AuthErrorPage;
