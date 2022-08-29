import { useState } from "react";
import {
  Row,
  Button,
  UsersMenu,
  SpacerBetween,
  FormattedMessage,
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

const menuIcon = (
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

const MenuButton = ({ toggleSidebar }) => {
  return (
    <Button variant="flat" className="lg:hidden px-0" onClick={toggleSidebar}>
      {menuIcon}
    </Button>
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

  console.log(
    "🚀 ~ file: Header.jsx ~ line 63 ~ Header ~ openSidebar",
    openSidebar
  );

  return (
    <nav className="w-full py-5">
      <Row>
        <div className="flex justify-between items-center">
          <MenuButton toggleSidebar={toggleSidebar} />
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
