import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";
import { defaultLocale, locales, localeCookieName, type Locale } from "./config";

export default getRequestConfig(async () => {
  const store = await cookies();
  const cookieValue = store.get(localeCookieName)?.value;
  const locale: Locale = (locales as readonly string[]).includes(cookieValue ?? "")
    ? (cookieValue as Locale)
    : defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
