import { Logo } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { logout } from "@/store/authSlice";
import { RootState } from "@/store/store";
import { useStripeCheckoutSession } from "@/tanstack/stripeQueries";
import { useLogoutUser } from "@/tanstack/userQueries";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import tick from "../assets/tick-circle.svg";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutUser = useLogoutUser();

  const handleLogout = async () => {
    try {
      await logoutUser.mutateAsync();
      dispatch(logout());
      navigate("/", { replace: true });
    } catch (error) {
      console.log(`Error while logging out the user : ${error}`);
    }
  };
  return (
    <header
      className="flex-between background-light900_dark200 w-full 
        gap-5 p-2 px-6 dark:shadow-none sm:px-12 bg-white shadow-light-100"
    >
      <Logo />

      <div>
        <Button
          onClick={handleLogout}
          className="font-medium text-lg max-sm:text-base"
        >
          Sign Out
        </Button>
      </div>
    </header>
  );
};

const SubscriptionCard = () => {
  const stripeCheckoutSession = useStripeCheckoutSession();
  const { authStatus, userData } = useSelector(
    (state: RootState) => state.auth
  );
  const navigate = useNavigate();
  console.log(userData);

  const handleStripSubscription = async () => {
    const response = await stripeCheckoutSession.mutateAsync();
    window.location.href = response?.data.url;
  };

  useEffect(() => {
    if (userData?.role === "voter") {
      navigate("..");
    }
    if (!authStatus) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="w-full min-h-screen bg-light-800 pb-10">
      <Header />
      <div
        className="mt-10 max-w-[400px] shadow-light-100 rounded-lg m-auto flex items-center justify-center
       bg-white text-center px-8 py-10"
      >
        <div className="">
          <h2 className="text-2xl font-semibold">
            Become a Miss Meta Universe Contestant
          </h2>
          <p className="text-gray mt-4 font-inter">
            Unlock exclusive features and increase your chance of being
            discovered!
          </p>
          <ul className=" mt-6 text-gray font-inter space-y-4">
            <li className="flex items-start gap-1 text-[15px]">
              <img src={tick} alt="tick" width={24} height={24} /> Upload photos
              and videos to showcase your talents.
            </li>
            <li className="flex items-start text-[15px]">
              <img src={tick} alt="tick" width={24} height={24} />
              Gain access to valuable coaching and resources.
            </li>
            <li className="flex items-start text-[15px]">
              <img src={tick} alt="tick" width={24} height={24} />
              Get noticed by brands and companies seeking influencers.
            </li>
          </ul>
          <div className="mt-10 flex justify-between items-center">
            <span className="text-lg font-medium text-dark-100">
              <span className=" text-2xl font-extrabold">$</span>
              <span className="text-4xl font-extrabold">100</span>/year
            </span>
            <Button
              type="button"
              className="px-4 py-2 rounded-md primary-gradient text-white font-semibold disabled:opacity-50"
              onClick={handleStripSubscription}
            >
              Subscribe Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCard;
