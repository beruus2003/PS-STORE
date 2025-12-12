import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Package, ShoppingCart, FolderOpen, TrendingUp, DollarSign, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import type { Product, Category, Order } from "@shared/schema";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { isOwner, isLoading: authLoading } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && !isOwner) {
      toast({
        title: "Acesso Negado",
        description: "Você não tem permissão para acessar esta área.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
    }
  }, [isOwner, authLoading, toast]);

  const { data: products, isLoading: loadingProducts } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    enabled: isOwner,
  });

  const { data: categories, isLoading: loadingCategories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
    enabled: isOwner,
  });

  const { data: orders, isLoading: loadingOrders } = useQuery<Order[]>({
    queryKey: ["/api/orders"],
    enabled: isOwner,
  });

  if (authLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-8 w-48 mb-8" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  if (!isOwner) {
    return null;
  }

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(parseFloat(price));
  };

  const totalRevenue = orders?.reduce((sum, order) => sum + parseFloat(order.total), 0) || 0;
  const pendingOrders = orders?.filter((o) => o.status === "pending").length || 0;

  const stats = [
    {
      title: "Total de Produtos",
      value: products?.length || 0,
      icon: Package,
      color: "text-blue-500",
      href: "/admin/produtos",
    },
    {
      title: "Categorias",
      value: categories?.length || 0,
      icon: FolderOpen,
      color: "text-purple-500",
      href: "/admin/categorias",
    },
    {
      title: "Pedidos",
      value: orders?.length || 0,
      icon: ShoppingCart,
      color: "text-green-500",
      href: "/admin/pedidos",
      badge: pendingOrders > 0 ? `${pendingOrders} pendentes` : undefined,
    },
    {
      title: "Faturamento",
      value: formatPrice(totalRevenue.toString()),
      icon: DollarSign,
      color: "text-yellow-500",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold">Painel Administrativo</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie sua loja PS Store
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button asChild>
            <Link href="/admin/produtos/novo">Novo Produto</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/categorias/nova">Nova Categoria</Link>
          </Button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className={stat.href ? "cursor-pointer hover-elevate" : ""}>
            {stat.href ? (
              <Link href={stat.href}>
                <CardHeader className="flex flex-row items-center justify-between gap-4 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-2xl font-bold">{stat.value}</span>
                    {stat.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {stat.badge}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Link>
            ) : (
              <>
                <CardHeader className="flex flex-row items-center justify-between gap-4 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <span className="text-2xl font-bold">{stat.value}</span>
                </CardContent>
              </>
            )}
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-4">
            <CardTitle>Pedidos Recentes</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/pedidos">Ver Todos</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {loadingOrders ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-12" />
                ))}
              </div>
            ) : orders && orders.length > 0 ? (
              <div className="space-y-3">
                {orders.slice(0, 5).map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between gap-4 p-3 rounded-lg bg-muted/50"
                  >
                    <div className="min-w-0">
                      <p className="font-medium truncate">{order.customerName}</p>
                      <p className="text-sm text-muted-foreground">
                        Pedido #{order.id}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-medium text-primary">
                        {formatPrice(order.total)}
                      </p>
                      <Badge
                        variant={order.status === "pending" ? "secondary" : "default"}
                      >
                        {order.status === "pending" ? "Pendente" : order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                Nenhum pedido ainda
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-4">
            <CardTitle>Produtos em Destaque</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/produtos">Ver Todos</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {loadingProducts ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-12" />
                ))}
              </div>
            ) : products && products.filter((p) => p.featured).length > 0 ? (
              <div className="space-y-3">
                {products
                  .filter((p) => p.featured)
                  .slice(0, 5)
                  .map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                    >
                      <div className="h-10 w-10 rounded-md overflow-hidden bg-muted flex-shrink-0">
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center">
                            <Package className="h-5 w-5 text-muted-foreground/40" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium truncate">{product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Estoque: {product.stock}
                        </p>
                      </div>
                      <span className="font-medium text-primary flex-shrink-0">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                Nenhum produto em destaque
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
