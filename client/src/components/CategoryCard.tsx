import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Tag } from "lucide-react";
import type { Category } from "@shared/schema";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/produtos?categoria=${category.slug}`}>
      <Card className="group overflow-visible cursor-pointer transition-transform duration-200 hover:scale-[1.02]" data-testid={`card-category-${category.id}`}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg bg-muted">
          {category.imageUrl ? (
            <img
              src={category.imageUrl}
              alt={category.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
              <Tag className="h-12 w-12 text-primary/60" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-lg font-semibold text-white" data-testid={`text-category-name-${category.id}`}>
              {category.name}
            </h3>
            {category.description && (
              <p className="text-sm text-white/80 line-clamp-2 mt-1">
                {category.description}
              </p>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
