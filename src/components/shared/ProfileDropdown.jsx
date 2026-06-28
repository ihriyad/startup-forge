"use client";
import { authClient } from "@/lib/auth-client";
import {
  Avatar,
  Badge,
  Description,
  Dropdown,
  Label,
  Separator,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import React from "react";

const ProfileDropdown = ({ user }) => {
  const router = useRouter();
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login"); // redirect to login page
        },
      },
    });
  };
  console.log(user);
  return (
    <Dropdown placement="bottom-end">
      <Dropdown.Trigger>
        <Badge.Anchor>
          <Avatar size="sm">
            <Avatar.Image alt="User Avatar" src={user.image} />
            <Avatar.Fallback>
              {user?.name?.slice(0, 2).toUpperCase()}
            </Avatar.Fallback>
          </Avatar>
  
        </Badge.Anchor>
      </Dropdown.Trigger>

      <Dropdown.Popover>
        <Dropdown.Menu
          aria-label="User Menu"
          onAction={(key) => {
            switch (key) {
              case "dashboard":
                router.push("/dashboard");
                break;

              case "profile":
                router.push("/dashboard/profile");
                break;

              case "pricing":
                router.push("/pricing");
                break;

              case "logout":
                handleLogout();
                break;
            }
          }}
        >
          <Dropdown.Item id="user-info" isReadOnly>
            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-2">
                <Label>{user?.name}</Label>
                <Description>{user?.email}</Description>
              </div>
              {/* {user?.role === "founder" ? (
                <span className={user?.plan === "premium" ? "" : ""}>
                  {user?.plan === "premium" ? "Premium" : "Free"}
                </span>
              ) : user?.role === "admin" ? (
                <span className="">Admin</span>
              ) : (
                ""
              )} */}
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
              ) : <span className="text-sm">Collaborator</span>}
            </div>
          </Dropdown.Item>

          <Separator />
          {user?.role === "founder" && user?.plan === "free" ? (
            <Dropdown.Item id="pricing">
              <Label className="text-violet-600">Upgrade</Label>
            </Dropdown.Item>
          ) : (
            <></>
          )}

          <Dropdown.Item id="dashboard">
            <Label>Dashboard</Label>
          </Dropdown.Item>

          <Dropdown.Item id="profile">
            <Label>Profile</Label>
          </Dropdown.Item>

          <Separator />

          <Dropdown.Item id="logout" onAction={handleLogout}>
            <Label className="text-danger">Sign Out</Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
};

export default ProfileDropdown;
