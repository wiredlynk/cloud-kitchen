import { Input, Textarea } from "~/components";

const FormComponent = (props) => {
  switch (props.type) {
    case "text":
    case "email":
    case "password":
      return <Input {...props} />;
    case "textarea":
      return <Textarea {...props} />;
    default:
      return <Input {...props} />;
  }
};

export default FormComponent;
