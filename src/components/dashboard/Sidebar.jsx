"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Drawer, Button, Avatar } from "@heroui/react";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import React, { useRef } from "react";

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
    },
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

// ── Role

const RoleBadge = ({ role, plan }) => {
  if (role === "founder") {
    return plan === "premium" ? (
      <span className="relative inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold overflow-hidden bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 text-amber-900 shadow-sm">
        <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/50 to-transparent animate-[shimmer_2s_infinite] bg-[length:200%_100%]" />
        <span className="relative">Founder</span>
      </span>
    ) : (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-300">
        Founder
      </span>
    );
  }

  if (role === "admin") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-800 dark:bg-slate-700 text-slate-100 shadow-sm">
        <span className="relative flex h-1.5 w-1.5 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-slate-300" />
        </span>
        Admin
      </span>
    );
  }

  return <span className="text-xs text-default-400">Collaborator</span>;
};

// ── User info card

const UserInfo = ({ user, avatarSize = "md" }) => (
  <div className="flex items-center gap-3 border-b border-default-100 py-3 px-2">
    <div className="border-2 border-violet-600 p-0.5 rounded-full shrink-0">
      <Avatar size={avatarSize}>
        <Avatar.Image alt="user avatar" src={user?.image} />
        <Avatar.Fallback>
          {user?.name?.slice(0, 2).toUpperCase()}
        </Avatar.Fallback>
      </Avatar>
    </div>
    <div className="space-y-1 min-w-0">
      <p className="text-sm font-semibold truncate">{user?.name}</p>
      <RoleBadge role={user?.role} plan={user?.plan} />
    </div>
  </div>
);

// ── Nav links

const NavLinks = ({ links, pathname, onNavigate }) => (
  <nav className="flex flex-col gap-1">
    {links.map((link) => (
      <Link
        key={link.href}
        href={link.href}
        onClick={onNavigate}
        className={`px-3 py-2 rounded-md text-sm flex items-center gap-2 transition-colors ${
          pathname === link.href
            ? "bg-violet-600 text-white"
            : "text-default-600 hover:text-violet-700"
        }`}
      >
        {link.icon}
        {link.label}
      </Link>
    ))}
  </nav>
);

// ── Sidebar

export const Sidebar = ({ role, user }) => {
  const pathname = usePathname();
  const links = NAV_CONFIG[role] ?? [];
  const closeRef = useRef(null);

  const handleNavigate = () => {
    // Programmatically click the hidden close trigger on mobile
    closeRef.current?.click();
  };

  return (
    <>
      {/* Desktop */}
      <aside className="hidden md:flex w-64 min-h-screen border-r border-default-100 flex-col p-4 gap-6 sticky top-0">
        <UserInfo user={user} />
        <NavLinks links={links} pathname={pathname} />
      </aside>

      {/* Mobile drawer */}
      <div className="md:hidden">
        <Drawer>
          <Button
            variant="secondary"
            className="fixed top-16 left-4 z-50 rounded-md text-violet-600"
            aria-label="Open sidebar"
          >
            <TbLayoutSidebarLeftCollapse size={22} />
            Menu
          </Button>

          <Drawer.Backdrop>
            <Drawer.Content placement="left">
              <Drawer.Dialog>
                {/* Hidden close trigger — clicked programmatically on nav */}
                <Drawer.CloseTrigger
                  ref={closeRef}
                  className="sr-only"
                  aria-hidden
                />

                <Drawer.Header>
                  <Drawer.Heading>
                    <UserInfo user={user} avatarSize="sm" />
                  </Drawer.Heading>
                </Drawer.Header>

                <Drawer.Body className="flex flex-col gap-4 px-3 text-sm text-foreground">
                  <NavLinks
                    links={links}
                    pathname={pathname}
                    onNavigate={handleNavigate}
                  />
                </Drawer.Body>

                <Drawer.Footer />
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
      </div>
    </>
  );
};
