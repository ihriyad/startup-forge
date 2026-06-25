"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button, Separator, Spinner } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("collaborator"); // default role
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    // project spec: min 6 chars, one uppercase, one lowercase
    if (
      user.password.length < 6 ||
      !/[A-Z]/.test(user.password) ||
      !/[a-z]/.test(user.password)
    ) {
      toast.error("Password must be 6+ chars with uppercase and lowercase.");
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await authClient.signUp.email({
        name: user.name,
        email: user.email,
        password: user.password,
        role, 
      });

      if (data) {
        toast.success("SignUp Success");
        router.push("/");
        router.refresh();
      }
      if (error) {
        toast.error(error.message || "Sign up failed");
        setIsLoading(false);
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
      setIsLoading(false);
    }
  };

  const handleGoogleSignin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
      });
    } catch (err) {
      toast.error("Google login failed");
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] w-full flex items-center justify-center bg-background ">
      <div className="col-span-1 lg:col-span-5 flex items-center justify-center p-8 md:p-16 ">
        <div className="w-full max-w-[420px] flex flex-col gap-5">
          {/* Custom Logo Header Frame */}
          <div className="flex flex-col gap-1 text-center items-center">
            <Link
              href="/"
              className="flex items-center gap-1 font-medium text-xl tracking-tight text-foreground mb-2"
            >
              <Image
                src="/images/logo.png"
                width={48}
                height={48}
                alt="Logo"
                priority
              />
              <span>
                Startup<span className="text-violet-600">Forge</span>®
              </span>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Create Account
            </h1>
            <p className="text-foreground-500 text-sm">
              Find your next opportunity!
            </p>
          </div>

          {/* Social Access Button Block */}
          <Button
            onClick={handleGoogleSignin}
            disabled={isLoading}
            type="button"
            variant="bordered"
            className="w-full rounded-none border border-violet-600 hover:bg-default-100 h-11 font-medium text-sm text-foreground transition-all duration-200"
          >
            <FcGoogle className="text-md" /> Sign up with Google
          </Button>

          {/* Layout Partition Line */}
          <div className="flex items-center gap-3 w-full">
            <Separator className="flex-1 bg-default-100" />
            <span className="text-xs text-default-400 whitespace-nowrap">
              or Sign up with Email
            </span>
            <Separator className="flex-1 bg-default-100" />
          </div>

          {/* Registration Entry Flow Forms */}
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-3.5">
              <div>
                <label className="text-xs mb-1 block">Full Name</label>
                <input
                  required
                  name="name"
                  type="text"
                  placeholder="Enter Your full name"
                  disabled={isLoading}
                  className="w-full outline-none border-b-2 border-violet-600 p-2"
                />
              </div>

              <div>
                <label className="text-xs mb-1 block">Email</label>
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  disabled={isLoading}
                  className="w-full outline-none border-b-2 border-violet-600 p-2"
                />
              </div>

              <div>
                <label className="text-xs mb-1 block">Password</label>
                <div className="flex items-center">
                  <input
                    required
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    disabled={isLoading}
                    className="w-full outline-none border-b-2 border-violet-600 p-2"
                  />
                </div>
              </div>
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-sm text-default-400 hover:text-violet-600 transition-colors z-10 cursor-pointer"
                >
                  {showPassword ? <p>Hide password</p> : <p>Show password</p>}
                </button>
              </div>

              {/* Role Selection */}
              <div>
                <label className="text-xs mb-2 block">Add your role</label>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input
                      type="radio"
                      name="role"
                      value="collaborator"
                      checked={role === "collaborator"}
                      onChange={(e) => setRole(e.target.value)}
                      disabled={isLoading}
                      className="accent-violet-600"
                    />
                    Collaborator
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input
                      type="radio"
                      name="role"
                      value="founder"
                      checked={role === "founder"}
                      onChange={(e) => setRole(e.target.value)}
                      disabled={isLoading}
                      className="accent-violet-600"
                    />
                    Founder
                  </label>
                </div>
              </div>
            </div>

            {/* Action Submit Control CTA */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-violet-600 rounded-none p-5 font-semibold text-sm transition-all duration-200"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <span>Creating Account...</span>
                  <Spinner size="sm" color="white" />
                </div>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>

          {/* Regulatory Platform Acceptance Conditions Text */}
          <p className="text-[11px] text-default-400 text-center leading-relaxed px-4">
            By continuing you accept our standard{" "}
            <Link
              href="/terms"
              className="text-foreground underline font-medium hover:text-violet-600"
            >
              terms and conditions
            </Link>{" "}
            and our{" "}
            <Link
              href="/privacy"
              className="text-foreground underline font-medium hover:text-violet-600"
            >
              privacy policy
            </Link>
            .
          </p>

          <Separator className="bg-default-100 my-1" />

          {/* Account Shift Redirect Option */}
          <div className="text-center">
            <p className="text-sm text-foreground-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-foreground font-semibold underline hover:text-violet-600 transition-colors"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
