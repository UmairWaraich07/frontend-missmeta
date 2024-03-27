import { updateUserData } from "@/store/authSlice";
import { useUpdatePhoneVerification } from "@/tanstack/userQueries";
import { useVerifyOtp } from "@/tanstack/verificationQueries";
import { useState, useRef, ChangeEvent, KeyboardEvent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Logo } from "../components/shared";

const OtpVerification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const phone = location.state?.phone;
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const updatePhoneVerification = useUpdatePhoneVerification();
  const verifyOtp = useVerifyOtp();

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleInputChange = (index: number, value: string) => {
    // Update OTP array with the new value at the specified index
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input field if value is entered
    if (value && index < inputRefs.length - 1) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    // Move to the previous input field on backspace
    if (e.key === "Backspace" && index > 0 && !otp[index]) {
      inputRefs[index - 1].current?.focus();
    }
  };

  useEffect(() => {
    if (!location.state?.phone) {
      navigate("/verify");
    }
  }, [navigate]);

  const handleOtp = async () => {
    try {
      const response = await verifyOtp.mutateAsync({
        otpCode: otp.join(""),
        phone: location.state?.phone,
      });
      console.log("handle OTP", response);

      if (response?.success) {
        console.log("OTP verified");
        const response = await updatePhoneVerification.mutateAsync(phone);

        console.log("UPDATE PHONE :", response?.data);

        if (response?.data.phoneVerified) {
          console.log("User phone number verified successfully");

          // update the user state in the authSlice
          dispatch(updateUserData(response.data));
          response.data.role === "voter"
            ? navigate("/", { replace: true })
            : navigate("/payment", { replace: true });
        } else {
          navigate("..");
          throw new Error("Phone number updation failed");
        }
      } else {
        throw new Error("Otp verification failed");
      }
    } catch (error) {
      console.log(`Error while handling otp,  ${error}`);
      setOtp(["", "", "", "", "", ""]);
      throw new Error("Otp verification failed");
    }
  };

  return (
    <section className="min-h-screen flex flex-col gap-8 items-center justify-center bg-light-800 p-6">
      <Logo />
      <div className=" shadow-md rounded-lg px-12 py-14 max-sm:px-8 max-sm:py-10 bg-white">
        <h2 className="text-center text-3xl max-sm:text-2xl font-bold">
          Verify your phone number
        </h2>
        <p className="text-gray text-center mt-2 max-sm:text-sm">
          Enter the 6 digit OTP sent to your phone number.
        </p>
        <div className="flex justify-center items-center mt-10 gap-2 max-sm:gap-1">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="text"
              className="w-14 h-14 max-sm:w-10 max-sm:h-10 text-center text-3xl border-gray/30 border-[1.5px] rounded mx-1 focus:border-[1.5px] focus:outline-none focus:border-primary-500/50"
              value={digit}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange(index, e.target.value)
              }
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                handleKeyDown(index, e)
              }
              maxLength={1}
            />
          ))}
        </div>

        <p className="mt-4">
          Did not receive a code?{" "}
          <button className="text-primary-500 font-medium">Resend</button>
        </p>

        {verifyOtp.isError && (
          <div className="text-red mt-2">
            An error occurred: {verifyOtp.error.message}
          </div>
        )}
        {updatePhoneVerification.isError && (
          <div className="text-red mt-2">
            An error occurred: {updatePhoneVerification.error.message}
          </div>
        )}

        <Button
          onClick={handleOtp}
          type="submit"
          disabled={verifyOtp.isPending}
          className="mt-6 primary-gradient w-full !text-light-900 gap-1.5"
        >
          Verify OTP
        </Button>
        <p className="mt-4 text-red">Don't share the OTP with anyone!</p>
      </div>
    </section>
  );
};

export default OtpVerification;
