"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Drawer, Button, Avatar, Badge } from "@heroui/react";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import React from "react";

import {
  LuLayoutDashboard,
  LuUsers,
  LuBuilding2,
  LuDollarSign,
  LuUser,
  LuSquarePlus,
  LuLayers,
  LuFileText,
} from "react-icons/lu";

export const NAV_CONFIG = {
  admin: [
    {
      label: "Overview",
      href: "/dashboard/admin",
      icon: <LuLayoutDashboard className="w-4 h-4" />,
    },
    {
      label: "Manage Users",
      href: "/dashboard/admin/manage-users",
      icon: <LuUsers className="w-4 h-4" />,
    },
    {
      label: "Manage Startups",
      href: "/dashboard/admin/manage-startups",
      icon: <LuBuilding2 className="w-4 h-4" />,
    },
    {
      label: "Transactions",
      href: "/dashboard/admin/transactions",
      icon: <LuDollarSign className="w-4 h-4" />,
    },
    {
      label: "Profile",
      href: "/dashboard/profile",
      icon: <LuUser className="w-4 h-4" />,
    },
  ],
  founder: [
    {
      label: "Overview",
      href: "/dashboard/founder",
      icon: <LuLayoutDashboard className="w-4 h-4" />,
    },
    {
      label: "My Startup",
      href: "/dashboard/founder/my-startup",
      icon: <LuBuilding2 className="w-4 h-4" />,
    },
    {
      label: "Add Opportunity",
      href: "/dashboard/founder/add-opportunity",
      icon: <LuSquarePlus className="w-4 h-4" />,
    }, // Fixed here
    {
      label: "Manage Opportunities",
      href: "/dashboard/founder/manage-opportunities",
      icon: <LuLayers className="w-4 h-4" />,
    },
    {
      label: "Applications",
      href: "/dashboard/founder/applications",
      icon: <LuFileText className="w-4 h-4" />,
    },
    {
      label: "Profile",
      href: "/dashboard/profile",
      icon: <LuUser className="w-4 h-4" />,
    },
  ],
  collaborator: [
    {
      label: "Overview",
      href: "/dashboard/collaborator",
      icon: <LuLayoutDashboard className="w-4 h-4" />,
    },
    {
      label: "My Applications",
      href: "/dashboard/collaborator/my-applications",
      icon: <LuFileText className="w-4 h-4" />,
    },
    {
      label: "Profile",
      href: "/dashboard/profile",
      icon: <LuUser className="w-4 h-4" />,
    },
  ],
};

const NavLinks = ({ links, pathname, onNavigate }) => (
  <nav className="flex flex-col gap-1">
    {links.map((link) => (
      <Link
        key={link.href}
        href={link.href}
        onClick={onNavigate}
        className={`px-3 py-2 rounded-md text-sm flex items-center gap-2 ${
          pathname === link.href
            ? "bg-violet-600 text-white"
            : "hover:text-violet-700"
        }`}
      >
        {link.icon} {link.label}
      </Link>
    ))}
  </nav>
);

export const Sidebar = ({ role, user }) => {
  const pathname = usePathname();
  const links = NAV_CONFIG[role] || [];

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <aside className="hidden md:flex w-64 min-h-screen border-r border-default-100 flex-col p-4 gap-6 sticky top-0">
        {/* User Info */}
        <div className="flex  border-b rounded-none border-default-100 py-3 px-2 ">
          <div className="flex gap-3 items-center">
            <Badge.Anchor>
              <Avatar size="md">
                <Avatar.Image alt="user avatar" src={user?.image} />
                <Avatar.Fallback>
                  {user?.name?.slice(0, 2).toUpperCase()}
                </Avatar.Fallback>
              </Avatar>
              <Badge color="success" placement="bottom-right" size="sm" />
            </Badge.Anchor>
            <div className="space-y-2">
              <p className="text-sm font-semibold">{user.name}</p>
              <p className="text-xs text-default-400 capitalize">
                {user?.role === "founder" ? (
                  user?.plan === "premium" ? (
                    // Premium badge
                    <span className="relative inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold overflow-hidden bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 text-amber-900 shadow-sm">
                      {/* shimmer sweep */}
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-[shimmer_2s_infinite] bg-[length:200%_100%]" />
                      {/* star icon */}

                      <span className="relative">Founder</span>
                    </span>
                  ) : (
                    // Free badge — subtle violet pulse
                    <span className="relative inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-300">
                      Founder
                    </span>
                  )
                ) : user?.role === "admin" ? (
                  // Admin badge — solid dark with ping dot
                  <span className="relative inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-800 dark:bg-slate-700 text-slate-100 shadow-sm">
                    <span className="relative flex h-1.5 w-1.5 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-slate-300" />
                    </span>
                    Admin
                  </span>
                ) : (
                  <span className="text-sm">Collaborator</span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <NavLinks links={links} pathname={pathname} />
      </aside>

      {/* ── Mobile Drawer ── */}
      <div className="md:hidden">
        <Drawer>
          {/* This button is the drawer trigger */}
          <Button
            isIconOnly
            variant="light"
            className="fixed top-4 left-4 z-50"
            aria-label="Open sidebar"
          >
            <TbLayoutSidebarLeftCollapse size={22} />
          </Button>

          <Drawer.Backdrop>
            <Drawer.Content placement="left">
              <Drawer.Dialog>
                <Drawer.CloseTrigger />

                <Drawer.Header>
                  <Drawer.Heading>
                    {/* User Info */}
                    <div className="flex border rounded-md border-violet-600/30 p-1 gap-1 px-2 pt-2">
                      <Avatar>
                        <Avatar.Image alt="Avatar user" src={user?.image} />
                        <Avatar.Fallback>
                          {user?.name?.slice(0, 2).toUpperCase()}
                        </Avatar.Fallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold">{user.name}</p>
                        <p className="text-xs text-default-400 capitalize">
                          {role}
                        </p>
                      </div>
                    </div>
                  </Drawer.Heading>
                </Drawer.Header>

                <Drawer.Body className="flex flex-col gap-4 px-3">
                  <NavLinks links={links} pathname={pathname} />
                </Drawer.Body>

                <Drawer.Footer></Drawer.Footer>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
      </div>
    </>
  );
};
