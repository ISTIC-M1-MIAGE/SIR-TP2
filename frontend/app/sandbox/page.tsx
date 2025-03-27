'use client';

import EventGrid from "@/components/layouts/EventGrid";

export default function Page() {
    return (
        <EventGrid events={[1, 2, 3, 4, 5]}/>
    );
}
