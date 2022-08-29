import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { getDocs } from "~/skawe/firebase/db.server";
import { schema } from "~/skawe/modules/schema";
import { DataTable } from "~/components";

export const meta = () => ({
  title: "Profile title",
  description: "Profile description",
});

export const loader = async ({ params }) => {
  const category = params.category;
  if (!category) return null;
  const data = await getDocs(category);
  return json({ category, data });
};

export default function List() {
  const { category, data } = useLoaderData();
  return (
    <>
      <DataTable
        title={category}
        schema={schema[category]}
        data={data}
        columns={[{ name: "title" }, { name: "description" }]}
        showDelete
        showEdit
        showNew
        showSearch
      />
      <Outlet />
    </>
  );
}
