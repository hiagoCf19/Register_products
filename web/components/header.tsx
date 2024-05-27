"use client"

import { ModeToggle } from "./toggleTheme";

const Header = () => {
  return (
    <header className="flex justify-between p-5">
      header
      <ModeToggle />
    </header>
  );
}

export default Header;