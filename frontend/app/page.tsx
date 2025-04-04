'use client'

import {CustomCarousel} from "@/components/CustomCarousel";
import HomeSearchWidget from "@/components/layouts/HomeSearchWidget";
import EventGrid from "@/components/layouts/EventGrid";
import {useEffect, useState} from "react";
import {getEventsAction} from "@/app/actions/getEventsAction";

export default function Page() {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        getEventsAction("test")
            .then(response => {
                console.log('getInfosAction = ', response)
                setEvents(response.data.map((event: Event) => ({...event})))
            })
    }, [false])

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="w-10/12 h-96 relative flex flex-col items-center justify-center">
                <div className="absolute w-2/3 inset-y-full flex items-center z-10">
                    <HomeSearchWidget/>
                </div>
                    <CustomCarousel/>
            </div>
            <div className="mt-32 w-10/12 h-full flex flex-col items-center justify-center">
                <EventGrid events={events}/>
            </div>
        </div>

    );
}