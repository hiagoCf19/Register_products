"use client"

import Image from "next/image";
import { ModeToggle } from "./toggleTheme";

const Header = () => {
  return (
    <header className="flex justify-between px-5 sm:px-44 border-b items-center">
      <Image src="/logo.png" alt="logo" width={150} height={20} />
      <ModeToggle />
    </header>
  );
}

export default Header;