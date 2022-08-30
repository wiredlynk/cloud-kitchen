import { useState } from "react";
import {
  Row,
  Button,
  UsersMenu,
  SpacerBetween,
  FormattedMessage,
  Logo,
} from "~/components";
import { routes } from "~/constants/routes";
import { useUser } from "~/skawe/users/helpers";

const NavLinks = ({ currentUser }) => (
  <>
    {currentUser ? (
      <UsersMenu {...{ currentUser }} />
    ) : (
      <SpacerBetween>
        <Button variant="flat" size="small" href="/login">
          <FormattedMessage id="login" />
        </Button>
        <Button size="small" href="/register">
          <FormattedMessage id="register" />
        </Button>
      </SpacerBetween>
    )}
  </>
);

const menuOpenIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-8 h-8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 9h16.5m-16.5 6.75h16.5"
    />
  </svg>
);

const menuCloseIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-8 h-8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const MenuButton = ({ toggleSidebar, openSidebar }) => {
  return (
    <button className="md:hidden px-0" onClick={toggleSidebar}>
      {openSidebar ? menuCloseIcon : menuOpenIcon}
    </button>
  );
};

export const Header = ({ setSidebar }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const navbar = routes.navbar;
  const currentUser = useUser();

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
    setSidebar(!openSidebar);
  };

  return (
    <nav className="w-full py-5">
      <Row>
        <div className="flex justify-between items-center">
          <div className="flex">
            <MenuButton {...{ toggleSidebar, openSidebar }} />
            <Logo className="md:hidden pl-4 flex" />
          </div>
          <div className="space-x-8">
            {navbar.map((menu, index) => (
              <Button variant="link" href={menu.href} key={index}>
                {menu.label}
              </Button>
            ))}
          </div>
          <div className="flex items-center justify-end">
            <NavLinks {...{ currentUser }} />
          </div>
        </div>
      </Row>
    </nav>
  );
};
