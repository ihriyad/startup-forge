import { Navbar } from "@/components/shared/Navbar";
import { Inter } from "next/font/google";
import React from "react";

export const metadata = {
  title: "Opportunities | StartupForge",
  description: "StartupForge Opportunities. Browse All Opportunities you need Today!",
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});
const OpportunityLayoutPage = ({ children }) => {
  return (
    <>
      <Navbar></Navbar>
    <div className={inter.className}>
      {children}
    </div>
    </>
  );
};

export default OpportunityLayoutPage;
