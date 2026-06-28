import { Navbar } from "@/components/shared/Navbar";
import React from "react";
import { DM_Sans, Inter } from "next/font/google";

export const metadata = {
  title: "Startups | StartupForge",
  description: "StartupForge Startups. Browse all registered startups now!",
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});
const StartupsPageLayout = ({ children }) => {
  return (
    <>
      <Navbar></Navbar>
      <div className={inter.className}>{children}</div>
    </>
  );
};

export default StartupsPageLayout;
