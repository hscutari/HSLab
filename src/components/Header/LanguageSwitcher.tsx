"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { setLocale } from "@/i18n/actions";
import { locales, type Locale } from "@/i18n/config";

export default function LanguageSwitcher() {
  const current = useLocale() as Locale;
  const t = useTranslations("Header");
  const [isPending, startTransition] = useTransition();

  const handleChange = (next: Locale) => {
    if (next === current) return;
    startTransition(() => {
      setLocale(next);
    });
  };

  const labelFor = (loc: Locale) =>
    loc === "pt" ? t("languagePt") : t("languageEn");
  const flagFor = (loc: Locale) => (loc === "pt" ? "🇧🇷" : "🇺🇸");

  return (
    <div
      className="flex items-center gap-1.5"
      role="group"
      aria-label={t("language")}
    >
      {locales.map((loc) => {
        const active = loc === current;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => handleChange(loc)}
            disabled={isPending || active}
            aria-pressed={active}
            title={labelFor(loc)}
            className={`flex items-center gap-1 px-2 py-1 rounded-md text-custom-sm font-medium transition-colors ${
              active
                ? "bg-blue text-white"
                : "text-dark hover:text-blue hover:bg-gray-1"
            } ${isPending ? "opacity-60 cursor-wait" : ""}`}
          >
            <span aria-hidden>{flagFor(loc)}</span>
            <span className="uppercase">{loc}</span>
          </button>
        );
      })}
    </div>
  );
}
