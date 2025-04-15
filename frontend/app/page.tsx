'use client'

import {CustomCarousel} from "@/components/CustomCarousel";
import HomeSearchWidget from "@/components/layouts/HomeSearchWidget";
import EventGrid from "@/components/layouts/EventGrid";
import {useEffect, useState} from "react";
import {getEventsAction} from "@/app/actions/getEventsAction";
import Event from "@/models/event";
import {Button} from "@heroui/react";
import LucideIcon from "@/components/LucideIcon";
import Link from "next/link";

export default function Page() {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        getEventsAction().then(response => {
            console.log('getInfosAction = ', response)
            setEvents(Event.fromJsonArray(response.data))
        })
    }, [false])

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="w-10/12 h-full p-6 flex flex-col items-center gap-5">
                <CustomCarousel/>
                <div className="w-full sm:w-4/5 sm:-mt-16 inset-y-full flex items-center z-10">
                    <HomeSearchWidget/>
                </div>
                <div className="w-full flex flex-col gap-3 items-center justify-center">
                    <div className="w-full flex flex-row items-center justify-between pt-3">
                        <h1 className={"text-3xl font-black"}>Evènements à venir</h1>
                        <Button
                            as={Link}
                            href={"/create_event"}
                            className="my-5 p-7 text-lg"
                            variant={"solid"}
                            color={"secondary"}
                            size={"md"}
                        >
                            <span>
                                <LucideIcon name={"Plus"} size={20}/>
                            </span>
                            <span>
                                Créer
                            </span>
                        </Button>
                    </div>
                    <EventGrid events={events}/>
                </div>
            </div>
        </div>
    );
}