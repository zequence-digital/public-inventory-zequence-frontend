"use client";

import { Google } from "@/assets";
import SubmitButton from "@/components/form/components/submit-button";
import { useGoogleRedirect } from "@/hooks/use-google-redirect";
import { cn } from "@/lib/utils";
import { useGoogleLogin } from "@/services/auth";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import { toast } from "react-toastify";

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
  const { pathname } = useGoogleRedirect("/dashboard/overview");
  const { mutate: googleLogin } = useGoogleLogin();
  const onSuccess = (credentialResponse: CredentialResponse) => {
    const { credential } = credentialResponse;
    if (!credential) {
      return;
    }

    const decoded = jwtDecode(credential) as { email: string };
    googleLogin({ email: decoded.email });
  };

  const onError = () => {
    toast.error("An error occurred while trying to sign in with Google");
  };
  return (
    <>
      {isGoogleLogin ? (
        <div className="w-full mt-6 [&_svg]:hidden relative">
          <GoogleLogin
            login_uri={pathname}
            onSuccess={onSuccess}
            onError={onError}
            text="signin_with"
          />
          <Image
            className="mr-4 absolute top-2 left-36"
            src={Google}
            alt="google"
          />
        </div>
      ) : (
        <SubmitButton
          onClick={socialActionFn}
          label={isSocialPending ? "Loading..." : socialLabel}
          className={cn(
            `w-full space-x-4 border bg-white text-black font-semibold border-gray-400 hover:bg-slate-50 transition-colors duration-300 ease-in-out`,
            className,
          )}
        >
          <Image className="mr-4" src={Google} alt="google" />
        </SubmitButton>
      )}
    </>
  );
};
