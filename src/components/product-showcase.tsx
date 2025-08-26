"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Sun, Search, Sprout, Zap, Snowflake, Lightbulb, Home } from "lucide-react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductModal from "@/components/ProductModal";

export type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  category: number;
  category_name: string;
  images: { id: number; image: string }[];
};

const categories = [
  { name: "Todos", icon: Sprout },
  { name: "Paneles", icon: Zap },
  { name: "Aire Acondicionado", icon: Snowflake },
  { name: "Lámparas Solares", icon: Lightbulb },
  { name: "Inversores y Soportes", icon: Home },
];

export default function ProductShowcase() {
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // URL base segura (lee NEXT_PUBLIC_API_URL y quita "/" final). Fallback a localhost para dev.
  const API_BASE =
    (process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") as string) || "http://localhost:8000";

  // Si tus imágenes son relativas, úsalas con este backend (Render o local)
  const BACKEND_MEDIA_BASE = API_BASE;

  useEffect(() => {
    const cat = searchParams.get("cat");
    if (!cat) return;
    const valid = categories.map((c) => c.name);
    setSelectedCategory(valid.includes(cat) ? cat : "Todos");
  }, [searchParams]);

  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true);
        setErrorMsg(null);

        const res = await fetch(`${API_BASE}/api/products/`, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();

        // Normaliza: soporta array directo y respuestas paginadas u otras llaves comunes
        const items: Product[] =
          (Array.isArray(data) && data) ||
          (Array.isArray(data?.results) && data.results) ||
          (Array.isArray(data?.data) && data.data) ||
          (Array.isArray(data?.items) && data.items) ||
          [];

        setProducts(items);
      } catch (err) {
        console.error("Error al cargar productos:", err);
        setErrorMsg("No se pudieron cargar los productos. Intenta nuevamente.");
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    }
    loadProducts();
  }, [API_BASE]);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "Todos" || product.category_name === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      product.name.toLowerCase().includes(q) || product.description.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const hasAnyProducts = products.length > 0;

  return (
    <div className="space-y-8">
      {/* Buscador + categorías */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar productos..."
            className="pl-10 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Buscar productos"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.name;
            return (
              <Button
                key={category.name}
                variant={isActive ? "default" : "secondary"}
                onClick={() => setSelectedCategory(category.name)}
                className="flex-shrink-0"
                aria-pressed={isActive}
              >
                <Icon className="mr-2 h-4 w-4" />
                {category.name}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Error visible */}
      {errorMsg && !isLoading && (
        <div
          className="text-center py-4 rounded-lg border border-destructive/50 text-destructive bg-destructive/10"
          role="alert"
        >
          {errorMsg}
        </div>
      )}

      {/* Loading → Sin productos (solo si NO hay error) → Sin coincidencias → Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-24 text-muted-foreground">
          <Sun className="h-8 w-8 animate-spin-slow" aria-label="Cargando productos" />
          <span className="ml-3">Cargando productos…</span>
        </div>
      ) : !errorMsg && !hasAnyProducts ? (
        <div className="text-center py-16 bg-card/50 rounded-lg">
          <p className="text-xl font-medium">No hay productos</p>
          <p className="text-muted-foreground mt-2">Próximamente añadiremos existencias.</p>
        </div>
      ) : hasAnyProducts && filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-card/50 rounded-lg">
          <p className="text-xl font-medium">No se encuentran productos</p>
          <p className="text-muted-foreground mt-2">Ajusta tu búsqueda o categoría.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const imageSrc =
              product.images && product.images.length > 0
                ? product.images[0].image.startsWith("http")
                  ? product.images[0].image
                  : `${BACKEND_MEDIA_BASE}${product.images[0].image}`
                : "/placeholder.png";

            return (
              <Card
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="flex flex-col cursor-pointer overflow-hidden bg-card/70 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-105"
              >
                <CardHeader className="p-0">
                  <Image
                    src={imageSrc}
                    alt={product.name}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover"
                  />
                </CardHeader>

                <CardContent className="p-6 flex-grow">
                  <Badge
                    variant="outline"
                    className="mt-2 bg-accent/20 text-accent-foreground border-accent"
                  >
                    {product.category_name}
                  </Badge>

                  <CardTitle className="mt-2">{product.name}</CardTitle>

                  <CardDescription className="mt-4">{product.description}</CardDescription>
                </CardContent>

                <CardFooter className="p-6 pt-0 mt-auto">
                  <p className="text-2xl font-bold text-primary">
                    ${Number.parseFloat(product.price).toFixed(2)}
                  </p>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}

      {/* Modal de detalle */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
}

