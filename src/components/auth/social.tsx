"use client";

import { useOAuth } from "@/hooks/use-oauth";
import { GoogleLogin } from "@react-oauth/google";

type Props = {
  className?: string;
  socialLabel?: string;
  socialActionFn?: () => void;
  isSocialPending?: boolean;
  isGoogleLogin?: boolean;
};
export const Social = ({
  socialLabel = "Sign in with Google",
  isSocialPending,
  socialActionFn,
  className,
  isGoogleLogin,
}: Props) => {
  const { onSignInSuccess, onSignInError, onSignUpSuccess, onSignUpError } =
    useOAuth();
  return (
    <>
      {isGoogleLogin ? (
        <div className="w-full mt-6">
          <GoogleLogin
            onSuccess={onSignInSuccess}
            onError={onSignInError}
            text="signin_with"
          />
        </div>
      ) : (
        <div className="w-full mt-6">
          <GoogleLogin
            onSuccess={onSignUpSuccess}
            onError={onSignUpError}
            text="signup_with"
          />
        </div>
      )}
    </>
  );
};
