import {
  Meta,
  Links,
  Outlet,
  Scripts,
  useCatch,
  LiveReload,
  useLoaderData,
  ScrollRestoration,
} from "@remix-run/react";
import { IntlProvider } from "use-intl";
import { getMessages, resolveLocale } from "~/skawe/server/utils";
import { getUserId } from "~/sessions/auth.session";
import { Layout, HeroJumbotron, Button } from "~/components";
import styles from "~/styles/tailwind.css";

export const links = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export const meta = () => ({
  charset: "utf-8",
  title: "Skawe App",
  description: "Skawe App",
  viewport: "width=device-width,initial-scale=1",
});

export const loader = async ({ request }) => {
  const locale = resolveLocale(request);

  return {
    locale,
    messages: await getMessages(locale),
    user: await getUserId(request),
  };
};

const Document = ({ children, title, locale, messages }) => {
  return (
    <html lang="en">
      <head>
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body className="bg-white dark:bg-gray-900">
        <IntlProvider locale={locale} messages={messages}>
          {children}
        </IntlProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};

// https://remix.run/api/conventions#default-export
// https://remix.run/api/conventions#route-filenames
export default function Skawe() {
  const { locale, messages, user } = useLoaderData();
  // console.log("🚀 ~ file: root.jsx ~ line 62 ~ Skawe ~ user", user);
  return (
    <Document {...{ locale, messages }}>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export function ErrorBoundary({ error }) {
  console.error(error);

  return (
    <Document title="Error!">
      <HeroJumbotron
        fullHeight
        eyebrow="There was an error"
        heading="Hey, there is an error."
        description={error.message}
        leftContent={
          <Button size="large" href="/">
            Go back to home page
          </Button>
        }
      />
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export function CatchBoundary() {
  const caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = "Sorry, you are not allowed to access this page.";
      break;
    case 404:
      message = "Sorry, we couldn't find what you were looking for.";
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <HeroJumbotron
        fullHeight
        eyebrow={
          <>
            {caught.status}: {caught.statusText}
          </>
        }
        heading={message}
        leftContent={
          <Button size="large" href="/">
            Go back to home page
          </Button>
        }
      />
    </Document>
  );
}
