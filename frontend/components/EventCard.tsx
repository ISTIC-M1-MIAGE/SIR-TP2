'use client';

import {Button, Card, CardFooter, CardHeader, Image} from "@heroui/react";
import LucideIcon from "@/components/LucideIcon";

export function EventCard() {
    return (
        <Card isFooterBlurred className="min-w-full w-full h-80">
            <CardHeader className="absolute z-10 top-0 flex-row justify-between items-start">
                <div className={"bg-white rounded-lg px-3 py-1.5"}>
                    <small className="font-bold">FREE</small>
                </div>
                <Button isIconOnly aria-label="Like" color="danger">
                    <LucideIcon name={"Heart"}/>
                </Button>
            </CardHeader>
            <Image
                removeWrapper
                alt="Card example background"
                className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                src="https://heroui.com/images/card-example-6.jpeg"
            />
            <CardFooter className="z-10 absolute bottom-0 bg-white/50 border-t-1 border-zinc-100/50 justify-between">
                <div>
                    <h4 className="text-black text-xl font-bold">Evènement de la journée</h4>
                    <p className="text-black text-tiny">Available soon.</p>
                </div>
            </CardFooter>
        </Card>
    );
}