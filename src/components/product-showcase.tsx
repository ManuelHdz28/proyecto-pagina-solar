"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Sun, Search, Sprout, Zap, Snowflake, Lightbulb, Home } from "lucide-react";

import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductModal from "@/components/ProductModal";

export type Product = {
  id: number;
  name: string;
  description: string;
  price: string | number;
  category: number;
  category_name: string; // viene del backend
  images: { id: number; image: string }[];
};

// ==== utils ====
const norm = (s: string) =>
  (s || "")
    .toString()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();

function pickIcon(name: string) {
  const n = norm(name);
  if (n.includes("aire")) return Snowflake;
  if (n.includes("lampara") || n.includes("luz")) return Lightbulb;
  if (n.includes("panel")) return Zap;
  if (n.includes("inversor") || n.includes("soporte") || n.includes("hogar")) return Home;
  return Sprout; // genérica
}

function extractArray(data: any): any[] {
  if (Array.isArray(data)) return data;
  for (const k of ["results", "data", "items", "products", "objects"]) {
    if (Array.isArray(data?.[k])) return data[k];
  }
  // fallback: 1er arreglo de objetos que encontremos
  if (data && typeof data === "object") {
    for (const k of Object.keys(data)) {
      const v = (data as any)[k];
      if (Array.isArray(v) && v.length && typeof v[0] === "object") return v;
    }
  }
  return [];
}

// ==== componente ====
function ProductShowcase() {
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // API base (cliente). Recuerda: en producción debe ser HTTPS si tu web es HTTPS.
  const API_BASE =
    (process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") as string) ||
    (typeof window !== "undefined" && window.location.hostname === "localhost"
      ? "http://localhost:8000"
      : "");

  const BACKEND_MEDIA_BASE = API_BASE;

  // Carga inicial
  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true);
      setErrorMsg(null);

      try {
        if (!API_BASE) throw new Error("Falta NEXT_PUBLIC_API_URL (o usa localhost en dev).");

        if (typeof window !== "undefined" &&
            window.location.protocol === "https:" &&
            API_BASE.startsWith("http://")) {
          throw new Error(
            `Mixed content: tu web es HTTPS pero la API es HTTP (${API_BASE}). Usa HTTPS en la API.`
          );
        }

        const url = `${API_BASE}/api/products/`;
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status} al cargar ${url}`);

        const data = await res.json();
        const items = extractArray(data) as Product[];
        setProducts(items);
      } catch (err: any) {
        console.error("Error al cargar productos:", err);
        setProducts([]);
        setErrorMsg(err?.message || "No se pudieron cargar los productos.");
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Categorías dinámicas desde backend (más "Todos")
  const dynamicCategories = useMemo(() => {
    const names = Array.from(
      new Set(products.map((p) => (p.category_name || "").trim()).filter(Boolean))
    ).sort((a, b) => a.localeCompare(b));
    const cats = names.map((name) => ({ name, icon: pickIcon(name) }));
    return [{ name: "Todos", icon: Sprout }, ...cats];
  }, [products]);

  // Lee ?cat= de la URL, pero sólo lo acepta si existe en las dinámicas
  useEffect(() => {
    const cat = searchParams.get("cat");
    if (!cat) return;
    const exists = dynamicCategories.some((c) => norm(c.name) === norm(cat));
    setSelectedCategory(exists ? cat : "Todos");
  }, [searchParams, dynamicCategories]);

  // Si la categoría seleccionada deja de existir (cambió el backend), vuelve a "Todos"
  useEffect(() => {
    if (
      selectedCategory !== "Todos" &&
      !dynamicCategories.some((c) => norm(c.name) === norm(selectedCategory))
    ) {
      setSelectedCategory("Todos");
    }
  }, [dynamicCategories, selectedCategory]);

  // Filtro robusto (ignora tildes y mayúsculas)
  const filteredProducts = products.filter((product) => {
    const catOK =
      selectedCategory === "Todos" ||
      norm(product.category_name) === norm(selectedCategory);

    const q = norm(searchQuery);
    const searchOK =
      !q ||
      norm(product.name).includes(q) ||
      norm(product.description).includes(q);

    return catOK && searchOK;
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
          {dynamicCategories.map((category) => {
            const Icon = category.icon;
            const isActive = norm(selectedCategory) === norm(category.name);
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

      {/* Loading → Sin productos (NO error) → Sin coincidencias → Grid */}
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

            const priceNum =
              typeof product.price === "number"
                ? product.price
                : Number.parseFloat(String(product.price ?? "0"));

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
                  <Badge variant="outline" className="mt-2 bg-accent/20 border-accent">
                    {product.category_name}
                  </Badge>
                  <CardTitle className="mt-2">{product.name}</CardTitle>
                  <CardDescription className="mt-4">{product.description}</CardDescription>
                </CardContent>

                <CardFooter className="p-6 pt-0 mt-auto">
                  <p className="text-2xl font-bold text-primary">
                    ${isFinite(priceNum) ? priceNum.toFixed(2) : "0.00"}
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

export default ProductShowcase;
export { ProductShowcase };
