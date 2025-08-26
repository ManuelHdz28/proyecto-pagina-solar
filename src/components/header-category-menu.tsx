// src/components/header-category-menu.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, Zap, Snowflake, Lightbulb, Sprout, Home } from "lucide-react";

const categories = [
  { name: "Todos", nameUrl: "Todos", icon: Sprout },
  { name: "Paneles", nameUrl: "Paneles", icon: Zap },
  { name: "Aire Acondicionado", nameUrl: "Aire Acondicionado", icon: Snowflake },
  { name: "Lámparas Solares", nameUrl: "Lámparas Solares", icon: Lightbulb },
  { name: "Inversores y Soportes", nameUrl: "Inversores y Soportes", icon: Home },
];

export function HeaderCategoryMenu() {
  const params = useSearchParams();
  const active = params.get("cat") ?? "Todos";
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full md:w-auto">
      {/* ===== Mobile: botón hamburguesa ===== */}
      <div className="flex md:hidden w-full justify-end">
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full"
          onClick={() => setOpen(true)}
          aria-label="Abrir menú"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Panel lateral móvil */}
      {open && (
        <div className="fixed inset-0 z-50">
          {/* Fondo */}
          <div
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          {/* Drawer derecho */}
          <div className="absolute right-0 top-0 h-full w-72 bg-card border-l shadow-xl p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">Categorías</span>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => setOpen(false)}
                aria-label="Cerrar menú"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="mt-2 flex flex-col gap-2 overflow-y-auto">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = active === cat.name;
                return (
                  <Button
                    key={cat.name}
                    asChild
                    variant={isActive ? "default" : "secondary"}
                    className="justify-start rounded-full"
                  >
                    <Link
                      href={`/?cat=${encodeURIComponent(cat.nameUrl)}#products`}
                      onClick={() => setOpen(false)}
                      className="inline-flex items-center gap-2"
                    >
                      <Icon className="h-4 w-4" />
                      {cat.name}
                    </Link>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ===== Desktop: mismo menú con íconos ===== */}
      <nav className="hidden md:flex items-center gap-2 overflow-x-auto no-scrollbar">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = active === cat.name;
          return (
            <Button
              key={cat.name}
              asChild
              variant={isActive ? "default" : "secondary"}
              size="sm"
              className="rounded-full whitespace-nowrap flex-shrink-0"
            >
              <Link
                href={`/?cat=${encodeURIComponent(cat.nameUrl)}#products`}
                className="inline-flex items-center gap-2"
              >
                <Icon className="h-4 w-4" />
                {cat.name}
              </Link>
            </Button>
          );
        })}
      </nav>
    </div>
  );
}

