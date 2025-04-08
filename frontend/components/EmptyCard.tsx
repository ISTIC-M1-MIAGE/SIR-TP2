import {icons} from 'lucide-react';
import LucideIcon from "@/components/LucideIcon";

interface ComponentProps {
    icon: keyof typeof icons,
    title: string;
    subtitle?: string;
}

export default function EmptyCard(props: ComponentProps) {

    return (
        <div
            className={"w-full p-4 border-2 border-gray-300 bg-gray-100 text-gray-500 rounded-2xl flex flex-col justify-center items-center sm:col-span-2 md:col-span-3 lg:col-span-4"}
        >
            <LucideIcon name={props.icon} size={50}/>

            <p className={'font-semibold text-center leading-tight'}>
                {props.title}
            </p>

            {props.subtitle && (
                <small className={'text-center leading-tight'}>
                    {props.subtitle}
                </small>
            )}
        </div>
    );
};

