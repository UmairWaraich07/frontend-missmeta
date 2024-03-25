import { Link, useLocation, useNavigate } from "react-router-dom";
import { Logo } from ".";
import { LeftbarLinks } from "@/constants";
import { Button } from "../ui/button";
import { NavLinkTypes } from "@/types";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const LeftsidebarContent = () => {
  const { pathname } = useLocation();
  return (
    <section className="flex h-full flex-col gap-4 pb-6">
      {LeftbarLinks.map((item: NavLinkTypes) => {
        const isActive = pathname === item.route;

        return (
          <Link
            key={item.label}
            to={item.route}
            className={`${
              isActive
                ? "primary-gradient rounded-lg text-light-900"
                : "text-dark300_light900"
            } flex items-center justify-start gap-4 bg-transparent p-4 cursor-pointer`}
          >
            <img
              src={item.imgURL}
              alt={item.label}
              width={24}
              height={24}
              className={`${isActive ? "" : "invert-colors"}`}
            />

            <p
              className={`${
                isActive ? "base-bold" : "base-medium"
              } max-lg:hidden cursor-pointer`}
            >
              {item.label}
            </p>
          </Link>
        );
      })}
    </section>
  );
};

const LeftSidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { authStatus } = useSelector((state: RootState) => state.auth);

  return (
    <aside
      className="background-light900_dark200 light-border-2 custom-scrollbar sticky left-0 top-0 flex h-screen flex-col items-center justify-between
   overflow-y-auto border-r p-6 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[270px]"
    >
      <div>
        <Link to="/">
          <Logo width={56} />
        </Link>
        <div className="mt-8">
          <LeftsidebarContent />
        </div>
      </div>

      {!authStatus && (
        <div className="w-full mt-4">
          <div className="flex flex-col gap-3">
            <Link to="/login">
              <Button className=" btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                <img
                  src="/assets/icons/account.svg"
                  alt="SignIn"
                  width={20}
                  height={20}
                  className="invert-colors lg:hidden"
                />
                <span className="primary-text-gradient max-lg:hidden">
                  Log In
                </span>
              </Button>
            </Link>
            <Link to="/registerchoice">
              <Button className=" btn-tertiary light-border-2 text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                <img
                  src="/assets/icons/sign-up.svg"
                  alt="register"
                  width={20}
                  height={20}
                  className="invert-colors lg:hidden"
                />
                <span className="max-lg:hidden">Sign Up</span>
              </Button>
            </Link>
          </div>
        </div>
      )}
    </aside>
  );
};

export default LeftSidebar;
