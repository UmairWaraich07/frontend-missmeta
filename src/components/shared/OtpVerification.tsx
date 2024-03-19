import { useUpdatePhoneVerification } from "@/tanstack/userQueries";
import { useVerifyOtp } from "@/tanstack/verificationQueries";
import { useState, useRef, ChangeEvent, KeyboardEvent, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const phone = location.state?.phone;
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setisLoading] = useState(false);
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
    setisLoading(true);
    try {
      const response = await verifyOtp.mutateAsync(otp.join(""));
      console.log("handle OTP", response);

      if (response?.success) {
        console.log("OTP verified");
        const response = await updatePhoneVerification.mutateAsync(phone);

        console.log("UPDATE PHONE :", response?.data);

        if (response?.data.phoneVerified) {
          console.log("User phone number verified successfully");

          response.data.role === "voter"
            ? navigate("/", { replace: true })
            : navigate("/payment", { replace: true });
        } else {
          // navigate("..");
          setisLoading(false);
        }
      } else {
        setisLoading(false);
        throw new Error("Otp verification failed");
      }
    } catch (error) {
      console.log(`Error while handling otp,  ${error}`);
      setOtp(["", "", "", "", "", ""]);
      setisLoading(false);
      throw new Error("Otp verification failed");
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 py-6 mt-10">
      <h2 className="text-center text-2xl font-bold mb-4">OTP Verification</h2>
      <div className="flex justify-center items-center">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={inputRefs[index]}
            type="text"
            className="w-10 h-10 text-center text-3xl border border-gray-300 rounded mx-1 focus:outline-none focus:border-blue-500"
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
      <p className="text-sm text-gray-500 mt-2">
        Enter the 6-digit OTP sent to your mobile number.
      </p>

      {verifyOtp.isError && (
        <div className="text-red-600">
          An error occurred: {verifyOtp.error.message}
        </div>
      )}
      {updatePhoneVerification.isError && (
        <div className="text-red-600">
          An error occurred: {updatePhoneVerification.error.message}
        </div>
      )}

      <button
        onClick={handleOtp}
        type="submit"
        disabled={isLoading}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Verify OTP
      </button>
    </div>
  );
};

export default OtpVerification;
