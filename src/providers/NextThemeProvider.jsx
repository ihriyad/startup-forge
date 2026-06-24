"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "sonner";

export const NextThemeProvider = ({ children }) => {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <Toaster position="top-center" />

      {children}
    </NextThemesProvider>
  );
};
