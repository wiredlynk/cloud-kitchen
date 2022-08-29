import { redirect } from "@remix-run/node";
import { HeroJumbotron } from "~/components";
import { getUserId } from "~/sessions/auth.session";

export const meta = () => ({
  title: "Home title",
  description: "Home description",
});

export const loader = async ({ request }) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/accounts/dashboard");
  return redirect("/login");
};

export default function Index() {
  return (
    <HeroJumbotron
      fullHeight
      heading="Welcome to Cloud Kitchen"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    />
  );
}
