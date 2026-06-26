import { ProfileForm } from "@/components/dashboard/profile/ProfileForm";
import { getUserSession } from "@/lib/core/session";
import React from "react";


export const ProfilePage = async () => {
const user = await getUserSession();
  return (
    <div className="max-w-[1140px] mx-auto px-6 py-10 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
           <p>Profile Settings</p>
        </h1>
        <p className="text-sm text-default-500">
          Manage your personal digital identity details, avatar, and active status levels.
        </p>
      </div>

      {/* Passing server data directly into the interactive client form */}
      <ProfileForm initialUser={user} />
    </div>
  );
};

export default ProfilePage;