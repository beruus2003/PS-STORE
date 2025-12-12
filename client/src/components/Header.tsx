import { Link, useLocation } from "wouter";
import { ShoppingCart, Menu, Sun, Moon, User, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/context/ThemeContext";
import { useCartContext } from "@/context/CartContext";
import logoUrl from "@assets/PS_STORE_1765393444481.jpg";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/produtos", label: "Produtos" },
  { href: "/categorias", label: "Categorias" },
];

export function Header() {
  const [location] = useLocation();
  const { user, isAuthenticated, isOwner } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { itemCount, setIsOpen } = useCartContext();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" data-testid="button-mobile-menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <span
                      className={`text-lg font-medium transition-colors hover-elevate rounded-md px-3 py-2 block ${
                        location === link.href
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                      data-testid={`link-mobile-${link.label.toLowerCase()}`}
                    >
                      {link.label}
                    </span>
                  </Link>
                ))}
                {isOwner && (
                  <Link href="/admin">
                    <span className="text-lg font-medium text-muted-foreground hover-elevate rounded-md px-3 py-2 block" data-testid="link-mobile-admin">
                      Admin
                    </span>
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/">
            <div className="flex items-center gap-3" data-testid="link-logo">
              <img
                src={logoUrl}
                alt="PS Store"
                className="h-10 w-10 rounded-full object-cover"
              />
              <span className="hidden sm:block text-xl font-bold tracking-tight">
                PS Store
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  className={
                    location === link.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  }
                  data-testid={`link-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
            {isOwner && (
              <Link href="/admin">
                <Button variant="ghost" className="text-muted-foreground" data-testid="link-admin">
                  Admin
                </Button>
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            data-testid="button-theme-toggle"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => setIsOpen(true)}
            data-testid="button-cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
          </Button>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full" data-testid="button-user-menu">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.profileImageUrl || undefined} alt={user?.firstName || "User"} />
                    <AvatarFallback>
                      {user?.firstName?.[0] || user?.email?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{user?.firstName || "Usuário"}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
                <DropdownMenuSeparator />
                {isOwner && (
                  <>
                    <Link href="/admin">
                      <DropdownMenuItem data-testid="menu-admin">
                        <Settings className="mr-2 h-4 w-4" />
                        Painel Admin
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem asChild>
                  <a href="/api/logout" data-testid="menu-logout">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sair
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild data-testid="button-login">
              <a href="/api/login">
                <User className="mr-2 h-4 w-4" />
                Entrar
              </a>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
