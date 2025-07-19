"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LoaderCircle, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, { message: "El nombre es obligatorio." }),
  email: z.string().email({ message: "Introduce un correo válido." }),
  message: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres." }),
});

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
  setIsLoading(true);

  try {
    const res = await fetch("https://grupo-mc-solar.onrender.com/api/messages/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const text = await res.text();
    console.log("Respuesta bruta:", text);

    if (!res.ok) {
      throw new Error("Error al enviar el mensaje");
    }

    setIsLoading(false);
    setSubmitted(true);

    toast({
      title: "Mensaje enviado",
      description: "Gracias por contactarnos. Te responderemos pronto.",
    });

    form.reset();
  } catch (error) {
    console.error(error);
    setIsLoading(false);
    toast({
      title: "Error",
      description: "No se pudo enviar el mensaje. Inténtalo de nuevo.",
      variant: "destructive",
    });
  }
}



  return (
    <Card className="w-full bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Mail className="text-primary" />
          Contáctanos
        </CardTitle>
        <CardDescription>
          Completa el formulario y te responderemos lo antes posible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {submitted ? (
          <div className="text-center py-8">
            <p className="text-lg font-semibold text-primary">¡Gracias por tu mensaje!</p>
            <p className="mt-2 text-muted-foreground">Pronto nos pondremos en contacto contigo.</p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Tu nombre" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input placeholder="tu@correo.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mensaje</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Escribe tu mensaje aquí..."
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Describe tu consulta o comentario.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                Enviar mensaje
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}
