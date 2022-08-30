import { Input, Radio, Textarea } from "~/components";

const FormComponent = (props) => {
  switch (props.type) {
    case "text":
    case "email":
    case "password":
      return <Input {...props} />;
    case "textarea":
      return <Textarea {...props} />;
    case "radio":
      return <Radio {...props} />;
    default:
      return <Input {...props} />;
  }
};

export default FormComponent;
