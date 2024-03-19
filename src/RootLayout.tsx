import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser, logoutUser } from "./api/userApi";
import { login, logout } from "./store/authSlice";
import "../src/styles/theme.css";
import { checkSubscription } from "./api/stripeApi";
import { RootState } from "./store/store";

export default function RootLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authStatus, userData } = useSelector(
    (state: RootState) => state.auth
  );
  console.log(userData);

  useEffect(() => {
    (async () => {
      const response = await getCurrentUser();
      if (response) {
        dispatch(login(response.data));
      } else {
        dispatch(logout());
      }
    })();

    (async () => {
      // if user is logged in and his phone number is not verified send him to verify number page
      if (authStatus && !userData?.phoneVerified) {
        navigate("/verify");
      }
      if (userData?.role === "contestant") {
        const subscriptionStatus = await checkSubscription();
        console.log(subscriptionStatus);
        if (!subscriptionStatus.data) {
          navigate("/payment");
        }
      }
    })();
  }, [userData?.role]);

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      console.log(response);
      dispatch(logout());
      navigate("/", { replace: true });
    } catch (error) {
      console.log(`Error while logging out the user : ${error}`);
    }
  };

  return (
    <div className="background-light850_dark100 relative">
      <h1 className="text-4xl underline">
        {authStatus ? "Welcome back, " : "Guest user, please login"}
        Home
      </h1>
      {authStatus && <button onClick={handleLogout}>Log out</button>}
      {<Outlet />}
    </div>
  );
}
