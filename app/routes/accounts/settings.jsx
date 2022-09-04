import { useActionData, useTransition } from "@remix-run/react";
import { HeroJumbotron, Forms } from "~/components";
import { loadTexts } from "~/constants/transition";
import { useUser } from "~/skawe/users/helpers";
import { updateUser } from "~/skawe/firebase/user.server";
import { getUserId } from "~/sessions/auth.session";
import { getFormFields, removeNullOrEmpty } from "~/skawe/modules/utils";
import { schema } from "~/skawe/modules/schema";

export const meta = () => ({
  title: "Profile title",
  description: "Profile description",
});

export const action = async ({ request }) => {
  // 1. set helpers
  const currentUser = await getUserId(request);
  const getSchema = schema["settings"];
  const fields = getFormFields(getSchema.fields);
  // 2. Get/setup form data from the request
  const formData = await request.formData();
  let document = {};
  fields.map((field) => (document[field] = formData.get(field)));
  removeNullOrEmpty(document);
  // 3. Update user to db
  return updateUser(currentUser.uid, document);
};

export default function Profile() {
  const document = useUser();
  const actionData = useActionData();
  const transition = useTransition();

  const buttonText =
    transition.state === "submitting"
      ? "saving"
      : transition.state === "loading"
      ? loadTexts[transition.type] || "loading"
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
