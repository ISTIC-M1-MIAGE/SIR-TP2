'use client';

export default function Footer() {
    return (
        <div className={"w-full flex flex-col justify-center items-center p-3 bg-black text-white text-center"}>
            <small>Version {process.env.APP_VERSION}</small>
        </div>
    );
}
