import { json, redirect } from "@remix-run/node";
import { useActionData, useTransition } from "@remix-run/react";
import {
  HeroJumbotron,
  FormattedMessage,
  Forms,
  Button,
  Text,
} from "~/components";
import { getUserId, createUserSession } from "~/sessions/auth.session";
import { loadTexts } from "~/constants/transition";
import { signIn } from "~/skawe/firebase/user.server";
import { safeRedirect, validateEmail } from "~/skawe/users/helpers";
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
  const redirectTo = safeRedirect(
    formData.get("redirectTo"),
    "/accounts/dashboard"
  );

  // 2. Validate email is valid or not
  if (!validateEmail(email)) {
    return json({ errors: { email: "Email is invalid" } }, { status: 400 });
  }

  // 3. Check password type and length
  if (typeof password !== "string" || password.length === 0) {
    return json(
      { errors: { password: "Password is required" } },
      { status: 400 }
    );
  }

  // 4. Create user to db
  const user = await signIn(email, password);

  // 5. Create user to session
  return createUserSession({
    request,
    userId: user,
    remember: false,
    redirectTo,
  });
};

export const loader = async ({ request }) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/accounts/dashboard");
  return json({});
};

export default function Index() {
  const actionData = useActionData();
  const transition = useTransition();

  const buttonText =
    transition.state === "submitting"
      ? "logging_in"
      : transition.state === "loading"
      ? loadTexts[transition.type] || "loading"
      : "login";

  return (
    <HeroJumbotron
      fullHeight
      heading={<FormattedMessage id="login_title" />}
      description={<FormattedMessage id="sample" />}
      leftContent={
        <>
          <Forms
            method="post"
            schema={schema["login"]}
            {...{ actionData, buttonText }}
          />
          <Text>
            <FormattedMessage id="dont_have_account" />{" "}
            <Button variant="link" href="/register" type="submit">
              <FormattedMessage id="sign_up_here" />
            </Button>
            ?
          </Text>

          <Text>
            <FormattedMessage id="need_to_find_your" />{" "}
            <Button variant="link" href="/forgot-password">
              <FormattedMessage id="password" />
            </Button>
            ?
          </Text>
        </>
      }
    />
  );
}
