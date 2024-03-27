import { Link } from "react-router-dom";
import { Logo } from ".";
import Avatar from "./Avatar";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Button } from "../ui/button";

const Topbar = () => {
  const { authStatus } = useSelector((state: RootState) => state.auth);
  return (
    <header className="topbar bg-white">
      <div className="flex-between px-4 pl-0">
        <Link to="/" className="flex items-center">
          <Logo width={50} />
        </Link>

        <div className="flex-center gap-4">
          {authStatus ? (
            <Link to={`/profile/`}>
              <Avatar
                fullname={"Umair"}
                username={"reachumair"}
                profilePicture={""}
                className="w-9 h-9 overflow-hidden"
              />
            </Link>
          ) : (
            <>
              <Link to="/login">
                <Button className="primary-gradient text-light-900">
                  Login
                </Button>
              </Link>
              <Link to="/registerchoice">
                <button className="font-semibold primary-text-gradient">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
