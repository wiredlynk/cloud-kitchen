import { redirect } from "@remix-run/node";
import { removeDoc } from "~/skawe/firebase/db.server";

export const loader = async ({ params }) => {
  const category = params.category;
  if (!category) return null;

  const id = params.id;
  if (!id) return null;

  await removeDoc(category, id);
  return redirect(`/admin/${category}/list`);
};
