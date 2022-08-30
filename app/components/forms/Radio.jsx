import { forwardRef, memo } from "react";
import FormItem from "./FormItem";

const Field = forwardRef((props, ref) => {
  console.log("🚀 ~ file: Radio.jsx ~ line 5 ~ Field ~ ref", ref);
  const { name, options, value, actionData = "" } = props;
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
      <div className="mt-4 space-y-2">
        {options.map((option, i) => {
          const isChecked = value === option.value;
          const { disabled } = option;
          return (
            <label
              className="flex items-center text-sm font-medium text-gray-700"
              key={i}
            >
              <input
                type="radio"
                {...{
                  name,
                  disabled,
                  ref,
                }}
              />
              <span className="ml-3 ">{option.label}</span>
            </label>
          );
        })}
      </div>
    </FormItem>
  );
});

Field.displayName = "Radio";
export const Radio = memo(Field);
