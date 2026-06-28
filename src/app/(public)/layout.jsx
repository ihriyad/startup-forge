import React from "react";
import { Instrument_Sans } from "next/font/google";
import { Figtree } from "next/font/google";

const instrument = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});
const PublicPageLayout = ({ children }) => {
  return <div className={figtree.className}>{children}</div>;
};

export default PublicPageLayout;
