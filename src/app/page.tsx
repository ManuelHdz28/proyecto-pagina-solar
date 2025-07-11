import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Logo } from "@/components/logo";
import { ProductShowcase } from "@/components/product-showcase";
import { ContactForm } from "@/components/seo-tool";
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
            Impulsa tu futuro con el sol
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-foreground/80">
            GRUPO MC SOLAR ofrece soluciones solares de primer nivel, brindándole energía limpia, confiable y asequible. Únase hoy a la revolución solar.
          </p>
        </section>

        <section id="company-info" className="py-12 md:py-16">
          <Card className="w-full bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl font-bold font-headline">Nuestra misión</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-foreground/90">
                Brindar soluciones de climatización eficientes y accesibles que mejoren el confort y la calidad de vida de nuestros clientes, ofreciendo aires acondicionados de alta tecnología, con un servicio personalizado, instalación profesional y soporte postventa confiable.
              </p>
            </CardContent>
          </Card>
        </section>
        <section id="company-info" className="py-6 md:py-0">
          <Card className="w-full bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl font-bold font-headline">Nuestra visión</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-foreground/90">
                Ser la empresa líder en ventas y servicios de aire acondicionado a nivel nacional, reconocida por nuestra innovación, compromiso con el medio ambiente y excelencia en la atención al cliente.
              </p>
            </CardContent>
          </Card>
        </section>
        
        <Separator className="my-8 bg-border/50" />

        <section id="products" className="py-12 md:py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-headline">Nuestros productos</h2>
          <ProductShowcase />
        </section>


        <Separator className="my-8 bg-border/50" />

        <section id="ai-seo" className="py-12 md:py-20">
            <ContactForm />
        </section>
      </main>
      
      <footer className="bg-card/50 mt-16">
        <div className="container mx-auto py-6 px-4 md:px-6 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} GRUPO MC SOLAR. TODOS LOS DERECHOS RESERVADOS.</p>
        </div>
      </footer>
    </div>
  );
}
