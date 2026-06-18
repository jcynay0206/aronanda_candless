import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppFloat from "../components/WhatsAppFloat";
import CartDrawer from "../components/CartDrawer";
import ScrollToHash from "../components/ScrollToHash";

export default function SiteLayout() {
  return (
    <div className="font-sans text-espresso bg-marfil">
      <ScrollToHash />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
      <CartDrawer />
    </div>
  );
}
