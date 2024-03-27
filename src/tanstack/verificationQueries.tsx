import { sendVerificationCode, verifyOtp } from "@/api/verificationApi";
import { ICodeVerification, IPhoneVerification } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useSendVerificationCode = () => {
  return useMutation({
    mutationFn: ({ phone, channel }: IPhoneVerification) =>
      sendVerificationCode({ phone, channel }),
  });
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: ({ phone, otpCode }: ICodeVerification) =>
      verifyOtp({ phone, otpCode }),
  });
};
