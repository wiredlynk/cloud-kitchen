import { json, redirect } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { ModalTrigger, Forms } from "~/components";
import { addDoc } from "~/skawe/firebase/db.server";
import { schema } from "~/skawe/modules/schema";
import { addAutoValue } from "~/skawe/modules/addAutoValue";

export const meta = () => ({
  title: "Add New title",
  description: "Add New description",
});

export const loader = async ({ params }) => {
  const category = params.category;
  if (!category) return null;

  return json(category);
};

export const action = async ({ request, params }) => {
  // 1. Get/setup form data from the request
  const formData = await request.formData();
  const title = formData.get("title");
  const description = formData.get("description");
  // 2. set helpers
  const setCategory = params.category.toLowerCase();
  const document = { title, description };
  const getSchema = schema[setCategory];
  // 3. Add AutoValue
  const dataToBeAdded = await addAutoValue({ document, getSchema });
  // 4. Create user to db
  await addDoc(setCategory, dataToBeAdded);
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
