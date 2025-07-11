"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, Zap, Battery, Wrench, Sprout, Building, Home } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const products = [
  {
    id: 'sp-001',
    name: 'MC-Solar Panel X1',
    category: 'Paneles',
    description: 'Panel solar monocristalino de alta eficiencia con una garantía de 25 años.',
    price: 99.99,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'solar panel'
  },
  {
    id: 'sp-002',
    name: 'MC-Solar Panel Pro',
    category: 'Paneles',
    description: 'Nuestro panel más potente, diseñado para instalaciones comerciales.',
    price: 100.00,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'solar panel roof'
  },
  {
    id: 'inv-001',
    name: 'Inversor de corbata de cuadrícula 5kW',
    category: 'Inversores',
    description: 'Convierte de manera eficiente la energía de CC de sus paneles en energía de CA para su hogar.',
    price: 899.00,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'power inverter'
  },
  {
    id: 'bat-001',
    name: 'Batería Powerwall 10kWh',
    category: 'Baterías',
    description: 'Almacena el exceso de energía solar para su uso por la noche o durante cortes de energía.',
    price: 55.00,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'solar battery'
  },
  {
    id: 'mnt-001',
    name: 'Kit de Montaje en Tejado',
    category: 'Montaje',
    description: 'Durable, todo tipo de clima hardware de montaje para todo tipo de techos.',
    price: 149.50,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'roof mounting'
  },
  {
    id: 'bat-002',
    name: 'Batería Powerwall 20kWh',
    category: 'Baterías',
    description: 'Almacenamiento de energía de alta capacidad para una independencia energética completa.',
    price: 98.00,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'solar battery storage'
  },
];

const categories = [
  { name: 'Todos', icon: Sprout },
  { name: 'Paneles', icon: Zap },
  { name: 'Inversores', icon: Wrench },
  { name: 'Baterías', icon: Battery },
  { name: 'Montaje', icon: Home },
];

export function ProductShowcase() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar productos por nombre o descripción ..."
            className="pl-10 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search products"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.name}
                variant={selectedCategory === category.name ? "default" : "secondary"}
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
      
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="flex flex-col overflow-hidden bg-card/80 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-105">
              <CardHeader className="p-0">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                  data-ai-hint={product.dataAiHint}
                />
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <Badge variant="outline" className="mt-2 bg-accent/20 text-accent-foreground border-accent">{product.category}</Badge>
                <CardTitle className="mt-2">{product.name}</CardTitle>
                <CardDescription className="mt-4">{product.description}</CardDescription>
              </CardContent>
              <CardFooter className="p-6 pt-0 mt-auto">
                <p className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-card/50 rounded-lg">
            <p className="text-xl font-medium">No se encuentran productos</p>
            <p className="text-muted-foreground mt-2">Intenta ajustar tu búsqueda o filtro.</p>
        </div>
      )}
    </div>
  );
}
