"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { FiAlertTriangle, FiRefreshCw } from "react-icons/fi";
import { BiHome } from "react-icons/bi";

export default function GlobalErrorPage({ error, reset }) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <div className="mb-6 rounded-full bg-danger/10 p-6">
        <FiAlertTriangle className="text-5xl text-danger" />
      </div>

      <h1 className="mb-3 text-3xl font-bold">Something went wrong</h1>

      <p className="mb-8 max-w-md text-default-500">
        We encountered an unexpected error while processing your request. Please
        try again or return to the homepage.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <Button
          color="primary"
         
          onPress={() => reset()}
        >
        <FiRefreshCw />  Try Again
        </Button>

        <Button as={Link} href="/" variant="bordered" >
        <BiHome />  Back Home
        </Button>
      </div>

      {process.env.NODE_ENV === "development" && error && (
        <pre className="mt-8 max-w-3xl overflow-auto rounded-lg bg-default-100 p-4 text-left text-xs">
          {error.message}
        </pre>
      )}
    </div>
  );
}
