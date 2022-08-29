export const Spacer = ({ spacing = "" }) => {
  let spacer;
  switch (spacing) {
    case "large":
      spacer = "py-16";
      break;
    case "medium":
      spacer = "py-8";
      break;
    default:
      spacer = "py-4";
  }

  return <div className={spacer}></div>;
};
