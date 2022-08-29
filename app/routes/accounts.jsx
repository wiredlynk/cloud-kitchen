import { useState } from "react";
import { json, redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { getUserId } from "~/sessions/auth.session";
import { Sidebar, Header } from "~/components";

export const meta = () => {
  return {
    title: "Login page",
    description: "This becomes the nice preview on search results.",
  };
};

export const loader = async ({ request }) => {
  const userId = await getUserId(request);
  if (!userId) return redirect("/login");
  return json({});
};

export default function Accounts() {
  const [openSidebar, setOpenSidebar] = useState(false);

  const setSidebar = (status) => {
    setOpenSidebar(status);
  };

  return (
    <>
      <Sidebar setSidebar={openSidebar} />
      <div className="md:ml-36">
        <Header setSidebar={setSidebar} />
        <Outlet />
      </div>
    </>
  );
}
