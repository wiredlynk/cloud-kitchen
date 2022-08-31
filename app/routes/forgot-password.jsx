import { json, redirect } from "@remix-run/node";
import { useActionData, useTransition } from "@remix-run/react";
import {
  HeroJumbotron,
  FormattedMessage,
  Forms,
  Button,
  Text,
} from "~/components";
import { getUserId } from "~/sessions/auth.session";
import { loadTexts } from "~/constants/transition";
import { schema } from "~/skawe/modules/schema";

export const meta = () => ({
  title: "Home title",
  description: "Home description",
});

/** form group
 * const adminGroup = {
 * name: "Admins",
 * order: 10,
 * };
 */

export const action = async ({ request }) => {
  // 1. Get/setup form data from the request
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  return json({ email, password });
};

export const loader = async ({ request }) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/accounts/dashboard");
  return json({});
};

export default function ForgotPassword() {
  const actionData = useActionData();
  const transition = useTransition();

  const buttonText =
    transition.state === "submitting"
      ? "resetting"
      : transition.state === "loading"
      ? loadTexts[transition.type] || "loading"
      : "reset_your_password";

  return (
    <HeroJumbotron
      fullHeight
      heading={<FormattedMessage id="find_password_title" />}
      description={<FormattedMessage id="sample" />}
      leftContent={
        <>
          <Forms
            method="post"
            schema={schema["forgotPassword"]}
            {...{ actionData, buttonText }}
          />
          <Text>
            <FormattedMessage id="already_have_account" />{" "}
            <Button variant="link" href="/login">
              <FormattedMessage id="sign_in_here" />
            </Button>
            ?
          </Text>
        </>
      }
    />
  );
}
