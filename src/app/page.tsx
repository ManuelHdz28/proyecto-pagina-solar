// app/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Logo } from "@/components/logo";
import { ProductShowcase } from "@/components/product-showcase";
import { ContactForm } from "@/components/seo-tool";
import { Separator } from "@/components/ui/separator";
import { SocialLinks } from "@/components/social-links";
import Image from "next/image";
import { HeaderCategoryMenu } from "@/components/header-category-menu";
import { BackgroundSlideshow } from "@/components/background-slideshow";
import { Suspense } from "react"; // ⬅️ nuevo



export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="container mx-auto py-6 px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          <Logo />
          <Suspense fallback={null}>
            <HeaderCategoryMenu />
          </Suspense>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6">
        <BackgroundSlideshow
          images={["/foto-background.jpg", "/foto2.jpg", "/foto3.jpg"]}
          intervalMs={7000}
          className="min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex items-center justify-center"
        >
          <div className="text-center px-4">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight text-primary">
              Energía solar para un futuro sin límites
            </h1>
            <p className="mt-2 text-lg md:text-xl text-white">
              Liderando el camino hacia un futuro más limpio y eficiente con energía solar
            </p>
            <div className="mt-4 text-white">
              <SocialLinks />
            </div>
          </div>
        </BackgroundSlideshow>

        <section id="products" className="py-12 md:py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-headline">
            Nuestros productos
          </h2>
          <Suspense fallback={null}>
            <ProductShowcase />
          </Suspense>
        </section>

        <Separator className="my-8 bg-border/50" />

        <section id="company-info" className="py-12 md:py-16">
          <Card className="w-full bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl font-bold font-headline">
                Nuestra misión
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-foreground/90">
                Brindar soluciones de climatización y energía que combinen
                tecnología de vanguardia y eficiencia, ofreciendo aires
                acondicionados, sistemas de generación de energía y lámparas
                solares diseñados para maximizar el ahorro y mejorar el confort
                de nuestros clientes.
              </p>
            </CardContent>
          </Card>
        </section>
        <section id="company-info" className="py-6 md:py-0">
          <Card className="w-full bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl font-bold font-headline">
                Nuestra visión
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-foreground/90">
                Convertirnos en líderes del sector energético y de
                climatización, destacando por la integración de tecnología
                avanzada, sistemas de generación de energía y soluciones de
                eficiencia que optimicen el consumo y reduzcan costos a nuestros
                clientes.
              </p>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-8 bg-border/50" />

        <section id="contact-info" className="py-12 md:py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 font-headline text-primary">
            Contáctanos
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
            {/* Caja de información */}
            <div className="flex flex-col justify-between bg-card/80 backdrop-blur-sm rounded-lg p-6 w-full md:w-[500px] h-[300px] text-center md:text-left border border-border">
              <p className="text-lg text-foreground/90 mb-4">
                Dirección:
                <br />
                Colonia Lomas Verdes, Pasaje Las Rosas 5235, San Salvador.
              </p>
              <div className="space-y-2">
                <p className="flex items-center gap-2 justify-center md:justify-start text-accent">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m0 0V6a2 2 0 00-2-2H5a2 2 0 00-2 2v2m18 0v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8"
                    />
                  </svg>
                  grupomcsolar@gmail.com
                </p>
                <p className="flex items-center gap-2 justify-center md:justify-start text-accent">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.6a1 1 0 01.95.68l1.14 3.42a1 1 0 01-.24 1.02l-2.13 2.13a11.05 11.05 0 005.66 5.66l2.13-2.13a1 1 0 011.02-.24l3.42 1.14a1 1 0 01.68.95V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  2223-8517
                </p>
                {/* Solo Facebook como enlace */}
                <div className="flex justify-center md:justify-start">
                  <a
                    href="https://www.facebook.com/profile.php?id=61577918754727&notif_id=1751562159217728&notif_t=page_user_activity&ref=notif"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-primary transition-colors duration-300 flex items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 5.013 3.657 9.163 8.438 9.878v-6.987H7.898v-2.89h2.54V9.845c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.463h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33V22C18.343 21.163 22 17.013 22 12z" />
                    </svg>
                    MC SOLAR S.A.S DE C.V.
                  </a>
                </div>
              </div>
            </div>
            {/* Mapa */}
            <iframe
              title="Ubicación de GRUPO MC SOLAR"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.3246170737575!2d-89.21819138563243!3d13.692940102490774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f6330423a0d5ab1%3A0x4f4f67e31b8540f4!2sCol.%20Lomas%20Verdes%2C%20San%20Salvador!5e0!3m2!1ses-419!2ssv!4v1721530412345"
              width="100%"
              height="300"
              className="rounded-lg border border-border w-full md:w-[500px] h-[300px]"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>
        <Separator className="my-8 bg-border/50" />
        <section id="ai-seo" className="py-12 md:py-20">
          <ContactForm />
        </section>
      </main>

      <footer className="bg-card/50 mt-16">
        <div className="container mx-auto py-6 px-4 md:px-6 text-center text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} GRUPO MC SOLAR. TODOS LOS DERECHOS
            RESERVADOS.{" "}
          </p>
          <SocialLinks className="mt-4" />
        </div>
      </footer>
    </div>
  );
}

