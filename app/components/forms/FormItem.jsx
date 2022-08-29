/*
 * @summary Layout for a single form item
 */
import { memo } from "react";
import { FormattedMessage } from "~/components";

const FieldLabel = ({ name, errorMessage, className = "" }) => (
  <span
    className={`text-base font-medium ${
      errorMessage ? "text-danger" : "text-gray-600 dark:text-gray-300"
    } ${className}`}
  >
    <FormattedMessage id={name} />
  </span>
);

const FieldDescription = ({ description }) => (
  <span className="text-xs italic font-medium text-gray-500">
    {description}
  </span>
);

const FieldError = ({ error }) => {
  return <span className="text-xs font-medium text-danger">{error}</span>;
};

const InputOnly = ({ description, errorMessage, children }) => (
  <div className="mb-4">
    <div className="relative block">{children}</div>
    {description ? <FieldDescription description={description} /> : null}
    {errorMessage ? <FieldError error={errorMessage} /> : null}
  </div>
);

const InputVertical = ({ name, description, errorMessage, children }) => (
  <div className="mb-4">
    <label className="relative block">
      <FieldLabel {...{ name, errorMessage }} />
      {children}
    </label>
    {description ? <FieldDescription description={description} /> : null}
    {errorMessage ? <FieldError error={errorMessage} /> : null}
  </div>
);

const InputHorizontal = ({ name, description, errorMessage, children }) => (
  <label className="relative block mb-4">
    <span className="flex items-center">
      <FieldLabel className="w-48" {...{ name, errorMessage }} />
      {children}
    </span>
    {description ? <FieldDescription description={description} /> : null}
    {errorMessage ? <FieldError error={errorMessage} /> : null}
  </label>
);

const FormItem = ({
  name,
  description,
  errorMessage,
  layout = "vertical",
  children,
}) => {
  if (layout === "inputOnly") {
    // input only layout
    return <InputOnly {...{ description, errorMessage }}>{children}</InputOnly>;
  } else if (layout === "vertical") {
    // vertical layout
    return (
      <InputVertical {...{ name, description, errorMessage }}>
        {children}
      </InputVertical>
    );
  } else {
    // horizontal layout (default)
    return (
      <InputHorizontal {...{ name, description, errorMessage }}>
        {children}
      </InputHorizontal>
    );
  }
};

export default memo(FormItem);
