import Image from "next/image";
import { CalendarDays, MapPin, Network, Users } from "lucide-react";
import Wrapper from "@/components/wrapper";

const featureData = [
  {
    icon: MapPin,
    content:
      "Discover hackathons, conferences, and workshops happening near you.",
  },
  {
    icon: CalendarDays,
    content:
      "Find your next opportunity, from hands-on workshops to high-energy hackathons.",
  },
  {
    icon: Users,
    content:
      "Meet curious builders, share ideas, and connect with people who inspire you.",
  },
  {
    icon: Network,
    content:
      "Build lasting communities where collaboration continues long after the event.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="w-full bg-background text-foreground">
      <Wrapper className="pt-0 lg:pt-0 pb-20 lg:pb-24 ">
        <div className="flex flex-col gap-8 md:gap-10">
          <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:items-end md:text-left">
            <div className="flex flex-col items-center md:items-start">
              <Image
                src="/arrow.png"
                alt="Arrow"
                width={1536}
                height={618}
                className="h-auto w-56 sm:w-64 object-contain"
              />
              <div className="flex flex-col mt-8 gap-3 md:gap-4">
                <h2 className="text-3xl font-medium leading-tight tracking-tight sm:text-5xl">
                  Build, connect, and grow together
                </h2>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Find opportunities to learn, meet people, and build something
                  meaningful with your local tech community.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-6">
            <div className="relative min-h-96 overflow-hidden rounded-lg bg-muted sm:min-h-120 lg:min-h-full">
              <Image
                src="/hackathon2.png"
                alt="Builders collaborating at a hackathon"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                loading="eager"
                priority
              />
              <div className="absolute inset-0 bg-foreground/45" />
              <div className="absolute inset-x-6 bottom-6 max-w-lg text-background sm:inset-x-10 sm:bottom-10">
                <p className="text-xl font-medium leading-tight sm:text-3xl">
                  Your next event, collaborator, or community is closer than you
                  think.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:gap-6">
              {featureData.map((feature) => {
                const Icon = feature.icon;

                return (
                  <article
                    key={feature.content}
                    className="group flex flex-col items-start justify-between gap-10 rounded-md bg-muted p-8 transition-colors hover:bg-primary hover:text-primary-foreground sm:min-h-64"
                  >
                    <Icon
                      className="size-6 text-muted-foreground transition-colors group-hover:text-primary-foreground"
                      strokeWidth={1.5}
                    />
                    <p className="text-base leading-relaxed transition-colors group-hover:text-primary-foreground sm:text-lg">
                      {feature.content}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default ServicesSection;
