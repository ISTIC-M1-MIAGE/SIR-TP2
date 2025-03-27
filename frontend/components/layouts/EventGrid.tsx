'use client';

import {EventCard} from "@/components/EventCard";

interface Props {
    events: any[];
}

export default function EventGrid(props: Props) {
    return (
        <div className={"w-full p-3 gap-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"}>
            {props.events.map(event => (
                <EventCard/>
            ))}
        </div>
    );
}
