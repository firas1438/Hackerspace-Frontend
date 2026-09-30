import Image from "next/image";
import Wrapper from "@/components/wrapper";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const metrics = [
  { value: "50+", label: "Events listed" },
  { value: "100%", label: "Tech focused events" },
  { value: "2k", label: "Monthly community visits" },
  { value: "20+", label: "Active organizers" },
];

const AboutSection = () => {
  return (
    <section
      id="about"
      className="w-full border-t bg-background text-foreground"
    >
      <Wrapper className="pt-14 lg:pt-16">
        <div className="grid gap-10 lg:grid-cols-3 lg:gap-16">
          <h4 className="max-w-sm text-3xl font-medium leading-tight tracking-tight sm:text-5xl">
            Where builders find their next big opportunity
          </h4>

          <div className="flex max-w-2xl flex-col items-start gap-8 lg:col-span-2 lg:justify-self-end">
            <p className="text-lg leading-relaxed text-muted-foreground sm:text-lg">
              Hackerspace brings hackathons, coding challenges, and builder
              communities together in one place, making it easier to discover
              your next challenge, connect with talented people, and turn bold
              ideas into something real.
            </p>

            <Link href="/events">
              <Button className="group relative h-12 w-fit overflow-hidden rounded-full p-1 ps-6 pe-14">
                <span className="relative z-10 text-xs">Explore events</span>
                <span className="absolute inset-y-1 right-1.5 flex aspect-square items-center justify-center rounded-full bg-background text-foreground transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="size-4" />
                </span>
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative mt-12 sm:mt-16 lg:mt-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-3 -top-7 z-0 size-32 text-primary/70 bg-[radial-gradient(currentColor_1px,transparent_1px)] bg-size-[0.75rem_0.75rem] sm:-right-8 sm:-top-10 sm:size-40"
          />
          <div className="relative z-10 overflow-hidden rounded-md bg-muted">
            <div className="relative aspect-4/3 sm:aspect-3/1">
              <Image
                src="/hackathon.png"
                alt="Hackathon community collaborating"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 92vw, 1152px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 divide-x divide-y divide-border sm:grid-cols-4 sm:divide-y-0">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="flex min-h-24 flex-col justify-center px-4 py-4 first:border-l-0 sm:px-6"
            >
              <span className="text-3xl font-medium tracking-tight sm:text-4xl">
                {metric.value}
              </span>
              <span className="mt-1 text-sm text-muted-foreground">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </Wrapper>
    </section>
  );
};

export default AboutSection;
