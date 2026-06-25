'use server'

const baseUrl = process.env.NEXT_PUBLIC_BETTER_AUTH_URL

export const serverFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`);
  //auth
  return res.json();
};