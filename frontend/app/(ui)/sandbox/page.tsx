'use client';

import EventGrid from "@/components/layouts/EventGrid";
import HomeSearchWidget from "@/components/layouts/HomeSearchWidget";

export default function Page() {
    return (
        <>
            <HomeSearchWidget/>
            <EventGrid events={[1, 2, 3, 4, 5]}/>
        </>
    );
}
