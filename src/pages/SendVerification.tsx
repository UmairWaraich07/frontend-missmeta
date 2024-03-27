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
  const [phone, setPhone] = useState<E164Number | undefined>();
  const navigate = useNavigate();
  const { authStatus, userData } = useSelector(
    (state: RootState) => state.auth
  );
  const sendVerificationCode = useSendVerificationCode();

  const handleVerification = async (channel: string) => {
    if (!phone) return;

    const response = await sendVerificationCode.mutateAsync({
      phone,
      channel,
    });
    console.log("response", response);

    if (response?.success) {
      console.log("OTP Has been sent", response);
      navigate("otp", {
        state: { phone: phone },
      });
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
            value={phone}
            onChange={setPhone}
            className="py-1 px-4 border-[1.5px] rounded border-gray/40"
          />
        </div>

        {sendVerificationCode.isError && (
          <div className="text-red">
            An error occurred: {sendVerificationCode.error.message}
          </div>
        )}

        <div className="mt-6 flex-center gap-4 max-sm:gap-2">
          <Button
            className="primary-gradient !text-light-900 gap-1.5"
            disabled={sendVerificationCode.isPending}
            onClick={() => handleVerification("sms")}
          >
            {" "}
            Send code via SMS
          </Button>

          <Button
            className="primary-text-gradient font-semibold text-base max-sm:text-sm"
            disabled={sendVerificationCode.isPending}
            onClick={() => handleVerification("whatsapp")}
          >
            {" "}
            Send code via Whatsapp
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SendVerification;
