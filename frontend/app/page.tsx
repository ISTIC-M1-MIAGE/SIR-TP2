'use client'

import {CustomCarousel} from "@/components/CustomCarousel";
import HomeSearchWidget from "@/components/layouts/HomeSearchWidget";
import EventGrid from "@/components/layouts/EventGrid";
import {useEffect, useState} from "react";
import {getEventsAction} from "@/app/actions/getEventsAction";

export default function Page() {
    const [events, setEvents] = useState<any[]>([]);

    useEffect(() => {
        getEventsAction("test")
            .then(response => {
                console.log('getInfosAction = ', response)
                setEvents(response.data)
            })
    }, [false])

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className={"w-10/12 h-96 flex flex-col"}>
                <CustomCarousel/>
            </div>
            <div className="w-10/12 h-full flex flex-col items-center justify-center">
                <HomeSearchWidget/>
                <EventGrid events={[1, 2, 3, 4, 5]}/>
            </div>
        </div>

    );
}