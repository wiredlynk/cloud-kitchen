export const SpacerBetween = ({ spacing = "", children }) => {
  let setSpacing;

  switch (spacing) {
    case "large":
      setSpacing = "space-x-32";
      break;
    case "medium":
      setSpacing = "space-x-16";
      break;
    case "small":
      setSpacing = "space-x-8";
      break;
    default:
      setSpacing = "space-x-4";
  }
  return <div className={`flex items-center ${setSpacing}`}>{children}</div>;
};
