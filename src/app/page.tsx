import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Logo } from "@/components/logo";
import { ProductShowcase } from "@/components/product-showcase";
import { SeoTool } from "@/components/seo-tool";
import { Separator } from "@/components/ui/separator";

const testimonials = [
  {
    id: "t1",
    name: "Sarah L.",
    location: "Austin, TX",
    comment: "MC Solar made the switch to solar seamless. Our energy bills have never been lower, and the team was professional from start to finish. Highly recommend!",
    avatarUrl: "https://placehold.co/100x100.png",
  },
  {
    id: "t2",
    name: "David Chen",
    location: "Phoenix, AZ",
    comment: "The performance of the panels is outstanding, even in the Arizona heat. We're now producing more energy than we consume. A fantastic investment.",
    avatarUrl: "https://placehold.co/100x100.png",
  },
  {
    id: "t3",
    name: "Maria Garcia",
    location: "Miami, FL",
    comment: "I was impressed with their customer service and the quality of the installation. The Powerwall battery gives us peace of mind during hurricane season.",
    avatarUrl: "https://placehold.co/100x100.png",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="container mx-auto py-6 px-4 md:px-6">
        <Logo />
      </header>
      <main className="container mx-auto px-4 md:px-6">
        <section className="py-12 md:py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary font-headline">
            Power Your Future with the Sun
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-foreground/80">
            MC Solar provides top-tier solar solutions, empowering you with clean, reliable, and affordable energy. Join the solar revolution today.
          </p>
        </section>

        <section id="company-info" className="py-12 md:py-16">
          <Card className="w-full bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl font-bold font-headline">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-foreground/90">
                To accelerate the world's transition to sustainable energy. We believe that every home and business should have access to the clean, abundant energy of the sun. Our goal is to make solar power an easy and affordable choice for everyone, reducing our collective carbon footprint and building a brighter, cleaner future for generations to come.
              </p>
            </CardContent>
          </Card>
        </section>
        
        <Separator className="my-8 bg-border/50" />

        <section id="products" className="py-12 md:py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-headline">Our Products</h2>
          <ProductShowcase />
        </section>

        <Separator className="my-8 bg-border/50" />
        
        <section id="testimonials" className="py-12 md:py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-headline">What Our Customers Say</h2>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <Card className="h-full bg-card/80 backdrop-blur-sm">
                      <CardContent className="flex flex-col items-center text-center p-6 h-full">
                        <Avatar className="w-20 h-20 mb-4 border-2 border-primary">
                          <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <p className="text-lg font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                        <blockquote className="mt-4 text-foreground/80 italic flex-grow">
                          "{testimonial.comment}"
                        </blockquote>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>

        <Separator className="my-8 bg-border/50" />

        <section id="ai-seo" className="py-12 md:py-20">
            <SeoTool />
        </section>
      </main>
      
      <footer className="bg-card/50 mt-16">
        <div className="container mx-auto py-6 px-4 md:px-6 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} MC Solar Showcase. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
