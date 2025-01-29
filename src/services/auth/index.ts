import { useLocalStorage } from "@/hooks/use-local-storage";
import { defaultLoginPage } from "@/routes";
import type { LoginResponse } from "@/types";
import type {
  AuthResponse,
  CompleteSignUpData,
  ContinueSignUpData,
  LoginData,
  NewInviteeSignupData,
  OAuthResponse,
  OAuthSignUpData,
  ResendCode,
  ResetPasswordData,
  SendEmailForgotPasswordData,
  SignUpData,
  VerifyOtp,
} from "@/types/auth";
import { setToLocalStorage, tokenKey, user } from "@/utils";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { apiClient } from "../api";
import authKeys from "./auth-keys";

export function useLogin(
  redirectTo?: string,
  className?: string,
  options?: UseMutationOptions<LoginResponse, AxiosError, LoginData, unknown>,
) {
  const [, setActiveUser] = useLocalStorage(user, "");
  const login = useMutation({
    mutationFn: async (data: LoginData): Promise<LoginResponse> => {
      const response = await apiClient.post({
        url: `/user/login`,
        body: data,
        auth: false,
      });

      return response as LoginResponse;
    },

    mutationKey: [authKeys.create],
    onSuccess(data) {
      if (data.success) {
        setToLocalStorage(tokenKey, data.data.credentials.accessToken);
        // setToLocalStorage(user, encrypt(JSON.stringify(data)));
        setActiveUser(JSON.stringify(data));

        const hiddenClass = className
          ? document.querySelector(className)
          : null;

        if (hiddenClass) {
          hiddenClass.classList.add("hidden");
        }

        toast.success(data.message);
        window.location.href = redirectTo ?? defaultLoginPage;
      }

      if (!data.success) {
        toast.error(data.message);
      }
    },
    ...options,
  });

  return login;
}

export function useSignUp(
  options?: UseMutationOptions<AuthResponse, AxiosError, SignUpData, unknown>,
) {
  const router = useRouter();
  const signUp = useMutation({
    mutationFn: async (data: SignUpData) => {
      const response = await apiClient.post({
        url: `/auth/signup/init`,
        body: data,
        auth: false,
      });

      return response;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);

        router.push("/auth/verify-code");
      }

      if (!data.success) {
        toast.error(data.message);
      }
    },
    ...options,
  });

  return signUp;
}

// Google Sign Up
export function useGoogleSignUp(
  options?: UseMutationOptions<
    OAuthResponse,
    AxiosError,
    OAuthSignUpData,
    unknown
  >,
) {
  const router = useRouter();
  const signUp = useMutation({
    mutationFn: async (data: OAuthSignUpData) => {
      const response = await apiClient.post({
        url: `/auth/oauth/authorization/initiate`,
        body: data,
        auth: false,
      });

      return response as OAuthResponse;
    },
    onSuccess: (data) => {
      if (data.success) {
        router.push(data.data);
      }
      if (!data.success) {
        toast.error(data.message);
      }
    },
    ...options,
  });

  return signUp;
}

// Send Email OTP for Reset Password
export function useSendEmailOptForResetPassword(
  ref: React.MutableRefObject<HTMLFormElement | null>,
  setIsOpen?: (value: boolean) => void,
  options?: UseMutationOptions<
    AuthResponse,
    AxiosError,
    SendEmailForgotPasswordData,
    unknown
  >,
) {
  const signUp = useMutation({
    mutationFn: async (data: SendEmailForgotPasswordData) => {
      const response = await apiClient.post({
        url: `/generic/send-otp`,
        body: data,
        auth: false,
      });

      return response;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        if (ref.current) {
          ref.current.reset();
        }
        if (setIsOpen) {
          setIsOpen(true);
        }
      }

      if (!data.success) {
        toast.error(data.message);
      }
    },
    ...options,
  });

  return signUp;
}

// Reset Password
export function useResetPassword(
  options?: UseMutationOptions<
    AuthResponse,
    AxiosError,
    ResetPasswordData,
    unknown
  >,
) {
  const router = useRouter();
  const signUp = useMutation({
    mutationFn: async (data: ResetPasswordData) => {
      const response = await apiClient.post({
        url: `/user/password/reset`,
        body: data,
        auth: false,
      });

      return response;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        router.push("/auth/login");
      }

      if (!data.success) {
        toast.error(data.message);
      }
    },
    ...options,
  });

  return signUp;
}

// Continue Sign Up
export function useContinueSignUp(
  options?: UseMutationOptions<
    AuthResponse,
    AxiosError,
    ContinueSignUpData,
    unknown
  >,
) {
  const router = useRouter();
  const signUp = useMutation({
    mutationFn: async (data: ContinueSignUpData) => {
      const response = await apiClient.post({
        url: `/user/register`,
        body: data,
        auth: false,
      });

      return response;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        router.push("/auth/complete-registration");
      }

      if (!data.success) {
        toast.error(data.message);
      }
    },
    ...options,
  });

  return signUp;
}

export function useCompleteRegistration(
  options?: UseMutationOptions<
    AuthResponse,
    AxiosError,
    CompleteSignUpData,
    unknown
  >,
) {
  const router = useRouter();
  const [, , removeEmail] = useLocalStorage("email", "");
  const complete = useMutation({
    mutationFn: async (data: CompleteSignUpData) => {
      const response = await apiClient.post({
        url: `/user/profile`,
        body: data,
        auth: false,
      });

      return response;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        router.push("/auth/login");
        removeEmail();
      }

      if (!data.success) {
        toast.error(data.message);
      }
    },
    ...options,
  });

  return complete;
}

export function useVerifyOTP(
  options?: UseMutationOptions<AuthResponse, AxiosError, VerifyOtp, unknown>,
) {
  const router = useRouter();
  const verifyOTP = useMutation({
    mutationFn: async (data: VerifyOtp) => {
      const response = await apiClient.post({
        url: `/auth/signup/email-confirmation`,
        body: data,
        auth: false,
      });
      return response;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);

        router.push("/auth/sign-up/continue");
      }

      if (!data.success) {
        toast.error(data.message);
      }
    },
    ...options,
  });

  return verifyOTP;
}

export function useResendOTP(
  options?: UseMutationOptions<AuthResponse, AxiosError, ResendCode, unknown>,
) {
  const router = useRouter();
  const resendOTP = useMutation({
    mutationFn: async (data: ResendCode) => {
      const response = await apiClient.post({
        url: `/auth/resend-otp`,
        body: data,
        auth: false,
      });
      return response;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        router.push("/auth/verify-code");
      }

      if (!data.success) {
        toast.error(data.message);
      }
    },

    ...options,
  });

  return resendOTP;
}

// /user/invitee/signup

export function useInviteeSignUp(
  options?: UseMutationOptions<
    AuthResponse,
    AxiosError,
    NewInviteeSignupData,
    unknown
  >,
) {
  const router = useRouter();
  const inviteeSignUp = useMutation({
    mutationFn: async (data: NewInviteeSignupData) => {
      const response = await apiClient.post({
        url: `/user/invitee/signup`,
        body: data,
        auth: false,
      });
      return response;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        router.push("/auth/login");
      }

      if (!data.success) {
        toast.error(data.message);
      }
    },

    ...options,
  });

  return inviteeSignUp;
}

export function logOut() {
  try {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(user);
    window.location.href = "/auth/login";
  } catch (error) {
    return null;
  }
}
