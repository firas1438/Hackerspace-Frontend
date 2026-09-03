import Image from "next/image";

import Wrapper from "@/components/wrapper";

const eventsItems = [
  {
    label: "Hackathons",
    description: "Build bold ideas under pressure.",
    src: "/events/1.jpg",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    label: "Competitions",
    description: "Put your skills to the test.",
    src: "/events/4.jpg",
    className: "md:row-span-2",
  },
  {
    label: "Workshops",
    description: "Learn directly from practitioners.",
    src: "/events/3.jpg",
  },
  {
    label: "Conferences",
    description: "Meet the people shaping tech.",
    src: "/events/2.jpg",
  },
];

const EventsSection = () => {
  return (
    <section
      id="events"
      className="relative w-full overflow-hidden bg-primary text-primary-foreground"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[url('/pattern2.png')] bg-center bg-cover bg-no-repeat opacity-20"
      />
      <Wrapper className="relative z-10 py-20 sm:py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-3 lg:items-end lg:gap-16">
          <div className="lg:col-span-2">
            <h2 className="max-w-3xl text-4xl font-medium leading-tight tracking-tight sm:text-6xl">
              More ways to show up, learn, and belong.
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-primary-foreground/75">
            From first ideas to lasting connections, discover the events that
            bring your local tech community to life.
          </p>
        </div>

        <div className="relative mt-12 mb-6 grid auto-rows-48 grid-cols-1 gap-3 sm:auto-rows-56 sm:grid-cols-2 lg:mt-14 lg:auto-rows-44 lg:grid-cols-4">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-7 -right-3 z-0 size-32 text-secondary/70 bg-[radial-gradient(currentColor_1px,transparent_1px)] bg-size-[0.75rem_0.75rem] sm:-bottom-10 sm:-right-8 sm:size-40"
          />
          {eventsItems.map((item, index) => (
            <article
              key={item.label}
              className={`group relative overflow-hidden rounded-md bg-primary-foreground/10 ${item.className}`}
            >
              <Image
                src={item.src}
                alt={`${item.label} event at Hackerspace`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />

              <div className="absolute inset-0 bg-linear-to-t from-foreground/95 via-foreground/40 to-transparent transition-opacity duration-500 group-hover:opacity-75" />
              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3 text-primary-foreground sm:inset-x-6 sm:bottom-6">
                <div>
                  <h3 className="text-xl font-medium tracking-tight sm:text-2xl">
                    {item.label}
                  </h3>
                  <p className="mt-1 text-sm text-primary-foreground/85">
                    {item.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Wrapper>
    </section>
  );
};

export default EventsSection;
