"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { defaultLocale, locales, localeCookieName, type Locale } from "./config";

export async function setLocale(locale: Locale) {
  if (!(locales as readonly string[]).includes(locale)) {
    locale = defaultLocale;
  }
  const store = await cookies();
  store.set(localeCookieName, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  revalidatePath("/", "layout");
}
