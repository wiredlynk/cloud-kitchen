import { useTranslations } from "use-intl";

export const FormattedMessage = ({ id }) => {
  const getId = typeof id === "string" ? id : String(id);
  const t = useTranslations();
  return <>{t(getId)}</>;
};
