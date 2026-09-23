import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import SocialProof from "@/components/marketing/social-proof";
import Wrapper from "@/components/wrapper";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <div className="absolute inset-0" />
        <Image
          src="/bgpattern.png"
          alt="background"
          fill
          className="object-cover object-top"
          priority
        />
      </div>

      <Wrapper
        id="hero"
        className="relative z-10 flex min-h-screen items-center pt-26 lg:pt-22"
      >
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col items-center space-y-8 md:space-y-6 text-center lg:items-start lg:text-left">
            <div className="space-y-6">
              <h1 className="text-5xl font-medium tracking-tight sm:text-6xl lg:text-6xl text-white">
                Discover the next big hackathon or event happening near you.
              </h1>
              <p className="mx-auto max-w-xl text-lg leading-relaxed text-white/80 lg:mx-0">
                Browse upcoming events, explore coding challenges, and join the
                communities shaping the next generation of builders.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-4 lg:justify-start">
              <Link href="/events">
                <Button
                  size="lg"
                  className="group h-13 px-7 text-sm font-semibold transition-all active:scale-95"
                >
                  Browse events
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  variant="secondary"
                  className="group h-13 px-7 text-sm font-semibold transition-all active:scale-95"
                >
                  Login Now
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            <div className="flex justify-center lg:block">
              <SocialProof />
            </div>
          </div>
          <div className="relative w-full lg:ml-auto flex justify-center">
            <div className="relative z-10 w-full overflow-hidden hidden sm:block max-w-xs md:max-w-sm lg:max-w-lg flex">
              <Image
                src="/hero.png"
                alt="Hackerspace"
                width={1076}
                height={764}
                priority
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default HeroSection;
