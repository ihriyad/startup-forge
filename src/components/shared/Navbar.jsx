"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "@heroui/react";
import { FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import ProfileDropdown from "../ui/ProfileDropdown";

import { Instrument_Sans } from "next/font/google";

const instrument = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Browse Startups", href: "/startups" },
    { label: "Browse Opportunities", href: "/opportunities" },
    { label: "Pricing", href: "/pricing" },
  ];
  const dashboardLinks = {
    collaborator: "/dashboard/collaborator",
    founder: "/dashboard/founder",
    admin: "/dashboard/admin",
  };

  if (user) {
    navLinks.push({
      label: "Dashboard",
      href: dashboardLinks[user?.role || "collaborator"],
    });
  }

  const isActive = (href) => {
    if (href.startsWith("/dashboard")) {
      return pathname.startsWith("/dashboard");
    }
    if (href.startsWith("/startups")) {
      return pathname.startsWith("/startups");
    }
    if (href.startsWith("/opportunities")) {
      return pathname.startsWith("/opportunities");
    }
    return pathname === href;
  };

  const navContent = (
    <ul className="flex flex-col md:flex-row md:items-center text-sm gap-1 p-4 md:p-0">
      {navLinks.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            onClick={() => setIsMenuOpen(false)}
            className={`flex items-center px-4 h-12 md:h-20 text-[16px] 
              ${
                isActive(link.href)
                  ? "border-b-2 border-violet-600 text-violet-600"
                  : "hover:text-violet-600"
              }`}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <nav className={`${instrument.className} w-full relative z-50`}>
      <div className="px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-1 font-medium text-xl tracking-tight text-foreground"
        >
          <Image src="/images/logo.png" width={60} height={60} alt="Logo" />
          <span>
            Startup<span className="text-violet-600">Forge</span>®
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-6">{navContent}</div>

          <span>
            <Separator orientation="vertical" className="bg-gray-400 h-7" />
          </span>

          {user ? (
            <ProfileDropdown user={user}></ProfileDropdown>
          ) : (
            <>
              <Link
                href="/login"
                className={`flex items-center h-20 px-2 text-[16px] ${
                  isActive("/login")
                    ? "border-b-2 border-violet-600 text-violet-600"
                    : "hover:text-violet-600"
                }`}
              >
                Login
              </Link>
              <Link
                href="/register"
                className={`flex items-center h-20 px-2 text-[16px] ${
                  isActive("/register")
                    ? "border-b-2 border-violet-600 text-violet-600"
                    : "hover:text-violet-600"
                }`}
              >
                Sign-Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Burger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-foreground-500 hover:text-foreground transition-colors focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full border-b border-default-100 bg-background z-40 px-6 py-4 flex flex-col gap-2 shadow-lg">
          {navContent}

          <Separator className="bg-default-100 my-1" />

          <div className="flex flex-col gap-1 pb-2">
            {user ? (
              <>
                <p>Welcome, {user?.name}</p>
              </>
            ) : (
              <>
                {" "}
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center px-4 h-12 text-[16px] ${
                    isActive("/login")
                      ? "border-b-2 border-violet-600 text-violet-600"
                      : "hover:text-violet-600"
                  }`}
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center px-4 h-12 text-[16px] ${
                    isActive("/register")
                      ? "border-b-2 border-violet-600 text-violet-600"
                      : "hover:text-violet-600"
                  }`}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
