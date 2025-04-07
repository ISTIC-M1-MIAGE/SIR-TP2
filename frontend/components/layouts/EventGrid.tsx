'use client';

import EventCard from "@/components/EventCard";

interface Props {
    events: any[];
}

export default function EventGrid(props: Props) {
    return (
        <div className={"w-full h-full gap-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"}>
            {Array.isArray(props.events) && props.events.length > 0 ? (
                props.events.map((event, index: number) => (
                    <EventCard key={`event-${index}`} event={event} />
                ))
            ) : (
                <p>No events available.</p>
            )}
        </div>
    );
}
