import { useParams, Link } from "wouter";
import { ArrowLeft, Minus, Plus, ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { useCartContext } from "@/context/CartContext";
import { ProductCard } from "@/components/ProductCard";
import type { Product, Category } from "@shared/schema";

export default function ProductDetail() {
  const params = useParams<{ slug: string }>();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addItem, setIsOpen } = useCartContext();

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ["/api/products", params.slug],
  });

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: relatedProducts } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    enabled: !!product?.categoryId,
  });

  const category = categories?.find((c) => c.id === product?.categoryId);
  const related = relatedProducts
    ?.filter((p) => p.categoryId === product?.categoryId && p.id !== product?.id && p.active)
    .slice(0, 4);

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(parseFloat(price));
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    for (let i = 0; i < quantity; i++) {
      addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
      });
    }
    
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
      setIsOpen(true);
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-6 w-32 mb-8" />
        <div className="grid lg:grid-cols-2 gap-8">
          <Skeleton className="aspect-square rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
          <p className="text-muted-foreground mb-8">
            O produto que você está procurando não existe ou foi removido.
          </p>
          <Button asChild>
            <Link href="/produtos">Ver Todos os Produtos</Link>
          </Button>
        </div>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(
        ((parseFloat(product.originalPrice) - parseFloat(product.price)) /
          parseFloat(product.originalPrice)) *
          100
      )
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/produtos">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para Produtos
        </Link>
      </Button>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg bg-muted relative">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <ShoppingCart className="h-24 w-24 text-muted-foreground/40" />
              </div>
            )}
            {discount > 0 && (
              <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground">
                -{discount}%
              </Badge>
            )}
          </div>

          {product.images && product.images.length > 0 && (
            <div className="grid grid-cols-4 gap-2">
              <div className="aspect-square overflow-hidden rounded-md ring-2 ring-primary cursor-pointer">
                {product.imageUrl && (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              {product.images.slice(0, 3).map((img, index) => (
                <div
                  key={index}
                  className="aspect-square overflow-hidden rounded-md border cursor-pointer hover-elevate"
                >
                  <img
                    src={img}
                    alt={`${product.name} ${index + 2}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          {category && (
            <Badge variant="secondary">{category.name}</Badge>
          )}

          <div>
            <h1 className="text-3xl font-bold" data-testid="text-product-title">
              {product.name}
            </h1>
            {product.featured && (
              <Badge className="mt-2 bg-primary text-primary-foreground">
                Produto em Destaque
              </Badge>
            )}
          </div>

          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="text-4xl font-bold text-primary" data-testid="text-product-detail-price">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xl text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {product.description && (
            <div>
              <h3 className="font-semibold mb-2">Descrição</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {product.description}
              </p>
            </div>
          )}

          <Separator />

          <div className="space-y-4">
            {product.stock !== null && product.stock > 0 ? (
              <>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Quantidade</p>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      data-testid="button-decrease-qty"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium text-lg">
                      {quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.min(product.stock || 99, quantity + 1))}
                      disabled={quantity >= (product.stock || 99)}
                      data-testid="button-increase-qty"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      {product.stock} disponíveis
                    </span>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleAddToCart}
                  disabled={addedToCart}
                  data-testid="button-add-to-cart"
                >
                  {addedToCart ? (
                    <>
                      <Check className="mr-2 h-5 w-5" />
                      Adicionado ao Carrinho!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Adicionar ao Carrinho
                    </>
                  )}
                </Button>
              </>
            ) : (
              <div className="text-center py-4 bg-muted rounded-lg">
                <p className="text-destructive font-medium">Produto Esgotado</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Este produto não está disponível no momento
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {related && related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Produtos Relacionados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
