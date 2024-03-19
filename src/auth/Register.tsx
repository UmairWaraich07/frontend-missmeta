import { Logo } from "@/components/shared";
import VoterRegisterForm from "./Form/VoterRegisterForm";
import ContestantRegisterForm from "./Form/ContestantRegisterForm";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const Register = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const role = searchParams.get("role");

  useEffect(() => {
    if (!role?.trim()) {
      console.log("No role provided in URL parameter.");
      return navigate("/registerchoice", { replace: true });
    }

    if (!(role === "voter") && !(role === "contestant")) {
      return navigate("/registerchoice", { replace: true });
    }
  }, [navigate, role]);

  console.log(role);

  return (
    <div className="w-full grid place-content-center min-h-screen p-6 font-manrope">
      <div className=" w-[450px] max-sm:w-full">
        <div className="w-full flex items-center justify-center ">
          <Logo />
        </div>
        <div className="text-dark text-3xl font-bold text-center">
          Create a {role} account
        </div>
        <p className="text-gray mt-2 font-inter text-center">
          To use Miss Meta Universe as a {role}, Please enter your details
        </p>

        {role === "voter" ? (
          <VoterRegisterForm role={role} />
        ) : role === "contestant" ? (
          <ContestantRegisterForm role={role} />
        ) : null}
      </div>
    </div>
  );
};

export default Register;
