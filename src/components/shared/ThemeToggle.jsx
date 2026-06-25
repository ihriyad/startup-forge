"use client";
import { useTheme } from "next-themes";
import React from "react";
import { BiMoon } from "react-icons/bi";
import { FiSun } from "react-icons/fi";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className="bg-background rounded-md p-3 hover:text-blue-700"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? (
        <>
          <BiMoon></BiMoon>
        </>
      ) : (
        <>
          <FiSun />
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
