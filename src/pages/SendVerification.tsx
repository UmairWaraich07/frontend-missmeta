type E164Number = string;
import PhoneInput from "react-phone-number-input";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "react-phone-number-input/style.css";
import { useSendVerificationCode } from "@/tanstack/verificationQueries";
import { RootState } from "@/store/store";

const SendVerification = () => {
  const [value, setValue] = useState<E164Number | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { authStatus, userData } = useSelector(
    (state: RootState) => state.auth
  );
  const sendVerificationCode = useSendVerificationCode();

  const handleVerification = async () => {
    if (value) {
      setIsLoading(true);
      const response = await sendVerificationCode.mutateAsync(value);
      console.log("response", response);

      if (response?.success) {
        console.log("OTP Has been sent", response);
        navigate("otp", {
          state: { phone: value },
        });
      }

      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!authStatus) {
      navigate("..");
    }
    if (userData?.phoneVerified) {
      navigate("..");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h4 className="text-dark font-inter font-medium">
        For registeration, we need to verify your phone number
      </h4>
      <div className="flex items-center justify-center mt-3">
        <PhoneInput
          international
          countryCallingCodeEditable={false}
          defaultCountry="US"
          value={value}
          onChange={setValue}
          // className="p-1 border border-light/20 rounded"
        />
      </div>

      {sendVerificationCode.isError && (
        <div className="text-red-600">
          An error occurred: {sendVerificationCode.error.message}
        </div>
      )}

      <Button
        className="mt-6"
        disabled={isLoading}
        onClick={handleVerification}
      >
        {" "}
        Send Verification Code{" "}
      </Button>
    </div>
  );
};

export default SendVerification;
