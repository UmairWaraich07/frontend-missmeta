import { Logo } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const BeforeRegister = () => {
  return (
    <div className="w-full grid place-content-center min-h-screen p-6">
      <div className=" w-[600px] max-sm:w-full">
        <div className="w-full flex items-center justify-center ">
          <Logo />
        </div>
        <div className="text-dark text-3xl font-bold text-center">
          Choose how you want to register
        </div>
        {/* <p className="text-gray dark:text-light/80 font-inter mt-2 text-center">
          Welcome back! Please enter your details
        </p> */}
        <div className="flex items-center justify-center gap-6 mt-8 max-sm:flex-col">
          <div className="text-center p-4 border rounded-lg border-gray/20 shadow-sm w-[250px]">
            <h4 className="text-lg font-semibold">Register as a Voter</h4>
            <p className="text-sm text-gray font-inter mt-2">
              Engage with contestants and participate in voting
            </p>

            <Link to={`/register?role=voter`}>
              <Button className="w-full mt-5">Register</Button>
            </Link>
          </div>
          <div className="text-center p-4 border rounded-lg border-gray/20 shadow-sm w-[250px]">
            <h4 className="text-lg font-semibold">Register as a Contestant</h4>
            <p className="text-sm text-gray font-inter mt-2">
              Be an influencer and share your moments
            </p>

            <Link to={`/register?role=contestant`}>
              <Button className="w-full mt-5">Register</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeforeRegister;
