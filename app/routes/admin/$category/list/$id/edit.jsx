import { json, redirect } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { ModalTrigger, Forms } from "~/components";
import { getDoc, editDoc } from "~/skawe/firebase/db.server";
import { getFormFields, removeNullOrEmpty } from "~/skawe/modules/utils";
import { schema } from "~/skawe/modules/schema";

export const meta = () => ({
  title: "Add New title",
  description: "Add New description",
});

export const loader = async ({ params }) => {
  const category = params.category;
  if (!category) return null;

  const id = params.id;
  if (!id) return null;

  const document = await getDoc(category, id);
  return json({ category, document, id });
};

export const action = async ({ request, params }) => {
  // 1. set helpers
  const setCategory = params.category.toLowerCase();
  const setUid = params.id;
  const getSchema = schema[setCategory];
  const fields = getFormFields(getSchema.fields);
  // 2. Get/setup form data from the request
  const formData = await request.formData();
  let document = {};
  fields.map((field) => (document[field] = formData.get(field)));
  removeNullOrEmpty(document);
  // 3. Create user to db
  await editDoc(setCategory, setUid, document);
  // 4. Redirect to list page
  return redirect(`/admin/${setCategory}/list`);
};

export default function EditDoc() {
  const { document, category } = useLoaderData();
  const actionData = useActionData();

  return (
    <ModalTrigger title={category}>
      <Forms
        replace
        method="post"
        schema={schema[category]}
        {...{ document, actionData }}
      />
    </ModalTrigger>
  );
}
