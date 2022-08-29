export const isError = (input) =>
  !!input && typeof input === "object" && "error" in input;

// https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
export const signInWithPassword = async (body, restConfig) => {
  const response = await fetch(
    `${restConfig.domain}/v1/accounts:signInWithPassword?key=${restConfig.apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  return response.json();
};
