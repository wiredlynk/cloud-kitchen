import { Link } from "@remix-run/react";
import { getSetting } from "~/skawe/modules/settings";

const siteTitle = getSetting("title");
const logoUrl = getSetting("logoUrl");

export function Logo({ className = "" }) {
  if (logoUrl) {
    return (
      <Link
        to="/"
        aria-label="Go to home page"
        className={`h-12 w-12 ${className}`}
      >
        <img src={logoUrl} alt={siteTitle} />
      </Link>
    );
  } else {
    return (
      <Link
        to="/"
        aria-label="Go to home page"
        className={`text-2xl font-bold tracking-widest ${className}`}
      >
        {siteTitle}
      </Link>
    );
  }
}
