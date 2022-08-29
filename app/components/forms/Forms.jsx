import { forwardRef } from "react";
import { FormWrapper } from "./FormWrapper";

export const Forms = forwardRef((props, ref) => {
  return <FormWrapper ref={ref} {...props} />;
});

Forms.displayName = "Forms";
