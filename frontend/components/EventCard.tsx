'use client';

import {Button, Card, CardFooter, CardHeader, Image} from "@heroui/react";
import Link from 'next/link';
import LucideIcon from "@/components/LucideIcon";
import Event from "@/models/event";

interface Props {
    event: Event;
}

export default function EventCard(props: Props) {

    return (
        <Card
            as={Link}
            href={{
                pathname: "/event_details",
                query: {id: props.event.id}
            }}
            className="w-full h-80 cursor-pointer"
            isFooterBlurred
        >
            <CardHeader className="absolute z-10 top-0 flex-row justify-between items-start">
                <div className={"bg-white rounded-lg px-3 py-1.5"}>
                    <small className="font-bold">{props.event.country}</small>
                </div>
                <Button isIconOnly aria-label="Like" color="danger">
                    <LucideIcon name={"Heart"}/>
                </Button>
            </CardHeader>
            <Image
                removeWrapper
                alt={`event-${props.event.id}-main-image`}
                className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                src={props.event.mainImage}
            />
            <CardFooter
                className="z-10 absolute bottom-0 bg-white border-t-1 border-zinc-100/50 flex flex-row p-5 gap-5 items-start">
                <div className="flex flex-col">
                    <h3 className="text-secondary">
                        {props.event.getFormattedStartDate()}
                    </h3>
                    <h5 className="text-xl font-bold">2025</h5>
                </div>
                <div className="flex flex-col">
                    <h4 className="text-black text-large font-bold">
                        {props.event.title}
                    </h4>
                    <p className="text-black text-tiny overflow-ellipsis line-clamp-2">
                        {props.event.description}
                    </p>
                </div>
            </CardFooter>
        </Card>
    );
}