import { ICodeVerification, IPhoneVerification } from "@/types";
import api from "./api";

const sendVerificationCode = async ({ phone, channel }: IPhoneVerification) => {
  console.log("INSIDE SEND VERIFY CODE", phone);
  try {
    const response = await api.post(
      `/api/v1/verifications/send-otp`,
      {
        phone: phone,
        channel: channel,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log(`Error while sending verifcation code`);
  }
};

const verifyOtp = async ({ otpCode, phone }: ICodeVerification) => {
  try {
    const response = await api.post(
      `/api/v1/verifications/verify-otp`,
      {
        otpCode: otpCode,
        phone: phone,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log(`Error while verifying the otp code`);
  }
};

export { sendVerificationCode, verifyOtp };
