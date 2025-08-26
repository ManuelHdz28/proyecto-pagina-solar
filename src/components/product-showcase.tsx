"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Search,
  Zap,
  Battery,
  Wrench,
  Sprout,
  Home,
  Sun,
  Fan,
  Wind,
  Snowflake,
  Lightbulb,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductModal from "@/components/ProductModal";
import { useSearchParams } from "next/navigation";

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

export function ProductShowcase() {
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // estado nuevo
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const backendUrl = "https://grupo-mc-solar.onrender.com";

  useEffect(() => {
    const cat = searchParams.get("cat");
    if (!cat) return;
    const valid = [
      "Todos",
      "Paneles",
      "Aire Acondicionado",
      "Lámparas Solares",
      "Inversores y Soportes",
    ];
    setSelectedCategory(valid.includes(cat) ? cat : "Todos");
  }, [searchParams]);

  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true);
        setErrorMsg(null);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products/`,
          { cache: "no-store" }
        );
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        setErrorMsg("No se pudieron cargar los productos. Intenta nuevamente.");
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    }
    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "Todos" ||
      product.category_name === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const hasAnyProducts = products.length > 0;

  return (
    <div className="space-y-8">
      {/* Buscador y categorías */}
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
            return (
              <Button
                key={category.name}
                variant={
                  selectedCategory === category.name ? "default" : "secondary"
                }
                onClick={() => setSelectedCategory(category.name)}
                className="flex-shrink-0"
              >
                <Icon className="mr-2 h-4 w-4" />
                {category.name}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Estado de error (opcional) */}
      {errorMsg && !isLoading && (
        <div
          className="text-center py-4 rounded-lg border border-destructive/50 text-destructive bg-destructive/10"
          role="alert"
        >
          {errorMsg}
        </div>
      )}

      {/* Contenido: loading → grid → vacíos */}
      {isLoading ? (
        <div className="flex items-center justify-center py-24 text-muted-foreground">
          <Sun className="h-8 w-8 animate-spin-slow" aria-label="Cargando productos" />
          <span className="ml-3">Cargando productos…</span>
        </div>
      ) : !hasAnyProducts ? (
        // Sin productos desde la API
        <div className="text-center py-16 bg-card/50 rounded-lg">
          <p className="text-xl font-medium">No hay productos</p>
          <p className="text-muted-foreground mt-2">
            Próximamente añadiremos existencias.
          </p>
        </div>
      ) : filteredProducts.length === 0 ? (
        // Hay productos pero no coinciden con el filtro/búsqueda
        <div className="text-center py-16 bg-card/50 rounded-lg">
          <p className="text-xl font-medium">No se encuentran productos</p>
          <p className="text-muted-foreground mt-2">
            Ajusta tu búsqueda o categoría.
          </p>
        </div>
      ) : (
        // Grid de productos
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const imageSrc =
              product.images && product.images.length > 0
                ? product.images[0].image.startsWith("http")
                  ? product.images[0].image
                  : `${backendUrl}${product.images[0].image}`
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
                  <CardDescription className="mt-4">
                    {product.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="p-6 pt-0 mt-auto">
                  <p className="text-2xl font-bold text-primary">
                    ${parseFloat(product.price).toFixed(2)}
                  </p>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

