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
    category: 'Panels',
    description: 'High-efficiency monocrystalline solar panel with a 25-year warranty.',
    price: 299.99,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'solar panel'
  },
  {
    id: 'sp-002',
    name: 'MC-Solar Panel Pro',
    category: 'Panels',
    description: 'Our most powerful panel, designed for commercial installations.',
    price: 449.99,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'solar panel roof'
  },
  {
    id: 'inv-001',
    name: 'Grid-Tie Inverter 5kW',
    category: 'Inverters',
    description: 'Efficiently converts DC power from your panels to AC power for your home.',
    price: 899.00,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'power inverter'
  },
  {
    id: 'bat-001',
    name: 'Powerwall Battery 10kWh',
    category: 'Batteries',
    description: 'Store excess solar energy for use at night or during outages.',
    price: 5500.00,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'solar battery'
  },
  {
    id: 'mnt-001',
    name: 'Roof Mounting Kit',
    category: 'Mounting',
    description: 'Durable, all-weather mounting hardware for all roof types.',
    price: 149.50,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'roof mounting'
  },
  {
    id: 'bat-002',
    name: 'Powerwall Battery 20kWh',
    category: 'Batteries',
    description: 'High-capacity energy storage for complete energy independence.',
    price: 9800.00,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'solar battery storage'
  },
];

const categories = [
  { name: 'All', icon: Sprout },
  { name: 'Panels', icon: Zap },
  { name: 'Inverters', icon: Wrench },
  { name: 'Batteries', icon: Battery },
  { name: 'Mounting', icon: Home },
];

export function ProductShowcase() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
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
            placeholder="Search products by name or description..."
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
            <p className="text-xl font-medium">No Products Found</p>
            <p className="text-muted-foreground mt-2">Try adjusting your search or filter.</p>
        </div>
      )}
    </div>
  );
}
