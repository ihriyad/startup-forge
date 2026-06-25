"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Drawer, Button } from "@heroui/react";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";

const NAV_CONFIG = {
  admin: [
    { label: "Overview", href: "/dashboard/admin" },
    { label: "Manage Users", href: "/dashboard/admin/manage-users" },
    { label: "Manage Startups", href: "/dashboard/admin/manage-startups" },
    { label: "Transactions", href: "/dashboard/admin/transactions" },
  ],
  founder: [
    { label: "Overview", href: "/dashboard/founder" },
    { label: "My Startup", href: "/dashboard/founder/my-startup" },
    { label: "Add Opportunity", href: "/dashboard/founder/add-opportunity" },
    {
      label: "Manage Opportunities",
      href: "/dashboard/founder/manage-opportunities",
    },
    { label: "Applications", href: "/dashboard/founder/applications" },
  ],
  collaborator: [
    { label: "Overview", href: "/dashboard/collaborator" },
    {
      label: "My Applications",
      href: "/dashboard/collaborator/my-applications",
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
        className={`px-3 py-2 rounded-md text-sm transition-colors ${
          pathname === link.href
            ? "bg-violet-600 text-white"
            : "hover:bg-default-100 text-foreground-600"
        }`}
      >
        {link.label}
      </Link>
    ))}
  </nav>
);

export const Sidebar = ({ role, user }) => {
  const pathname = usePathname();
  const links = NAV_CONFIG[role] || [];

  const profileLink = (onNavigate) => (
    <Link
      href="/dashboard/profile"
      onClick={onNavigate}
      className={`px-3 py-2 rounded-md text-sm transition-colors ${
        pathname === "/dashboard/profile"
          ? "bg-violet-600 text-white"
          : "hover:bg-default-100 text-foreground-600"
      }`}
    >
      Profile
    </Link>
  );

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <aside className="hidden md:flex w-64 min-h-screen border-r border-default-100 flex-col p-4 gap-6 sticky top-0">
        {/* User Info */}
        <div className="flex flex-col gap-1 px-2 pt-2">
          <p className="text-sm font-semibold">{user.name}</p>
          <p className="text-xs text-default-400 capitalize">{role}</p>
        </div>

        {/* Nav Links */}
        <NavLinks links={links} pathname={pathname} />

        {/* Profile at bottom */}
        <div className="mt-auto flex flex-col gap-1">{profileLink()}</div>
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
                    <div className="flex flex-col gap-0.5">
                      <p className="text-sm font-semibold">{user.name}</p>
                      <p className="text-xs text-default-400 capitalize">
                        {role}
                      </p>
                    </div>
                  </Drawer.Heading>
                </Drawer.Header>

                <Drawer.Body className="flex flex-col gap-4 px-3">
                  <NavLinks links={links} pathname={pathname} />
                </Drawer.Body>

                <Drawer.Footer className="flex flex-col gap-1 px-3 pb-6">
                  {profileLink()}
                </Drawer.Footer>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
      </div>
    </>
  );
};
