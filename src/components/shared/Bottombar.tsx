import { BottombarLinks } from "@/constants";
import { NavLinkTypes } from "@/types";
import { NavLink, useLocation } from "react-router-dom";

const Bottombar = () => {
  const { pathname } = useLocation();
  return (
    <section className="bottom-bar border-t border-dark-100/30">
      {BottombarLinks.map((link: NavLinkTypes) => {
        const isActive = pathname === link.route;
        return (
          <NavLink
            to={link.route}
            key={`bottom-bar-${link.label}`}
            className={`${
              isActive && "rounded-[10px] primary-gradient "
            } flex-center flex-col gap-1 p-2 transition`}
          >
            <img
              src={link.imgURL}
              className={`${isActive ? "" : "invert-colors"}`}
              width={16}
              height={16}
              alt={link.label}
            />
            <p className="tiny-medium text-center text-dark-200">
              {link.label}
            </p>
          </NavLink>
        );
      })}
    </section>
  );
};

export default Bottombar;
