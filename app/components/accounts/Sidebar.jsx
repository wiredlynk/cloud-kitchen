import { NavLink } from "@remix-run/react";
import { Logo } from "~/components";
import { routes } from "~/constants/routes";

export const Sidebar = ({ setSidebar }) => {
  const navbar = routes.sidebarBar;
  const linkClassName =
    "flex flex-col w-2/4 md:w-full items-center justify-center font-medium capitalize p-6 md:p-4 hover:text-black transition";
  const activeLinkClass = "text-black";

  return (
    <div
      className={`${
        setSidebar
          ? "flex bg-white z-50 w-full top-24"
          : "md:flex hidden m-4 w-32 top-0"
      } flex-col items-center rounded-4xl fixed z-30 bottom-0`}
    >
      <Logo className="my-6 md:flex hidden" />
      <div className="flex flex-wrap p-6 md:p-0">
        {navbar.map((menu, index) => (
          <NavLink
            to={menu.href}
            key={index}
            className={({ isActive }) =>
              isActive
                ? `${linkClassName} ${activeLinkClass}`
                : `text-gray-500 ${linkClassName}`
            }
          >
            {menu.icon ? menu.icon : null}
            {menu.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};
