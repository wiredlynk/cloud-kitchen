import { NavLink } from "@remix-run/react";
import { Logo } from "~/components";
import { routes } from "~/constants/routes";

export const Sidebar = () => {
  const navbar = routes.sidebarBar;
  const linkClassName =
    "flex flex-col items-center justify-center font-medium capitalize p-4 hover:text-black transition";
  const activeLinkClass = "text-black";

  return (
    <div
      className={`md:flex flex-col items-center w-32 m-4 rounded-4xl fixed z-30 top-0 bottom-0 hidden`}
    >
      <Logo className="my-6" />
      <div className="flex flex-col w-full">
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