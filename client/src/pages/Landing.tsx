import { Link } from "wouter";
import { ArrowRight, Star, Truck, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "@/components/ProductCard";
import { CategoryCard } from "@/components/CategoryCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product, Category } from "@shared/schema";

const features = [
  {
    icon: Truck,
    title: "Entrega Rápida",
    description: "Receba seu pedido em casa com rapidez e segurança",
  },
  {
    icon: Shield,
    title: "Compra Segura",
    description: "Suas informações protegidas em todas as transações",
  },
  {
    icon: Star,
    title: "Qualidade Garantida",
    description: "Produtos originais com garantia de fábrica",
  },
];

export default function Landing() {
  const { data: featuredProducts, isLoading: loadingProducts } = useQuery<Product[]>({
    queryKey: ["/api/products", "featured"],
  });

  const { data: categories, isLoading: loadingCategories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/10 py-20 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative">
          <div className="space-y-8 max-w-2xl">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                Bem-vindo à{" "}
                <span className="text-primary">PS Store</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Sua loja multimarcas com os melhores produtos, preços imbatíveis e 
                atendimento de qualidade.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild data-testid="button-explore-products">
                <Link href="/produtos">
                  Explorar Produtos
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/api/login" data-testid="button-create-account">
                  Criar Conta
                </a>
              </Button>
            </div>

          </div>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-background">
                <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {categories && categories.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
              <div>
                <h2 className="text-3xl font-bold">Categorias</h2>
                <p className="text-muted-foreground mt-1">
                  Navegue por nossas categorias de produtos
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/categorias">
                  Ver Todas
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {loadingCategories ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="aspect-[4/3] rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categories.slice(0, 4).map((category) => (
                  <CategoryCard key={category.id} category={category} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
            <div>
              <h2 className="text-3xl font-bold">Produtos em Destaque</h2>
              <p className="text-muted-foreground mt-1">
                Confira os produtos mais populares da nossa loja
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/produtos">
                Ver Todos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {loadingProducts ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-square w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-6 w-1/2" />
                </div>
              ))}
            </div>
          ) : featuredProducts && featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProducts.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Nenhum produto em destaque no momento
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para Começar?
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            Crie sua conta agora e aproveite ofertas exclusivas, descontos especiais
            e muito mais!
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button size="lg" variant="secondary" asChild>
              <a href="/api/login" data-testid="button-cta-signup">
                Criar Conta Grátis
              </a>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/50 text-primary-foreground" asChild>
              <Link href="/produtos">
                Ver Produtos
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
