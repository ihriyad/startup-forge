import { Banner } from "@/components/home/Banner";
import { SuccessStories } from "@/components/home/SuccessStories";
import { Footer } from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";

export default function Home() {

  return <section>

    <Navbar></Navbar>
    <Banner></Banner>
    <SuccessStories></SuccessStories>
    <Footer></Footer>
    
  </section>
}
