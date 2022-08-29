import { json, redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { getUserId } from "~/sessions/auth.session";
import { Sidebar, Header } from "~/components";

export const meta = () => {
  return {
    title: "Admin page",
    description: "This becomes the nice preview on search results.",
  };
};

export const loader = async ({ request }) => {
  const userId = await getUserId(request);
  if (!userId) return redirect("/login");
  return json({});
};

export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="md:ml-36">
        <Header />
        <Outlet />
      </div>
    </>
  );
}
