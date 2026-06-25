import { Navbar } from "@/components/shared/Navbar";
import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const AuthLayout = ({ children }) => {
  return (
    <section>
      <Navbar />
      <div className={geist.className}>{children}</div>
    </section>
  );
};

export default AuthLayout;
