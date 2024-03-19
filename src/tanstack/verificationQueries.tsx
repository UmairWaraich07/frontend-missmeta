import { sendVerificationCode, verifyOtp } from "@/api/verificationApi";
import { useMutation } from "@tanstack/react-query";

export const useSendVerificationCode = () => {
  return useMutation({
    mutationFn: (phone: string) => sendVerificationCode(phone),
  });
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: (otpCode: string) => verifyOtp(otpCode),
  });
};
