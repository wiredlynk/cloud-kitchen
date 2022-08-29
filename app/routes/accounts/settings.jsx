import { useActionData, useTransition } from "@remix-run/react";
import { HeroJumbotron, Forms } from "~/components";
import { loadTexts } from "~/constants/transition";
import { useUser } from "~/skawe/users/helpers";
import { updateUser } from "~/skawe/firebase/user.server";
import { getUserId } from "~/sessions/auth.session";
import { schema } from "~/skawe/modules/schema";

export const meta = () => ({
  title: "Profile title",
  description: "Profile description",
});

export const action = async ({ request }) => {
  // 1. Get currentUser
  const currentUser = await getUserId(request);

  // 2. Get/setup form data from the request
  const formData = await request.formData();
  const displayName = formData.get("displayName");
  const phoneNumber = formData.get("phoneNumber");
  const email = formData.get("email");
  const photoURL = formData.get("photoURL");
  const userModifier = {
    displayName,
    phoneNumber,
    email,
    photoURL,
  };

  Object.keys(userModifier).forEach((key) => {
    if (userModifier[key] === "" || userModifier[key] === null) {
      delete userModifier[key];
    }
  });

  // 3. Update user to db
  return updateUser(currentUser.uid, userModifier);
};

export default function Profile() {
  const document = useUser();
  const actionData = useActionData();
  const transition = useTransition();

  const buttonText =
    transition.state === "submitting"
      ? "saving..."
      : transition.state === "loading"
      ? loadTexts[transition.type] || "loading..."
      : "save";

  return (
    <HeroJumbotron
      eyebrow="Settings"
      leftContent={
        <Forms
          method="post"
          schema={schema["settings"]}
          {...{ document, actionData, buttonText }}
        />
      }
    />
  );
}
