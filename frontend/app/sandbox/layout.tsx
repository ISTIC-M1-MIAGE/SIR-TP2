import {ReactNode} from "react";

export default function Layout({children}: Readonly<{ children: ReactNode }>) {
    return (
        <div className={"w-full h-screen flex flex-col justify-center items-center"}>
            {children}
        </div>
    );
}
