"use client";

import Link from "next/link";
import { Button } from "@heroui/react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-7xl font-bold text-primary">404</h1>

      <h2 className="mt-4 text-3xl font-semibold">Page Not Found</h2>

      <p className="mt-3 max-w-md text-default-500">
        The page you are looking for does not exist or has been moved.
      </p>

      <Link href="/">
        <Button color="primary" className="mt-6">
          Back Home
        </Button>
      </Link>
    </div>
  );
}
