"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@heroui/react";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { FaLinkedin, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

// Modular layout datasets
const FOOTER_LINKS = [
  {
    title: "For Collaborators",
    links: [
      { label: "Explore Opportunities", href: "/browse-opportunities" },
      { label: "Browse Startups", href: "/browse-startups" },
      { label: "Personal Profile", href: "/dashboard/profile" },
    ],
  },
  {
    title: "For Founders",
    links: [
      { label: "Premium Pricing", href: "/pricing" },
      { label: "Founder Overview", href: "/dashboard" },
      { label: "Post Requirement", href: "/dashboard/founder/add-opportunity" },
    ],
  },
];

const CONTACT_INFO = [
  { icon: FiMail, text: "support@startupforge.com", href: "mailto:support@startupforge.com" },
  { icon: FiPhone, text: "+880 19 36730675", href: null },
  { icon: FiMapPin, text: "Pabna, Dhaka, Bangladesh", href: null },
];

const SOCIAL_LINKS = [
  { icon: FaLinkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: FaFacebook, label: "Facebook", href: "https://facebook.com" },
  { icon: FaInstagram, label: "Instagram", href: "https://instagram.com" },
  { icon: FaTwitter, label: "Twitter", href: "https://twitter.com" },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full  pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
        
        {/* Column 1: Custom Branding Block */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <Link
            href="/"
            className="flex items-center gap-1 font-medium text-xl tracking-tight text-foreground"
          >
            <Image
              src={"/images/logo.png"}
              width={60}
              height={60}
              alt="Logo"
            />
            <span className="">
              Startup<span className="text-violet-600">Forge</span>®
            </span>
          </Link>
          <p className="text-sm leading-relaxed max-w-xs">
            We bridge the gap between ambitious startup founders and top-tier collaborative talent globally. Build your dream team today.
          </p>
        </div>

        {/* Columns 2 & 3: Dynamic Nav Render via Array Map */}
        {FOOTER_LINKS.map((section) => (
          <div key={section.title} className="flex flex-col gap-4">
            <h4 className="text-xs font-bold tracking-wider uppercase text-violet-600">
              {section.title}
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              {section.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-violet-600 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Column 4: Contact Information Array Map */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-bold tracking-wider uppercase text-violet-600">
            Contact Info
          </h4>
          <ul className="flex flex-col gap-3 text-sm ">
            {CONTACT_INFO.map((item, index) => {
              const Icon = item.icon;
              return (
                <li key={index} className="flex items-center gap-2">
                  <Icon className="text-violet-600 flex-shrink-0" />
                  {item.href ? (
                    <a href={item.href} className="hover:text-violet-600 transition-colors">
                      {item.text}
                    </a>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Column 5: Social Channels Array Map */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-bold tracking-wider uppercase text-violet-600">
            Social Networks
          </h4>
          <ul className="flex flex-col gap-2.5 text-sm">
            {SOCIAL_LINKS.map((social) => {
              const SocialIcon = social.icon;
              return (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 hover:text-violet-600 transition-colors"
                  >
                    <SocialIcon className="text-violet-600 text-base" /> {social.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

      </div>

      {/* Modern Separator Integration */}
      <div className="max-w-[1280px] mx-auto px-6">
        <Separator className="bg-slate-800 mb-6" />
      </div>

      {/* Bottom Legal Utility Bar */}
      <div className="max-w-[1280px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>
          &copy; {currentYear} StartupForge. All rights reserved.
        </div>
        <div className="flex items-center gap-4">
          <Link href="/terms" className="hover:text-slate-400 transition-colors">
            Terms of Service
          </Link>
          <Link href="/privacy" className="hover:text-slate-400 transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};