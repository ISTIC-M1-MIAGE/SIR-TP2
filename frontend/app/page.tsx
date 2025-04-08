'use client'

import {CustomCarousel} from "@/components/CustomCarousel";
import HomeSearchWidget from "@/components/layouts/HomeSearchWidget";
import EventGrid from "@/components/layouts/EventGrid";
import {useEffect, useState} from "react";
import {getEventsAction} from "@/app/actions/getEventsAction";

export default function Page() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        getEventsAction().then(response => {
            console.log('getInfosAction = ', response)
            setEvents(response.data)
        })
    }, [false])

    return (
        <div className="w-full h-full p-10 flex flex-col items-center gap-5">
            <div className="w-full h-96 gap-5 relative flex flex-col items-center justify-center">
                <CustomCarousel/>
                <div className="sm:absolute w-full sm:w-4/5 inset-y-full flex items-center z-10">
                    <HomeSearchWidget/>
                </div>
            </div>
            <div className="sm:mt-24 w-full h-full flex flex-col items-center justify-center">
                <EventGrid events={events}/>
            </div>
        </div>
    );
}