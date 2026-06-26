"use server";

const baseUrl = process.env.NEXT_PUBLIC_SERVER;

export const publicFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  return res.json();
};

export const securedFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  return res.json();
};

export const serverMutation = async (path, data, method = "POST") => {
  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },

    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error(`Request failed: ${res.status}`);

  return res.json();
};
