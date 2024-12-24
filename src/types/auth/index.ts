export type SignUpData = {
  email: string;
};

export type SendEmailForgotPasswordData = {
  emailAddress: string;
  otpType: string;
};

export type ResetPasswordData = {
  verificationCode: string;
  emailAddress: string;
  newPassword: string;
};

export type ContinueSignUpData = {
  emailAddress: string;
  username: string;
  password: string;
};

export type AuthResponse = {
  success: boolean;
  message: string;
};

export type FileUploadResponse = {
  success: boolean;
  message: string;
  data: {
    data: string;
  };
};

export type VerifyOtp = {
  emailAddress: string;
  verificationCode: string;
};

export type ResendCode = {
  emailAddress: string;
  action: "SIGNUP_EMAIL_VERIFICATION";
};

export type LoginData = {
  queryParam: string;
  password: string;
};

export type CompleteSignUpData = {
  emailAddress: string;
  fullName: string;
  mobileNumber: string;
  countryId: number;
  state: string;
  headOffice: string;
  lga?: string;
  userType: string;
  businessProfileRequest: {
    companyName: string;
    businessUserRole: string;
    companyLogoUrl: string;
  };
};

export type NewInviteeSignupData = {
  emailAddress: string;
  fullName: string;
  mobileNumber: string;
  countryId: number;
  state: string;
  lga?: string;
  imageLink: string;
  username: string;
  password: string;
};
