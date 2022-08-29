import { ModalTrigger, Button, FormattedMessage, Forms } from "~/components";

export const AddEditButton = ({ label, ...props }) => {
  const setLabel = label || props.type;
  const setTitle = label || props.type;

  return (
    <ModalTrigger
      label={setLabel}
      title={setTitle}
      component={
        <Button className="mb-4">
          <FormattedMessage id={setLabel} />
        </Button>
      }
    >
      <Forms
        schema={props.schema.fields}
        collection={props.schema.collection}
      />
    </ModalTrigger>
  );
};
