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
          <Avatar>
            <Avatar.Image alt="User Avatar" src={user.image} />
            <Avatar.Fallback>
              {user?.name?.slice(0, 2).toUpperCase()}
            </Avatar.Fallback>
          </Avatar>
          <Badge
            color={user?.plan === "premium" ? "warning" : "default"}
            variant="flat"
            size="sm"
          >
            {user?.plan === "premium" ? "Premium" : "Free"}
          </Badge>
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
            <div className="flex flex-col gap-2">
              <Label>{user?.name}</Label>
              <Description>{user?.email}</Description>
            </div>
          </Dropdown.Item>

          <Separator />
          {user?.plan === "free" ? (
            <Dropdown.Item id="pricing">
              <Label className="text-violet-600  ">Upgrade</Label>
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
