import {ReactNode} from "react";

export default function Layout({children}: Readonly<{ children: ReactNode }>) {
    return (
        <div className={"w-full p-3 gap-3 h-full flex flex-col items-center"}>
            {children}
        </div>
    );
}
