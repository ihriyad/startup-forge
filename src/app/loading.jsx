"use client";

import Image from "next/image";

export default function GlobalLoadingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Image
        width={20}
        height={20}
        src="/images/Forge2.png"
        alt="Loading…"
        className="w-20 h-20 object-contain animate-[pulse-opacity_3s_ease-in-out_infinite]"
      />
    </div>
  );
}
