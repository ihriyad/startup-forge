"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button, Separator, Spinner } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    try {
      const { data, error } = await authClient.signIn.email({
        email: user.email,
        password: user.password,
      });

      if (data) {
        toast.success("Login Success");
        router.push("/");
        router.refresh();
      }

      if (error) {
        toast.error(error.message || "Login failed");
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
    <div className="min-h-[calc(100vh-64px)] w-full flex items-center justify-center bg-background">
      <div className="col-span-1 lg:col-span-5 flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-[420px] flex flex-col gap-5">
          {/* Logo Header */}
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
              Welcome Back
            </h1>
            <p className="text-foreground-500 text-sm">
              Log in to your account!
            </p>
          </div>

          {/* Google Sign In */}
          <Button
            onClick={handleGoogleSignin}
            disabled={isLoading}
            type="button"
            variant="bordered"
            className="w-full rounded-none border border-violet-600 hover:bg-default-100 h-11 font-medium text-sm text-foreground transition-all duration-200"
          >
            <FcGoogle className="text-md" /> Log in with Google
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-3 w-full">
            <Separator className="flex-1 bg-default-100" />
            <span className="text-xs text-default-400 whitespace-nowrap">
              or Login with Email
            </span>
            <Separator className="flex-1 bg-default-100" />
          </div>

          {/* Login Form */}
          <form
            onSubmit={onSubmit}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-3.5">
              <div>
                <label className="text-xs mb-1 block">Email</label>
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  disabled={isLoading}
                  className="w-full outline-none border-b-2 border-violet-600 p-2 bg-transparent"
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
                    className="w-full outline-none border-b-2 border-violet-600 p-2 bg-transparent"
                  />
                </div>
              </div>
            </div>

            {/* show Password */}
            <div className="text-right">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-sm text-default-400 hover:text-violet-600 transition-colors z-10 cursor-pointer"
              >
                {showPassword ? <p>Hide password</p> : <p>Show password</p>}
              </button>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-violet-600 rounded-none p-5 font-semibold text-sm transition-all duration-200 mt-2"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <span>Logging in...</span>
                  <Spinner size="sm" color="white" />
                </div>
              ) : (
                "Log in"
              )}
              
            </Button>
          </form>

          {/* Terms */}
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

          {/* Redirect to Register */}
          <div className="text-center">
            <p className="text-sm text-foreground-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-foreground font-semibold underline hover:text-violet-600 transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
