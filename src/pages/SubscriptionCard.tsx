import { Logo } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { logout } from "@/store/authSlice";
import { RootState } from "@/store/store";
import { useStripeCheckoutSession } from "@/tanstack/stripeQueries";
import { useLogoutUser } from "@/tanstack/userQueries";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
        gap-5 p-4 shadow-light-300 dark:shadow-none sm:px-12"
    >
      <Logo />

      <div>
        <Button onClick={handleLogout} className="font-medium text-lg">
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
    <div className="w-full min-h-screen ">
      <Header />
      <div className="mt-12 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-sm mx-auto text-center">
          <div className="px-6 py-4">
            <h2 className="text-xl font-bold text-gray-800">
              Become a Miss Meta Universe Contestant
            </h2>
            <p className="text-gray-600 mt-2">
              Unlock exclusive features and increase your chance of being
              discovered!
            </p>
            <ul className="list-disc mt-4 text-gray-700">
              <li>Upload photos and videos to showcase your talents.</li>
              <li>Gain access to valuable coaching and resources.</li>
              <li>Get noticed by brands and companies seeking influencers.</li>
            </ul>
            <div className="mt-6 flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-800">
                One-time Fee: $100
              </span>
              <button
                type="button"
                className="px-4 py-2 rounded-md bg-indigo-600 text-white font-bold shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                onClick={handleStripSubscription}
              >
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCard;
