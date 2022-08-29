import { forwardRef, memo } from "react";
import FormItem from "./FormItem";

const Field = forwardRef((props, ref) => {
  const {
    type,
    required,
    name,
    disabled,
    autoFocus,
    layout,
    value,
    min,
    max,
    pattern,
    actionData = "",
  } = props;
  const { errors } = actionData;
  let errorMessage;
  let errorField;

  if (errors) {
    errorField = Object.keys(errors).some((field) => field === name);
    if (errorField) {
      errorMessage = errors[name];
    }
  }
  return (
    <FormItem {...{ errorMessage, ...props }}>
      <textarea
        className={`text-base text-black dark:text-white  mt-1 px-4 py-3.5 block w-full rounded-md border-2 focus:outline-none focus:border-transparent disabled:bg-gray-300  disabled:cursor-not-allowed ${
          errorField
            ? "border-danger/[.5] bg-danger/[.1]"
            : "bg-gray-100 dark:bg-gray-800 border-transparent"
        }`}
        rows="3"
        autoComplete={`input-${name}`}
        placeholder={layout === "inputOnly" ? name : ""}
        defaultValue={value}
        minLength={min}
        maxLength={max}
        {...{
          type,
          required,
          name,
          disabled,
          pattern,
          ref,
          autoFocus,
        }}
      />
    </FormItem>
  );
});

Field.displayName = "Textarea";
export const Textarea = memo(Field);
