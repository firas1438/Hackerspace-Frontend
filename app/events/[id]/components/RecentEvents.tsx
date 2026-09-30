
import Wrapper from "@/components/wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { EventCard } from "../../components/EventCard";
import { useEvents } from "../../api/useEvents";

interface RecentEventsProps {
    currentEventId?: string | number;
}

function EventCardSkeleton() {
    return (
        <div className="overflow-hidden rounded-md ring-1 ring-foreground/5">
            <Skeleton className="aspect-16/10 w-full rounded-none" />
            <div className="space-y-3 p-5">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="mt-4 h-4 w-1/2" />
            </div>
        </div>
    );
}

export function RecentEvents({ currentEventId }: RecentEventsProps) {
    const { data, isLoading, isError } = useEvents({
        page: 0,
        size: 4,
    });

    const recentEvents = (data?.content ?? [])
        .filter((event) => String(event.id) !== String(currentEventId))
        .slice(0, 3);

    if (isError || (!isLoading && recentEvents.length === 0)) {
        return null;
    }

    return (
        <Wrapper className="pt-0 lg:pt-0">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl font-medium tracking-tight">
                    More recent events
                </h2>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <EventCardSkeleton key={index} />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {recentEvents.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            )}
        </Wrapper>
    );
}
