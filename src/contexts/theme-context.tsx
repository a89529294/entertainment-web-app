"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

const themeContext = createContext(
  {} as {
    theme: "light" | "dark";
    setTheme: (theme: "light" | "dark") => void;
  },
);

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const updateTheme = useCallback((theme: "light" | "dark") => {
    if (theme === "dark") {
      setTheme("dark");
      console.log("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      console.log("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, []);

  useEffect(() => {
    const theme = localStorage.getItem("theme");

    if (theme === "dark") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, []);

  return (
    <themeContext.Provider value={{ theme, setTheme: updateTheme }}>
      {children}
    </themeContext.Provider>
  );
}

export { themeContext, ThemeProvider };
