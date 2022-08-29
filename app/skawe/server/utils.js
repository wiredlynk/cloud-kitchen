import acceptLanguageParser from "accept-language-parser";
import fs from "fs/promises";
import path from "path";

export function resolveLocale(request) {
  const supportedLanguages = ["en"];
  const defaultLangauge = supportedLanguages[0];
  return (
    acceptLanguageParser.pick(
      supportedLanguages,
      request.headers.get("accept-language") || defaultLangauge
    ) || defaultLangauge
  );
}

export async function getMessages(locale) {
  const messagesPath = path.join(process.cwd(), `./i18n/${locale}.json`);
  const content = await fs.readFile(messagesPath, "utf-8");
  return JSON.parse(content);
}
