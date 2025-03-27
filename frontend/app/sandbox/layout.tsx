import {ReactNode} from "react";

export default function Layout({children}: Readonly<{ children: ReactNode }>) {
    return (
        <div className={"w-full h-screen flex justify-center"}>
            {children}
        </div>
    );
}
