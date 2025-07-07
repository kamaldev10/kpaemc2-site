"use client";

import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

interface SwitchThemeToggleProps {
  onThemeChange: (theme: "light" | "dark") => void;
  initialTheme?: "light" | "dark";
}

const SwitchThemeToggle = ({
  onThemeChange,
  initialTheme = "dark",
}: SwitchThemeToggleProps) => {
  const [isLightTheme, setIsLightTheme] = useState(initialTheme === "light");

  useEffect(() => {
    onThemeChange(isLightTheme ? "light" : "dark");
  }, [isLightTheme, onThemeChange]);

  const handleToggle = () => {
    setIsLightTheme((prev) => !prev);
  };

  return (
    <label className="relative inline-block h-6 w-12 cursor-pointer">
      <input
        type="checkbox"
        className="peer sr-only"
        checked={!isLightTheme}
        onChange={handleToggle}
        aria-label="Toggle theme"
      />

      <span className="absolute inset-0 rounded-full bg-slate-100 shadow-inner transition-colors duration-300 peer-checked:bg-slate-900"></span>

      <span className="absolute left-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 peer-checked:translate-x-6">
        <div className="relative flex h-full w-full items-center justify-center">
          <Sun className="absolute h-3.5 w-3.5 text-yellow-500 opacity-100 transition-opacity duration-300 peer-checked:opacity-0" />
          <Moon className="absolute h-3.5 w-3.5 text-slate-500 opacity-0 transition-opacity duration-300 peer-checked:opacity-100" />
        </div>
      </span>
    </label>
  );
};

export default SwitchThemeToggle;
