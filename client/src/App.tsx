import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/context/ThemeContext";
import { CartProvider } from "@/context/CartContext";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";

import Landing from "@/pages/Landing";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import Categories from "@/pages/Categories";
import ProductDetail from "@/pages/ProductDetail";
import Checkout from "@/pages/Checkout";
import NotFound from "@/pages/not-found";

import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminProducts from "@/pages/admin/AdminProducts";
import AdminProductForm from "@/pages/admin/AdminProductForm";
import AdminCategories from "@/pages/admin/AdminCategories";
import AdminCategoryForm from "@/pages/admin/AdminCategoryForm";
import AdminOrders from "@/pages/admin/AdminOrders";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Switch>
      {isLoading || !isAuthenticated ? (
        <Route path="/">
          <Layout>
            <Landing />
          </Layout>
        </Route>
      ) : (
        <Route path="/">
          <Layout>
            <Home />
          </Layout>
        </Route>
      )}

      <Route path="/produtos">
        <Layout>
          <Products />
        </Layout>
      </Route>

      <Route path="/categorias">
        <Layout>
          <Categories />
        </Layout>
      </Route>

      <Route path="/produto/:slug">
        <Layout>
          <ProductDetail />
        </Layout>
      </Route>

      <Route path="/checkout">
        <Layout showFooter={false}>
          <Checkout />
        </Layout>
      </Route>

      <Route path="/admin">
        <Layout showFooter={false}>
          <AdminDashboard />
        </Layout>
      </Route>

      <Route path="/admin/produtos">
        <Layout showFooter={false}>
          <AdminProducts />
        </Layout>
      </Route>

      <Route path="/admin/produtos/novo">
        <Layout showFooter={false}>
          <AdminProductForm />
        </Layout>
      </Route>

      <Route path="/admin/produtos/:id">
        <Layout showFooter={false}>
          <AdminProductForm />
        </Layout>
      </Route>

      <Route path="/admin/categorias">
        <Layout showFooter={false}>
          <AdminCategories />
        </Layout>
      </Route>

      <Route path="/admin/categorias/nova">
        <Layout showFooter={false}>
          <AdminCategoryForm />
        </Layout>
      </Route>

      <Route path="/admin/categorias/:id">
        <Layout showFooter={false}>
          <AdminCategoryForm />
        </Layout>
      </Route>

      <Route path="/admin/pedidos">
        <Layout showFooter={false}>
          <AdminOrders />
        </Layout>
      </Route>

      <Route>
        <Layout>
          <NotFound />
        </Layout>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <CartProvider>
          <TooltipProvider>
            <Router />
            <Toaster />
          </TooltipProvider>
        </CartProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
