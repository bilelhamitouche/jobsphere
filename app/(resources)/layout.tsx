import Footer from "@/components/ui/footer";
import Navbar from "@/components/ui/navbar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default Layout;
