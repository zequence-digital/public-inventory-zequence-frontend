"use client";

import { Google } from "@/assets";
import SubmitButton from "@/components/form/components/submit-button";
import { cn } from "@/lib/utils";
import { useGoogleOAuthLogin } from "@/services/auth";
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
  const { mutate: googleLogin } = useGoogleOAuthLogin();
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
        <div className="w-full mt-6">
          <GoogleLogin
            onSuccess={onSuccess}
            onError={onError}
            text="signin_with"
          />
        </div>
      ) : (
        <div className="relative w-full">
          <SubmitButton
            labelClassName="text-gray-900 font-normal text-sm"
            onClick={socialActionFn}
            label={isSocialPending ? "Loading..." : socialLabel}
            className={cn(
              `w-full flex border bg-white border-gray-400 hover:bg-slate-50 transition-colors duration-300 ease-in-out`,
              className,
            )}
          >
            <div className=" absolute left-3">
              <Image src={Google} width={18} height={18} alt="google" />
            </div>
          </SubmitButton>
        </div>
      )}
    </>
  );
};
