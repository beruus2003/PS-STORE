import { type ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CartSidebar } from "./CartSidebar";

interface LayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}

export function Layout({ children, showFooter = true }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">{children}</main>
      {showFooter && <Footer />}
      <CartSidebar />
    </div>
  );
}
