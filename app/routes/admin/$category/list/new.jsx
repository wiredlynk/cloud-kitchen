import { json, redirect } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { addAutoValue } from "~/skawe/modules/addAutoValue";
import { getFormFields } from "~/skawe/modules/utils";
import { addDoc } from "~/skawe/firebase/db.server";
import { schema } from "~/skawe/modules/schema";
import { ModalTrigger, Forms } from "~/components";

export const meta = ({ data }) => ({
  title: "Add New title",
  description: "Add New description",
});

export const loader = async ({ params }) => {
  const category = params.category;
  if (!category) return null;

  return json(category);
};

export const action = async ({ request, params }) => {
  // 1. set helpers
  const setCategory = params.category.toLowerCase();
  const getSchema = schema[setCategory];
  const fields = getFormFields(getSchema.fields);
  const addUser = getSchema.createUser;
  // 2. Get/setup form data from the request
  const formData = await request.formData();
  let document = { __collection: setCategory };
  fields.map((field) => (document[field] = formData.get(field)));
  // 3. Add AutoValue
  const dataToBeAdded = await addAutoValue({ document, getSchema });
  Object.keys(dataToBeAdded).forEach((key) => {
    if (
      dataToBeAdded[key] === null ||
      dataToBeAdded[key] === undefined ||
      dataToBeAdded[key] === ""
    ) {
      delete dataToBeAdded[key];
    }
  });
  // 4. Create user to db
  await addDoc(setCategory, dataToBeAdded, addUser);
  // 5. Redirect to list page
  return redirect(`/admin/${setCategory}/list`);
};

export default function AddNew() {
  const title = useLoaderData();
  const actionData = useActionData();

  return (
    <ModalTrigger title={title}>
      <Forms replace method="post" schema={schema[title]} {...{ actionData }} />
    </ModalTrigger>
  );
}
