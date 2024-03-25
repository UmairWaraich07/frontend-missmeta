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
    <section className="min-h-screen flex flex-col items-center justify-center bg-light-800 p-6">
      <div className="shadow-md rounded-lg px-12 py-14 max-sm:px-8 max-sm:py-10 bg-white">
        <h4 className="base-medium text-center">
          To continue, we need to verify your phone number
        </h4>
        <div className="flex items-center justify-center mt-10">
          <PhoneInput
            international
            countryCallingCodeEditable={false}
            defaultCountry="US"
            value={value}
            onChange={setValue}
            className="py-1 px-4 border-[1.5px] rounded border-gray/40"
          />
        </div>

        {sendVerificationCode.isError && (
          <div className="text-red">
            An error occurred: {sendVerificationCode.error.message}
          </div>
        )}

        <Button
          className="mt-6 primary-gradient w-full !text-light-900 gap-1.5"
          disabled={isLoading}
          onClick={handleVerification}
        >
          {" "}
          Send Verification Code{" "}
        </Button>
      </div>
    </section>
  );
};

export default SendVerification;
