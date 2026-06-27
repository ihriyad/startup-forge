"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Input, Button, Card, Spinner, TextArea, Label, Badge } from "@heroui/react";
import {
  FiUploadCloud,

  FiInfo,
} from "react-icons/fi";
import { toast } from "sonner";
import { updateUser } from "@/lib/actions/users";

export const ProfileForm = ({ initialUser }) => {
  const [user, setUser] = useState({
    id: initialUser?.id || "",
    name: initialUser?.name || "",
    email: initialUser?.email || "",
    role: initialUser?.role || "",
    location: initialUser?.location || "",
    image: initialUser?.image || "",
  });

  const [previewImage, setPreviewImage] = useState(initialUser?.image || null);
  const [uploadedUrl, setUploadedUrl] = useState(initialUser?.image || null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (previewImage && previewImage.startsWith("blob:")) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleTriggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (previewImage && previewImage.startsWith("blob:")) {
      URL.revokeObjectURL(previewImage);
    }

    const localBlobUrl = URL.createObjectURL(file);
    setPreviewImage(localBlobUrl);
    setIsUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        },
      );

      const resData = await response.json();

      if (resData.success) {
        const secureUrl = resData.data.url;
        setUploadedUrl(secureUrl);
      } else {
        toast.error("ImgBB image upload failed.");
      }
    } catch (err) {
      toast.error("Network issue uploading your image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    const updatedData = {
      name: user.name.trim(),
      location: user.location.trim(),
      image: uploadedUrl,
    };

    try {
      const response = await updateUser(user.id, updatedData);

      if (response && (response.modifiedCount > 0 || response.acknowledged)) {
        toast.success("Profile updated perfectly!");
      } else {
        toast.error("Failed to sync profile changes.");
      }
    } catch (err) {
      toast.error(err?.message || "An error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  const getInitials = () => {
    if (!user.name) return "U";
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };
// console.log(user)
  return (
    <div className="mx-auto my-12 px-4 w-full">
      <div className="mb-8 text-left">
        <h1 className="text-3xl font-medium tracking-tight text-foreground">
          Account Settings
        </h1>
        <p className="text-sm text-default-500 mt-1">
          Manage your public profile information, location attributes, and
          identity metadata.
        </p>
      </div>

      <form onSubmit={handleSaveChanges} className="space-y-8">
        {/* Profile Image Card */}
        <Card className="p-6">
          <Card.Content className="flex flex-col items-center justify-center gap-4 py-4">
            <div className="relative w-[140px] h-[140px] rounded-full overflow-hidden border-4 border-violet-600 shadow-md bg-violet-50 flex items-center justify-center">
              {previewImage ? (
                <Image
                  src={previewImage}
                  alt="Avatar Preview"
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <span className="text-3xl font-bold text-violet-700 tracking-wider">
                  {getInitials()}
                </span>
              )}
              {isUploading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                  <Spinner size="md" color="white" />
                </div>
              )}
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />

            <Button
              type="button"
              onPress={handleTriggerUpload}
              disabled={isUploading || isSaving}
              size="sm"
              variant="bordered"
            
              className="border-violet-600 text-violet-600 hover:bg-violet-50 font-medium px-4"
            >
              {isUploading ? "Uploading..." : "Upload Photo"}
            </Button>
          </Card.Content>
        </Card>

        {/* Profile Details Card */}
        <Card className=" border-2 border-dashed border-violet-600   p-2">
          <Card.Header className="px-6 pt-6 pb-2 flex flex-col items-start">
            <Card.Title className="text-xl font-semibold text-foreground">
              Personal Information
            </Card.Title>
            <Card.Description className="text-xs text-default-400 mt-0.5">
              Update your core identification properties.
            </Card.Description>
          </Card.Header>

          <Card.Content className="flex flex-col gap-6 px-6 pb-6 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Label>Full Name</Label>
              <input
                label="Full Name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={user.name}
                onChange={handleInputChange}
                variant="bordered"
                radius="md"
                size="lg"
                className="w-full border-b-2 border-violet-600 outline-none p-2"
              />
              <Label>Email</Label>
              <TextArea
                label="Email Address"
                name="email"
                type="email"
                placeholder="email@example.com"
                value={user.email}
                disabled
                variant="flat"
                radius="md"
                size="lg"
                className="w-full opacity-70 cursor-not-allowed"
              />
              <Label>Role</Label>
              <TextArea
                label="Professional Role"
                name="role"
                type="text"
                placeholder="Developer"
                value={user.role}
                disabled
                variant="flat"
                radius="md"
                size="lg"
                className="w-full opacity-70 cursor-not-allowed"
              />
              <Label>Location</Label>
              <input
                label="Current Location"
                name="location"
                type="text"
                placeholder="e.g. San Francisco, CA"
                value={user.location}
                onChange={handleInputChange}
                variant="bordered"
                radius="md"
                size="lg"
                className="w-full border-b-2 border-violet-600 outline-none p-2"
              />
            </div>

            {/* Info Message Card */}
            <div className="flex items-start gap-3 bg-violet-50 border border-violet-100 text-violet-700 p-4 rounded-xl text-sm leading-relaxed mt-2">
              <FiInfo className="text-lg flex-shrink-0 mt-0.5" />
              <p>
                Email and Role are managed by the authentication system and
                cannot be edited.
              </p>
            </div>

            <div className="flex justify-end items-center pt-4 border-t border-default-100">
              <Button
                type="submit"
                radius="md"
                disabled={isUploading || isSaving}
                className="bg-violet-600 text-white font-semibold text-sm px-8 h-12 hover:bg-violet-700 transition-colors shadow-sm min-w-[140px]"
              >
                {isSaving ? (
                  <div className="flex items-center gap-2">
                    <span>Saving...</span>
                    <Spinner size="sm" color="white" />
                  </div>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </Card.Content>
        </Card>
      </form>
    </div>
  );
};
