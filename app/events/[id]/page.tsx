import { EventDetails } from "./components/EventDetails";

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EventDetails id={id} />;
}
