import { Navbar } from "@/components/shared/Navbar";
import React from "react";
import { Urbanist } from "next/font/google";

export const metadata = {
  title: "Pricing | StartupForge",
  description: "StartupForge Pricing for Founders",
};

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});
const PricingLayoutPage = ({ children }) => {
  return (
    <>
      <Navbar></Navbar>
      <div className={urbanist.className}>{children}</div>
    </>
  );
};

export default PricingLayoutPage;
