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
import { createUser } from "~/skawe/firebase/user.server";
import { safeRedirect, validateEmail } from "~/skawe/users/helpers";
import { schema } from "~/skawe/modules/schema";

export const meta = () => ({
  title: "Register with us",
  description: "Home description",
});

export const loader = async ({ request }) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/dashboard");
  return json({});
};

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

  // 4. Check password length
  if (password.length < 8) {
    return json(
      { errors: { password: "Password is too short" } },
      { status: 400 }
    );
  }

  /** 
   * check user available with provided email
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
    return json(
      { errors: { email: "A user already exists with this email" } },
      { status: 400 }
    );
    }
  */

  // 5. Create user to db
  const user = await createUser(email, password);
  // 6. Create user to session
  return createUserSession({
    request,
    userId: user,
    remember: false,
    redirectTo,
  });
};

export default function Register() {
  const actionData = useActionData();
  const transition = useTransition();

  const buttonText =
    transition.state === "submitting"
      ? "registering"
      : transition.state === "loading"
      ? loadTexts[transition.type] || "loading"
      : "register";

  return (
    <HeroJumbotron
      fullHeight
      heading={<FormattedMessage id="register_title" />}
      description={<FormattedMessage id="sample" />}
      leftContent={
        <>
          <Forms
            method="post"
            schema={schema["register"]}
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
