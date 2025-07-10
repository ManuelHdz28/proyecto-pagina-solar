"use client";

import { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, LoaderCircle } from "lucide-react";
import { getSeoSuggestions } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  missionStatement: z.string().min(20, {
    message: "Mission statement must be at least 20 characters.",
  }).max(500, { message: "Mission statement must be 500 characters or less."}),
  productDescriptions: z.string().min(50, {
    message: "Product descriptions must be at least 50 characters.",
  }).max(1000, { message: "Product descriptions must be 1000 characters or less."}),
});

export function SeoTool() {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      missionStatement: "",
      productDescriptions: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setKeywords([]);
    const result = await getSeoSuggestions(values);
    setIsLoading(false);

    if (result.success && result.keywords) {
      setKeywords(result.keywords);
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error || "An unknown error occurred.",
      });
    }
  }

  return (
    <Card className="w-full bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Lightbulb className="text-primary" />
          AI-Powered SEO Suggestions
        </CardTitle>
        <CardDescription>
          Analyze your company's marketing materials to generate relevant SEO keywords and improve online visibility.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="missionStatement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Mission Statement</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Our mission is to empower homes and businesses with clean, reliable, and affordable solar energy..."
                      {...field}
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productDescriptions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Descriptions</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., We offer high-efficiency monocrystalline solar panels, state-of-the-art inverters, and long-lasting battery storage solutions..."
                      {...field}
                      rows={6}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide detailed descriptions of your main products.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
              Generate Keywords
            </Button>
          </form>
        </Form>
        {(isLoading || keywords.length > 0) && (
          <div className="mt-8 pt-8 border-t border-border">
            <h3 className="text-lg font-semibold">Suggested Keywords:</h3>
            {isLoading ? (
              <div className="mt-4 flex items-center text-muted-foreground">
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </div>
            ) : (
              <div className="mt-4 flex flex-wrap gap-2">
                {keywords.map((keyword) => (
                  <Badge key={keyword} variant="secondary" className="text-base px-3 py-1 bg-accent/20 text-accent-foreground border border-accent">
                    {keyword}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
