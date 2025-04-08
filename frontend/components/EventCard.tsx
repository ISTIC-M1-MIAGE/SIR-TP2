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
                <div className={"flex justify-center items-center border bg-white rounded-lg px-2 py-1.5"}>
                    <small className="font-bold">New</small>
                </div>
                <div className={'flex flex-row justify-center items-center gap-1'}>
                    <Button isIconOnly aria-label="Share" size={'sm'} color={"default"}>
                        <LucideIcon name={"Share"} size={20}/>
                    </Button>
                    <Button isIconOnly aria-label="Like" size={'sm'} color="default">
                        <LucideIcon name={"Heart"} size={20}/>
                    </Button>
                </div>
            </CardHeader>
            <Image
                removeWrapper
                alt={`event-${props.event.id}-main-image`}
                className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                src={props.event.mainImage}
            />
            <CardFooter
                className="z-10 absolute bottom-0 bg-white border-t-1 border-zinc-100/50 flex flex-col p-5 items-start">
                <div className="w-full flex flex-row justify-between items-center text-secondary font-bold">
                    <small className={"flex flex-row justify-center items-center gap-1"}>
                        <LucideIcon name={'Calendar'} size={12}/>
                        {props.event.startDate.toLocaleDateString()}
                    </small>
                    {props.event.endDate && (
                        <>
                            <LucideIcon name={'ArrowRight'} size={16}/>
                            <small className={"flex flex-row justify-center items-center gap-1"}>
                                <LucideIcon name={'Calendar'} size={12}/>
                                {props.event.endDate.toLocaleDateString()}
                            </small>
                        </>
                    )}
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