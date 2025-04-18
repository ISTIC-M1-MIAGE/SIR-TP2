'use client';


import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";

import {getEventByIdAction} from "@/app/actions/getEventByIdAction";
import EventTimer from "@/components/layouts/EventTimer";
import {LucideCalendar, LucideMapPin} from "lucide-react";
import {Button, Link} from "@heroui/react";
import DateHelper from "@/app/utils/helpers/dateHelper";

export default function Page() {
    const [event, setEvent] = useState<any>();

    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    useEffect(() => {
        getEventByIdAction(id)
            .then(response => {
                console.log('getEventByIdAction = ', response)
                setEvent(response.data)
            })
    }, [false])

    return (
        (event !== undefined) ? (
            <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="w-full h-80 relative flex flex-col items-center justify-center">
                    <div className="absolute inset-y-full flex items-center z-10">
                        <EventTimer eventTime={event.startDate}/>
                    </div>
                    <div className="flex h-full w-full items-center justify-center">
                        <img
                            src={`uploads/${event?.mainImage}`}
                            alt="Slide 1"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
                <div className="mt-24 w-10/12 h-full flex flex-col items-center justify-center">
                    <h1 className="text-5xl font-bold uppercase">{event?.title}</h1>
                    <div className="flex flex-row justify-between w-full mt-10">
                        <div className="flex flex-col w-1/2">
                            <p className="text-medium  ">
                                lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit
                                amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante
                                hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet
                                vitae augue.
                            </p>
                        </div>
                        <div className="flex flex-col w-1/3">
                            <div className="flex flex-row gap-2 items-start">
                                <LucideMapPin></LucideMapPin>
                                <div className="flex flex-col">
                                    <h2 className="text-2xl font-bold">{event?.location}</h2>
                                    <p className="text-lg">{event?.country}</p>
                                </div>
                            </div>
                            <div className="border-t-2 border-b-gray-400 p-3 mt-5">
                            </div>
                            <div className="flex flex-row gap-2 items-center">
                                <LucideCalendar></LucideCalendar>
                                <h2 className="text-2xl font-bold">{DateHelper.formatEventDateRange(event?.startDate, event?.endDate)}</h2>
                            </div>
                            <div className="border-t-2 border-b-gray-400 p-3 mt-5">
                            </div>
                            <div className="flex flex-row gap-2 items-center justify-end">
                                <Button as={Link} color="secondary" className="text-2xl p-10 mb-14" href="#"
                                        variant="solid">
                                    Acheter
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <div>
                <h1 className="text-2xl font-bold">Not Found</h1>
            </div>
        )
    );
}