import Image from "next/image";

import Wrapper from "@/components/wrapper";

const processSteps = [
  {
    number: "01",
    title: "Discover",
    description:
      "Browse hackathons, workshops, and events that match your interests.",
  },
  {
    number: "02",
    title: "Choose",
    description:
      "Find the right event, challenge, or opportunity for where you are now.",
  },
  {
    number: "03",
    title: "Connect",
    description:
      "Meet fellow builders, exchange ideas, and find people to create with.",
  },
  {
    number: "04",
    title: "Grow",
    description:
      "Keep learning, keep building, and turn one experience into the next.",
  },
];

const ProcessSection = () => {
  return (
    <section
      id="process"
      className="w-full border-y bg-muted/30 text-foreground"
    >
      <Wrapper className="relative z-10 py-20 sm:py-24 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div className="max-w-md">
            <h2 className="text-4xl font-medium leading-tight tracking-tight sm:text-6xl">
              Your next steps.
            </h2>

            <p className="mt-6 mb-12 text-lg leading-relaxed text-muted-foreground">
              From your first search to your next big collaboration, Hackerspace
              makes every step feel more possible.
            </p>

            <Image
              src="/roadmap2.png"
              alt=""
              width={1536}
              height={1024}
              aria-hidden="true"
              className="mx-auto h-auto w-full max-w-64 object-contain object-center sm:max-w-96"
            />
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute bottom-8 left-5 top-8 border-l-2 border-dotted border-primary/50"
            />

            <div className="relative flex flex-col gap-4">
              {processSteps.map((step) => {
                return (
                  <article
                    key={step.number}
                    className="group relative overflow-hidden rounded-md border border-border bg-background p-5 pl-14 shadow-sm transition-colors hover:border-primary/40 sm:p-6 sm:pl-16"
                  >
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 z-0 hidden bg-[url('/pattern2.png')] bg-center bg-cover bg-no-repeat opacity-25 sm:block"
                    />

                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 z-0 flex items-center justify-end pr-4 select-none tabular-nums text-[11rem] font-semibold leading-none tracking-tighter text-gray-400 opacity-10 sm:inset-auto sm:-bottom-10 sm:-right-4 sm:block sm:p-0 sm:text-[11rem]"
                    >
                      {step.number}
                    </span>

                    <div className="relative z-10">
                      <h3 className="text-2xl font-medium tracking-tight">
                        {step.title}
                      </h3>

                      <p className="mt-2 max-w-xl text-base leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
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

export default ProcessSection;
