"use client";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import Image from "next/image";
import { Product } from "./product-showcase";

export default function ProductModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  return (
    <Dialog open={!!product} onClose={onClose} className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="relative w-full max-w-2xl bg-background rounded-lg shadow-lg overflow-hidden">
          <button
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            onClick={onClose}
          >
            <X className="w-6 h-6" />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 p-4 max-h-[400px] overflow-y-auto">
              {product.images.length > 0 ? (
                product.images.map((img) => (
                  <Image
                    key={img.id}
                    src={img.image}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="rounded-lg w-full object-cover"
                  />
                ))
              ) : (
                <p className="text-center text-muted-foreground">
                  No hay imágenes.
                </p>
              )}
            </div>
            <div className="p-4 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold">{product.name}</h2>
                <p className="text-muted-foreground mt-2">
                  {product.description}
                </p>
                <p className="mt-4 text-primary text-xl font-semibold">
                  ${parseFloat(product.price).toFixed(2)}
                </p>
              </div>
              <button
                className="mt-6 bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition"
                onClick={onClose}
              >
                Cerrar
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
