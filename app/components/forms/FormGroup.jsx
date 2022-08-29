import { FormattedMessage, Text } from "~/components";
import FormComponent from "./FormComponent";

const FormGroup = (props) => {
  const { name, label, fields, layout, formType, actionData } = props;
  return (
    <>
      {name === "default" ? null : (
        <Text variant="h6">
          <FormattedMessage id={label} />
        </Text>
      )}
      {fields.map((field, index) => (
        <FormComponent
          key={index}
          {...{ layout, formType, actionData, ...field }}
        />
      ))}
    </>
  );
};

export default FormGroup;
