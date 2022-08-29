export const Text = ({ variant, children }) => {
  const defaultClass = "block text-black dark:text-white";

  if (variant === "h1") {
    return (
      <h1 className={`mb-8 text-8xl font-extrabold ${defaultClass}`}>
        {children}
      </h1>
    );
  } else if (variant === "h2") {
    return (
      <h2 className={`mb-6 text-6xl font-extrabold ${defaultClass}`}>
        {children}
      </h2>
    );
  } else if (variant === "h3") {
    return (
      <h3 className={`mb-4 text-5xl font-bold ${defaultClass}`}>{children}</h3>
    );
  } else if (variant === "h4") {
    return (
      <h4 className={`mb-4 text-4xl font-semibold ${defaultClass}`}>
        {children}
      </h4>
    );
  } else if (variant === "h5") {
    return (
      <h5 className={`mb-2 text-2xl font-medium ${defaultClass}`}>
        {children}
      </h5>
    );
  } else if (variant === "h6") {
    return (
      <h6 className={`mb-2 text-xl font-medium ${defaultClass}`}>{children}</h6>
    );
  } else if (variant === "overline") {
    return (
      <span className={`text-xl font-semibold leading-loose ${defaultClass}`}>
        {children}
      </span>
    );
  } else if (variant === "subtitle") {
    return <span className={`text-xl ${defaultClass}`}>{children}</span>;
  } else {
    return <p className={`mb-2 ${defaultClass}`}>{children}</p>;
  }
};
