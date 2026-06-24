"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Separator } from "@heroui/react";
import { FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";

export const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Browse Startups", href: "/startups" },
    { label: "Browse Opportunities", href: "/opportunities" },
    { label: "Pricing", href: "/pricing" },
  ];

  //   const dashboardLinks = {
  //     seeker: "/dashboard/seeker",
  //     recruiter: "/dashboard/recruiter",
  //     admin: "/dashboard/admin",
  //   };

  const isActive = (href) => {
    if (href === "/dashboard/recruiter") {
      return pathname === href || pathname.startsWith(`${href}/`);
    }
    return pathname === href;
  };
  const user = "r";
  const visibleLinks = navLinks.filter((link) => !link.isPrivate || user);

  const navContent = (
    <ul className="flex flex-col md:flex-row md:items-center text-sm gap-1 p-4 md:p-0">
      {visibleLinks.map((link) => {
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center px-4 h-20 text-[16px] 
                    ${
                      isActive(link.href)
                        ? "border-b-2 border-violet-600 text-violet-600 "
                        : "hover:text-violet-600"
                    }`}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <nav className="w-full">
      <div className="px-6 h-20 flex items-center justify-between">
        {/* Left Side: Logo & Main Navigation Links */}
        <div>
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-1 font-medium text-xl tracking-tight text-foreground"
          >
            <Image
              src={"/images/logo.png"}
              width={60}
              height={60}
              alt="Logo"
            ></Image>
            <span>
              Startup<span className="text-violet-600">Forge</span>®
            </span>
          </Link>
        </div>

        {/* Right Side: Pricing Flow + Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-6">{navContent}</div>
          <div>
            <Separator orientation="vertical" className="bg-gray-400 h-7" />
          </div>

          <Link href={"/login"} className="hover:text-blue-600 ">
          Login
          </Link>
       <Link href={"/register"} className="hover:text-blue-600 ">
          Sign-Up
          </Link>
        </div>

        {/* Mobile Burger Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-foreground-500 hover:text-foreground transition-colors focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full border-b border-default-100 bg-background/95 backdrop-blur-md px-6 py-4 flex flex-col gap-4 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          {navContent}

          <Separator className="bg-default-100 my-1" />

          <div className="flex flex-col gap-3">
            <Button
              variant="bordered"
              radius="sm"
              fullWidth
              onClick={() => setIsMenuOpen(false)}
            >
              Log in
            </Button>
            <Button
              variant="secondary"
              radius="sm"
              fullWidth
              onClick={() => setIsMenuOpen(false)}
            >
              Sign up
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};
