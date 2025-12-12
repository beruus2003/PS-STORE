import { Link } from "wouter";
import { ShoppingCart, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartContext } from "@/context/CartContext";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, setIsOpen } = useCartContext();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });
    setIsOpen(true);
  };

  const discount = product.originalPrice
    ? Math.round(
        ((parseFloat(product.originalPrice) - parseFloat(product.price)) /
          parseFloat(product.originalPrice)) *
          100
      )
    : 0;

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(parseFloat(price));
  };

  return (
    <Link href={`/produto/${product.slug}`}>
      <Card className="group overflow-visible cursor-pointer transition-transform duration-200 hover:scale-[1.02]" data-testid={`card-product-${product.id}`}>
        <div className="relative aspect-square overflow-hidden rounded-t-lg bg-muted">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-muted">
              <ShoppingCart className="h-12 w-12 text-muted-foreground/40" />
            </div>
          )}
          
          {discount > 0 && (
            <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">
              -{discount}%
            </Badge>
          )}
          
          {product.featured && (
            <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
              Destaque
            </Badge>
          )}

          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
            <Button
              size="icon"
              variant="secondary"
              className="h-10 w-10"
              data-testid={`button-view-${product.id}`}
            >
              <Eye className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              className="h-10 w-10"
              onClick={handleAddToCart}
              data-testid={`button-add-cart-${product.id}`}
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-medium line-clamp-2 min-h-[2.5rem] mb-2" data-testid={`text-product-name-${product.id}`}>
            {product.name}
          </h3>
          
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-xl font-bold text-primary" data-testid={`text-product-price-${product.id}`}>
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          
          {product.stock !== null && product.stock <= 5 && product.stock > 0 && (
            <p className="text-xs text-destructive mt-2">
              Apenas {product.stock} em estoque
            </p>
          )}
          
          {product.stock === 0 && (
            <p className="text-xs text-destructive mt-2">Esgotado</p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
