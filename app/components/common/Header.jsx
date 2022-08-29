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

export const Header = () => {
  const navbar = routes.navbar;
  const currentUser = useUser();

  return (
    <nav className="w-full py-5">
      <Row>
        <div className="flex justify-between items-center">
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
