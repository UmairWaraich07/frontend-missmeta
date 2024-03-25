import { Link } from "react-router-dom";
import { Logo } from ".";
import Avatar from "./Avatar";

const Topbar = () => {
  return (
    <header className="topbar bg-white">
      <div className="flex-between p-4">
        <Link to="/" className="flex items-center">
          <Logo width={56} />
        </Link>

        <div className="flex-center gap-4">
          <Link to={`/profile/`}>
            <Avatar
              fullname={"Umair"}
              username={"reachumair"}
              profilePicture={""}
              className="w-9 h-9 overflow-hidden"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
