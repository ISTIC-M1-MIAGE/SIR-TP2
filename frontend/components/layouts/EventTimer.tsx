'use client';

import {useEffect, useState} from "react";

interface Props {
    eventTime: any;
}

export default function EventTimer(props: Props) {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft() {
        const now = new Date().getTime();
        const target = new Date(props.eventTime).getTime();
        const diff = target - now;

        if (diff <= 0) return null;

        const seconds = Math.floor((diff / 1000) % 60);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        return { days, hours, minutes, seconds };
    }

    useEffect(() => {
        const interval = setInterval(() => {
            const updated = calculateTimeLeft();
            setTimeLeft(updated);
        }, 1000);

        return () => clearInterval(interval);
    }, [props.eventTime]);

    if (!timeLeft) {
        return <div className={"w-full p-1 gap-3 my-5 rounded-lg flex flex-col sm:flex-row bg-white shadow-md"}>
            <div className="flex p-3 flex-row rounded-xl gap-2 items-center">
                🎉 Event started!
            </div>
            </div>;
    }

    return (
        <div className={"w-full p-1 gap-3 my-5 rounded-xl flex flex-col sm:flex-row bg-white shadow-md"}>
            <div className="flex p-3 flex-row rounded-xl gap-2 items-center">
                <div className="bg-white flex flex-row rounded-xl">
                    <h1 className="text-4xl p-5 rounded-tl-xl rounded-bl-xl border-1 border-secondary">{timeLeft.days}</h1>
                    <div className="bg-secondary items-center flex flex-col justify-center rounded-e-xl">
                        <h2 className="text-2xl -rotate-90 whitespace-nowrap text-white">DAY</h2>
                    </div>
                </div>
                <span className="text-4xl">:</span>
                <div className="bg-white flex flex-row rounded-xl">
                    <h1 className="text-4xl p-5 rounded-tl-xl rounded-bl-xl border-1 border-secondary">{timeLeft.hours}</h1>
                    <div className="bg-secondary items-center flex flex-col justify-center rounded-e-xl">
                        <h2 className="text-2xl -rotate-90 whitespace-nowrap text-white">HRS</h2>
                    </div>
                </div>
                <span className="text-4xl">:</span>
                <div className="bg-white flex flex-row rounded-xl">
                    <h1 className="text-4xl p-5 rounded-tl-xl rounded-bl-xl border-1 border-secondary">{timeLeft.minutes}</h1>
                    <div className="bg-secondary items-center flex flex-col justify-center rounded-e-xl">
                        <h2 className="text-2xl -rotate-90 whitespace-nowrap text-white">MIN</h2>
                    </div>
                </div>
                <span className="text-4xl">:</span>
                <div className="bg-white flex flex-row rounded-xl">
                    <h1 className="text-4xl p-5 rounded-tl-xl rounded-bl-xl border-1 border-secondary">{timeLeft.seconds}</h1>
                    <div className="bg-secondary items-center flex flex-col justify-center rounded-e-xl">
                        <h2 className="text-2xl -rotate-90 whitespace-nowrap text-white">SEC</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}