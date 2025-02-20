import { useGoogleOAuthLogin, useGoogleSignUp } from "@/services/auth";
import { type CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

import { useGoogleRedirect } from "./use-google-redirect";
import { useLocalStorage } from "./use-local-storage";

export function useOAuth() {
  const [, setEmail] = useLocalStorage("email", "");
  const { pathname } = useGoogleRedirect("/auth/complete-registration");
  const { mutate: googleSignUp } = useGoogleSignUp();
  const { mutate: googleLogin } = useGoogleOAuthLogin();

  // Google Sign In
  const onSignInSuccess = (credentialResponse: CredentialResponse) => {
    const { credential } = credentialResponse;
    if (!credential) {
      return;
    }

    const decoded = jwtDecode(credential) as { email: string };
    googleLogin({ email: decoded.email });
  };

  // Google Sign In Error
  const onSignInError = () => {
    toast.error("An error occurred while trying to sign in with Google");
  };

  // Sign up with Google
  const onSignUpSuccess = (credentialResponse: CredentialResponse) => {
    const { credential } = credentialResponse;
    if (!credential) {
      return;
    }

    const decoded = jwtDecode(credential) as { email: string };

    setEmail(decoded.email);

    googleSignUp({ profileRegistrationUrl: pathname ?? "" });
  };

  // Sign up with Google Error
  const onSignUpError = () => {
    toast.error("An error occurred while trying to sign up with Google");
  };

  return {
    onSignInSuccess,
    onSignInError,
    onSignUpSuccess,
    onSignUpError,
  };
}
