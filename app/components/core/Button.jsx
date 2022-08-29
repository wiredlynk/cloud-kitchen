import { Link, NavLink } from "@remix-run/react";

const defaultClass =
  "whitespace-nowrap inline-flex items-center justify-center font-semibold transition duration-200 ease-in-out focus:outline-none capitalize";
const outlineButtonClass =
  "border text-primary hover:bg-primary/[.08] border-primary hover:border-primary";
const solidButtonClass =
  "bg-primary dark:bg-gray-700 text-white hover:primary/[.2]";

const flatButtonClass = () => "px-2 text-primary hover:primary/[.35]";

const sizeClass = (size) => {
  return size === "small"
    ? "rounded-lg leading-10 h-10 px-4"
    : "rounded-xl leading-10 h-14 py-1.5 px-8";
};

/**
 * @summary Flat button
 * @param href
 * @param size
 */
const FlatButton = ({
  href,
  fullWidth,
  size = "",
  className = "",
  children,
  ...rest
}) => {
  const flatClassName = `${defaultClass} ${sizeClass(
    size
  )} ${flatButtonClass()} ${fullWidth ? "w-full" : ""} ${className}`;

  if (href) {
    return (
      <Link to={href} className={flatClassName} {...rest}>
        {children}
      </Link>
    );
  } else {
    return (
      <button className={flatClassName} {...rest}>
        {children}
      </button>
    );
  }
};

/**
 * @summary Outline button
 * @param href
 * @param size
 */
function OutlineButton({ href, fullWidth, size = "", children, ...rest }) {
  const className = `${defaultClass} ${sizeClass(size)} ${outlineButtonClass} ${
    fullWidth ? "w-full" : ""
  }`;

  if (href) {
    return (
      <Link to={href} className={className} {...rest}>
        {children}
      </Link>
    );
  } else {
    return (
      <button className={className} {...rest}>
        {children}
      </button>
    );
  }
}

/**
 * @summary Solid button
 * @param href
 * @param size
 */
function SolidButton({
  href,
  fullWidth,
  size = "",
  className = "",
  children,
  ...rest
}) {
  const defaultClassName = `${defaultClass} ${className} ${sizeClass(
    size
  )} ${solidButtonClass} ${fullWidth ? "w-full" : ""}`;

  if (href) {
    return (
      <Link to={href} className={defaultClassName} {...rest}>
        {children}
      </Link>
    );
  } else {
    return (
      <button className={defaultClassName} {...rest}>
        {children}
      </button>
    );
  }
}

function ButtonLinkActive({
  href,
  className,
  children,
  haveHover,
  activeLinkClass,
  ...rest
}) {
  const linkButtonClass = `relative text-black dark:text-gray-200 ${
    haveHover
      ? "border-b-2 border-transparent hover:border-primary dark:hover:border-gray-100"
      : ""
  }`;
  const linkClassName = `${defaultClass} ${linkButtonClass} ${className}`;
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        isActive ? `${linkClassName} ${activeLinkClass}` : linkClassName
      }
      {...rest}
    >
      {children}
    </NavLink>
  );
}

export function Button({
  href,
  children,
  fullWidth = false,
  haveHover = true,
  activeLinkClass = "",
  size = "",
  variant = "",
  className = "",
  ...rest
}) {
  if (variant === "link") {
    return (
      <ButtonLinkActive {...{ href, className, haveHover, activeLinkClass }}>
        {children}
      </ButtonLinkActive>
    );
  } else if (variant === "flat") {
    return (
      <FlatButton {...{ href, size, className, fullWidth }}>
        {children}
      </FlatButton>
    );
  } else if (variant === "outline") {
    return (
      <OutlineButton {...{ href, size, className, fullWidth, ...rest }}>
        {children}
      </OutlineButton>
    );
  } else {
    return (
      <SolidButton {...{ href, size, fullWidth, className, ...rest }}>
        {children}
      </SolidButton>
    );
  }
}
