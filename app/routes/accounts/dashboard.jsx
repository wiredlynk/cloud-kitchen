import { HeroJumbotron } from "~/components";
import { useUser } from "~/skawe/users/helpers";

export const meta = () => ({
  title: "Dashboard title",
  description: "Dashboard description",
});

export default function Dashboard() {
  const currentUser = useUser();

  return (
    <HeroJumbotron
      eyebrow="Dashboard"
      leftContent={<pre>{JSON.stringify(currentUser, null, 2)}</pre>}
    />
  );
}
