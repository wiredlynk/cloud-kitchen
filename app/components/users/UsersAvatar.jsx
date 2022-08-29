import { forwardRef } from "react";
import { Link } from "@remix-run/react";

export const UsersAvatar = forwardRef((props, ref) => {
  const { user, link, size } = props;
  const avatarUrl = user.photoURL;
  const xsmall = "h-6 w-6 text-xl";
  const small = "h-8 w-8 text-2xl";
  const large = "h-40 w-40 text-7xl";
  const defaultSize = "h-12 w-12 text-xl";

  const img = (
    <img
      alt={user.displayName}
      ref={ref}
      className={`${
        size === "xsmall"
          ? xsmall
          : size === "small"
          ? small
          : size === "large"
          ? large
          : defaultSize
      } inline-flex rounded-full shadow-xl`}
      src={avatarUrl}
    />
  );

  const initials = (
    <span
      className={`inline-flex items-center justify-center font-medium rounded-full shadow-xl bg-primary text-white dark:bg-gray-700 ${
        size === "xsmall"
          ? xsmall
          : size === "small"
          ? small
          : size === "large"
          ? large
          : defaultSize
      } inline-block rounded-lg`}
      ref={ref}
    >
      {user.displayName.slice(0, 2)}
    </span>
  );

  const avatar = avatarUrl ? img : initials;

  return <>{link ? <Link to="/">{avatar}</Link> : avatar}</>;
});

UsersAvatar.displayName = "UsersAvatar";

UsersAvatar.defaultProps = {
  link: false,
};
