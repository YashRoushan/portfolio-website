"use client";

import { Laptop, Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

type ThemePreference = "system" | "light" | "dark";

const themes: ThemePreference[] = ["system", "light", "dark"];

function resolvedTheme(preference: ThemePreference) {
  if (preference !== "system") return preference;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(preference: ThemePreference) {
  const root = document.documentElement;
  root.dataset.themePreference = preference;
  root.dataset.theme = resolvedTheme(preference);
  localStorage.setItem("theme-preference", preference);
  window.dispatchEvent(new Event("theme-preference-change"));
}

function getThemeSnapshot(): ThemePreference {
  const value = document.documentElement.dataset.themePreference;
  return themes.includes(value as ThemePreference)
    ? (value as ThemePreference)
    : "system";
}

function subscribeToTheme(onStoreChange: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const handlePreference = () => onStoreChange();
  const handleSystemChange = () => {
    const root = document.documentElement;
    if (root.dataset.themePreference === "system") {
      root.dataset.theme = media.matches ? "dark" : "light";
    }
    onStoreChange();
  };

  window.addEventListener("theme-preference-change", handlePreference);
  media.addEventListener("change", handleSystemChange);
  return () => {
    window.removeEventListener("theme-preference-change", handlePreference);
    media.removeEventListener("change", handleSystemChange);
  };
}

export function ThemeSwitcher() {
  const theme = useSyncExternalStore<ThemePreference>(
    subscribeToTheme,
    getThemeSnapshot,
    (): ThemePreference => "system",
  );

  const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
  const Icon = theme === "light" ? Sun : theme === "dark" ? Moon : Laptop;

  return (
    <button
      type="button"
      className="inline-flex size-11 items-center justify-center rounded-lg border border-border bg-surface text-muted-strong hover:border-primary hover:bg-primary-soft hover:text-primary-strong"
      onClick={() => {
        applyTheme(nextTheme);
      }}
      aria-label={`Theme: ${theme}. Switch to ${nextTheme}.`}
      title={`Theme: ${theme}`}
      suppressHydrationWarning
    >
      <Icon aria-hidden="true" size={18} strokeWidth={1.8} />
    </button>
  );
}
