import Wrapper from "@/components/wrapper";
import { EventSearchBar } from "./EventSearchBar";

interface EventsPageHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function EventsPageHeader({
  searchQuery,
  onSearchChange,
}: EventsPageHeaderProps) {
  return (
    <section className="relative min-h-[52vh] w-full overflow-hidden bg-primary text-primary-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[url('/pattern2.png')] bg-center bg-cover bg-no-repeat opacity-20"
      />
      <Wrapper className="relative z-10 pt-28 pb-12 sm:pt-32 sm:pb-14 lg:pb-16 lg:pt-28">
        <div className="flex flex-col gap-8">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-2xl font-medium leading-tight tracking-tight sm:text-3xl">
              Browse events
            </h1>
            <p className="text-lg leading-relaxed text-primary-foreground/75">
              Discover hackathons, workshops, competitions, and conferences
              happening across Tunisia and online.
            </p>
          </div>
          <EventSearchBar value={searchQuery} onChange={onSearchChange} />
        </div>
      </Wrapper>
    </section>
  );
}
