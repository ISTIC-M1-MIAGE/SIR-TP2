import {Button, Card, CardFooter, CardHeader, Image} from "@heroui/react";
import LucideIcon from "@/components/LucideIcon";
import Pass from "@/models/pass";

interface Props {
    pass: Pass;
}

export default function PassCard(props: Props) {

    return (
        <Card
            className="w-1/3 h-28 cursor-pointer min-w-80"

            isFooterBlurred
        >

            <CardFooter
                className="z-10 absolute bottom-0 bg-white border-t-1 border-zinc-100/50 flex flex-col p-5 items-start">
                <div
                    className="w-full flex flex-row justify-between items-center text-secondary font-bold">
                    <h2 className={"flex flex-row justify-center items-center gap-1"}>
                        {props.pass.price} €
                    </h2>

                </div>
                <div className="flex flex-row justify-between items-end">
                    <div className="flex flex-col">
                        <h4 className="text-black text-large font-bold">
                            {props.pass.name}
                        </h4>
                        <p className="text-black text-tiny overflow-ellipsis line-clamp-2">
                            {props.pass.advantages}
                        </p>
                    </div>
                    <Button
                        isIconOnly
                        size={'sm'}
                        color={"secondary"}
                        className={"ml-6 aspect-square"}
                    >
                        <LucideIcon name={"HandCoins"} size={20}/>
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}