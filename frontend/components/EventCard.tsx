'use client';

import {Button, Card, CardFooter, CardHeader, Image} from "@heroui/react";
import Link from 'next/link';

import LucideIcon from "@/components/LucideIcon";

interface Props {
    event: any;
}
export default function EventCard(props: Props) {

    return (
            <Card as={Link} href={{
                pathname: "/event_details",
                query: {id: props.event.id}
            }} className="min-w-full w-full h-80 cursor-pointer" isFooterBlurred>
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
                    alt="Card example background"
                    className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                    src={props.event.mainImage}
                />
                <CardFooter className="z-10 absolute bottom-0 bg-white border-t-1 border-zinc-100/50 justify-between">
                    <div className="flex flex-row">
                        <div className="m-3 flex-col flex items-center justify-start">
                            <h3 className="text-secondary">SEP</h3>
                            <h5 className="text-xl font-bold">13</h5>
                        </div>
                        <div>
                            <h4 className="text-black text-large font-bold">{props.event.title}</h4>
                            <p className="text-black text-tiny">Available soon.</p>
                        </div>
                    </div>
                </CardFooter>
            </Card>
    );
}