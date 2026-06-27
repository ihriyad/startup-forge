import { Navbar } from "@/components/shared/Navbar";
import React from "react";

const OpportunityLayoutPage = ({ children }) => {
  return (
    <div>
      <Navbar></Navbar>
      {children}
    </div>
  );
};

export default OpportunityLayoutPage;
