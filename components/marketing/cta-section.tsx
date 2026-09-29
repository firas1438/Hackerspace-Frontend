import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Wrapper from "@/components/wrapper";
import { Button } from "@/components/ui/button";

const CtaSection = () => {
  return (
    <section id="cta" className="w-full bg-background text-foreground">
      <Wrapper className="pb-18 lg:pb-20">
        <div className="relative overflow-hidden rounded-xs bg-primary text-primary-foreground p-12 sm:p-16 lg:p-18 shadow-xl">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-9 -right-6 z-0 size-40 text-secondary/60 bg-[radial-gradient(currentColor_1px,transparent_1px)] bg-size-[0.75rem_0.75rem]"
          />
          <div className="relative z-10 flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between lg:gap-12">
            <div className="max-w-3xl space-y-3 sm:space-y-5">
              <h2 className="text-3xl font-medium leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Join the community and start posting events!
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-primary-foreground/80">
                Bring your hackathons, workshops, and tech meetups to life.
                Connect with passionate builders and grow your audience today.
              </p>
            </div>
            <div className="shrink-0 md:ml-auto">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  variant="secondary"
                  className="group h-13 px-8 text-sm font-semibold transition-all active:scale-95 cursor-pointer"
                >
                  Create Event
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default CtaSection;
