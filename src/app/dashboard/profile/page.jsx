import { ProfileForm } from "@/components/dashboard/profile/ProfileForm";
import { getUserSession } from "@/lib/core/session";
import React from "react";

export const ProfilePage = async () => {
  const user = await getUserSession();
  return <ProfileForm initialUser={user} />;
};

export default ProfilePage;
