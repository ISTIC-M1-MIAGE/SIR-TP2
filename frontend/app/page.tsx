'use client'

import {CustomCarousel} from "@/components/CustomCarousel";
import HomeSearchWidget from "@/components/layouts/HomeSearchWidget";
import EventGrid from "@/components/layouts/EventGrid";
import {useEffect, useState} from "react";
import {getEventsAction} from "@/app/actions/getEventsAction";
import Event from "@/models/event";

export default function Page() {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        getEventsAction().then(response => {
            console.log('getInfosAction = ', response)
            setEvents(Event.fromJsonArray(response.data))
        })
    }, [false])

    return (
        <div className="w-full h-full p-6 flex flex-col items-center gap-5">
            <CustomCarousel/>
            <div className="w-full sm:w-4/5 sm:-mt-16 inset-y-full flex items-center z-10">
                <HomeSearchWidget/>
            </div>
            <div className="w-full flex flex-col gap-3 items-center justify-center">
                <div className="w-full flex flex-row items-center">
                    <h1 className={"text-3xl font-black"}>Evènements à venir</h1>
                </div>
                <EventGrid events={events}/>
            </div>
        </div>
    );
}