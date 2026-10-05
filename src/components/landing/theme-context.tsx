"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type MarketingTheme = "light" | "dark";

interface MarketingThemeContextType {
  theme: MarketingTheme;
  toggleTheme: () => void;
  setTheme: (theme: MarketingTheme) => void;
  mounted: boolean;
}

const MarketingThemeContext = createContext<MarketingThemeContextType | undefined>(undefined);

export function MarketingThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<MarketingTheme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const savedTheme = localStorage.getItem("webxode-marketing-theme") as MarketingTheme | null;
    if (savedTheme === "light" || savedTheme === "dark") {
      setThemeState(savedTheme);
    } else {
      setThemeState("light");
    }
  }, []);

  const setTheme = (newTheme: MarketingTheme) => {
    setThemeState(newTheme);
    localStorage.setItem("webxode-marketing-theme", newTheme);
  };

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  };

  return (
    <MarketingThemeContext.Provider value={{ theme, toggleTheme, setTheme, mounted }}>
      <div
        className={`min-h-screen transition-colors duration-300 ${theme === "dark" ? "dark bg-slate-950 text-slate-100" : "light bg-slate-50 text-slate-900"}`}
      >
        {children}
      </div>
    </MarketingThemeContext.Provider>
  );
}

export function useMarketingTheme() {
  const context = useContext(MarketingThemeContext);
  if (!context) {
    return {
      theme: "light" as MarketingTheme,
      toggleTheme: () => {},
      setTheme: () => {},
      mounted: false,
    };
  }
  return context;
}
