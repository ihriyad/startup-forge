// src/lib/auth-client.js
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL, // NEXT_PUBLIC_ prefix is required for client-side env vars
});

export const { signIn, signUp, signOut, useSession } = authClient;
