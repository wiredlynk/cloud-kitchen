import { /* useState, */ forwardRef } from "react";
import { Form, useTransition } from "@remix-run/react";
import { FormattedMessage, Button } from "~/components";
import { deepValue, getFormFields } from "~/skawe/modules/utils";
import FormGroup from "./FormGroup";

const formFieldset = {
  border: 0,
  margin: 0,
  padding: 0,
};

// sort by value
const sortBy = (props, value) => props.sort((a, b) => a[value] - b[value]);

export const FormWrapper = forwardRef((props, ref) => {
  const {
    document,
    schema,
    actionData,
    layout = "vertical",
    buttonText = "submit",
  } = props;

  // when the form is being processed on the server, this returns different
  // transition states to help us build pending and optimistic UI.
  const transition = useTransition();

  // return the current schema based on either the schema or collection prop
  const getSchema = () => (schema ? schema.fields : null);

  // Stop form to execute, if schema is not available.
  if (getSchema() === null) return;

  // if a document is being passed, this is an update form
  const getFormType = () => (document ? "update" : "create");

  // get form fields
  const getFieldNames = () => getFormFields(getSchema());

  // get group names associated to field names
  const getFieldGroups = () => {
    // const schema = getSchema();
    //   build fields array by iterating over the list of field names
    let fields = getFieldNames().map((fieldName) => {
      // get schema for the current field
      const schemaList = getSchema();
      const fieldSchema = schemaList[fieldName];
      // intialize properties
      let field = {
        name: fieldName,
        label: fieldSchema.label ?? fieldName,
        layout: layout,
        type: fieldSchema.type,
        required: fieldSchema.required ?? false,
      };
      // replace empty value, by the default value from the schema
      // add value
      field.value =
        document && deepValue(document, fieldName)
          ? deepValue(document, fieldName)
          : "";

      if (fieldSchema.defaultValue && field.value === "") {
        field.value = fieldSchema.defaultValue;
      }
      // add options if they exist
      if (fieldSchema.options) {
        field.options =
          typeof fieldSchema.options === "function"
            ? fieldSchema.options.call(fieldSchema)
            : fieldSchema.options;
      }
      // minimum chars in field
      if (fieldSchema.min) {
        field.min = fieldSchema.min;
      }
      // maximum chars in field
      if (fieldSchema.max) {
        field.max = fieldSchema.max;
      }
      // order of in fields in form
      if (fieldSchema.order) {
        field.order = fieldSchema.order;
      }
      // add group
      if (fieldSchema.group) {
        field.group = fieldSchema.group;
      }
      // add description
      if (fieldSchema.description) {
        field.description = fieldSchema.description;
      }
      // if disabled
      if (fieldSchema.disabled) {
        field.disabled = fieldSchema.disabled;
      }
      // if pattern
      if (fieldSchema.pattern) {
        field.pattern = fieldSchema.pattern;
      }

      return field;
    });
    fields = sortBy(fields, "order");

    let getUniq = [...new Set(fields.map((field) => field.group))];
    // get list of all groups used in current fields
    let groups = getUniq.filter((x) => !!x);

    // for each group, add relevant fields
    groups = groups.map((group) => {
      group.label = group.label || group.name;
      group.fields = fields.filter(
        (field) => field.group && field.group.name === group.name
      );
      return group;
    });

    // add default group
    groups = [
      {
        name: "default",
        label: "default",
        order: 0,
        fields: fields.filter((field) => !field.group),
      },
    ].concat(groups);

    // sort by order
    groups = sortBy(groups, "order");

    return groups;
  };

  // default props
  const getCommonProps = (group) => {
    return {
      ...group,
      layout,
      actionData,
      document,
    };
  };

  const fieldGroups = getFieldGroups();
  const { method, action } = props;

  return (
    <Form {...{ method, action, ref }} id={"document-" + getFormType()}>
      <fieldset
        disabled={
          transition.state === "submitting" || transition.state === "loading"
        }
        style={{ ...formFieldset }}
      >
        {fieldGroups &&
          fieldGroups.map((group, index) => (
            <FormGroup key={index} {...getCommonProps(group)} />
          ))}
        <Button fullWidth type="submit" className="mb-6">
          <FormattedMessage id={buttonText ?? "Submit"} />
        </Button>
      </fieldset>
    </Form>
  );
});

FormWrapper.displayName = "FormWrapper";
