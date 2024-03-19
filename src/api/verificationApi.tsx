import api from "./api";

const sendVerificationCode = async (phoneNumber: string) => {
  console.log("INSIDE SEND VERIFY CODE", phoneNumber);
  try {
    const response = await api.post(
      `/verification/send-otp`,
      {
        phoneNumber: phoneNumber,
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

const verifyOtp = async (otpCode: string) => {
  try {
    const response = await api.post(
      `/verification/verify-otp`,
      {
        otpCode: otpCode,
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
