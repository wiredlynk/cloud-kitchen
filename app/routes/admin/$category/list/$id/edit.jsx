import { json, redirect } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { ModalTrigger, Forms } from "~/components";
import { getDoc, editDoc } from "~/skawe/firebase/db.server";

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

const schema = {
  collection: "category",
  fields: {
    title: {
      type: "text",
      required: true,
    },
    description: {
      type: "textarea",
      min: 10,
      max: 200,
    },
  },
};

export const action = async ({ request, params }) => {
  // 1. Get/setup form data from the request
  const formData = await request.formData();
  const title = formData.get("title");
  const description = formData.get("description");
  const setCategory = params.category.toLowerCase();
  const setUid = params.id;
  // 2. Create user to db
  await editDoc(setCategory, setUid, { title, description });
  // 3. Redirect to list page
  return redirect(`/admin/${setCategory}/list`);
};

export default function EditDoc() {
  const { document, category } = useLoaderData();
  const actionData = useActionData();

  return (
    <ModalTrigger title={category}>
      <Forms replace method="post" {...{ schema, document, actionData }} />
    </ModalTrigger>
  );
}
