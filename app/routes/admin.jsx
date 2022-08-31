import { useState } from "react";
import { json, redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { getUserId } from "~/sessions/auth.session";
import { Sidebar, Header } from "~/components";
import { routes } from "~/constants/routes";

export const meta = () => {
  return {
    title: "Admin page",
    description: "This becomes the nice preview on search results.",
  };
};

export const loader = async ({ request, params }) => {
  // 1. Check if user is logged in
  const userId = await getUserId(request);
  if (!userId) return redirect("/login");
  // 2. Get current user role
  const { customClaims } = userId;
  const { sidebarBar } = routes;
  const category = params.category;
  let routeRole = [];

  sidebarBar.map((link) => {
    if (link["label"] === category) {
      routeRole.push(...link["role"]);
    }
    return false;
  });

  if (routeRole.includes(customClaims.role)) {
    return json({});
  } else {
    return redirect("/accounts/dashboard");
  }
};

export default function Admin() {
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
