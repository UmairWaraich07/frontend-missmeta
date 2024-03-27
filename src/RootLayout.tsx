import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser } from "./api/userApi";
import { login, logout } from "./store/authSlice";
import { checkSubscription } from "./api/stripeApi";
import { RootState } from "./store/store";
import { Bottombar, LeftSidebar, Topbar } from "./components/shared";
import { useLogoutUser } from "./tanstack/userQueries";
import { Button } from "./components/ui/button";

export default function RootLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authStatus, userData } = useSelector(
    (state: RootState) => state?.auth
  );
  const logoutUser = useLogoutUser();
  console.log(userData);

  useEffect(() => {
    (async () => {
      if (!authStatus) {
        const response = await getCurrentUser();
        console.log("Get current user", response);
        if (response?.data._id) {
          console.log("setting the authstatus to true");
          dispatch(login(response.data));
        } else {
          dispatch(logout());
        }
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      // if user is logged in and his phone number is not verified send him to verify number page
      if (authStatus && !userData?.phoneVerified) {
        navigate("/verify");
      }
      // TODO: resolve the webhook error and enable it
      // if (userData?.role === "contestant") {
      //   const subscriptionStatus = await checkSubscription();
      //   console.log("subscriptionStatus", subscriptionStatus);
      //   if (!subscriptionStatus.data) {
      //     navigate("/payment");
      //   }
      // }
    })();
  }, [userData?.role]);

  const handleLogout = async () => {
    try {
      const response = await logoutUser.mutateAsync();
      console.log(response);
      dispatch(logout());
      navigate("/", { replace: true });
    } catch (error) {
      console.log(`Error while logging out the user : ${error}`);
    }
  };

  return (
    <div className="bg-light-850 min-h-screen w-full sm:flex relative  ">
      <Topbar />
      <LeftSidebar />
      {/* {authStatus && (
        <Button className="bg-dark-100 text-white" onClick={handleLogout}>
          Log out
        </Button>
      )} */}

      <main className="flex flex-1 h-full ">{<Outlet />}</main>
      <Bottombar />
    </div>
  );
}
