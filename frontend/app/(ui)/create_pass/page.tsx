'use client'

import {redirect, useSearchParams} from "next/navigation";
import {useActionState, useEffect, useState} from "react";
import {Form} from "@heroui/form";
import {Button, Input} from "@heroui/react";
import {Textarea} from "@heroui/input";
import {createEventAction} from "@/app/actions/createEventAction";
import {baseFormActionResponse} from "@/app/utils/constants";

export default function Page() {

    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [state, formAction, isPending] = useActionState(createEventAction, baseFormActionResponse)

    const [formData, setFormData] = useState({
        name: "Ticket standard",
        price: 25.0,
        advantages: "Liste des avantages du ticket standard",
        eventId: id,
    });

    useEffect(() => {
        if (state.success) {
            redirect("/")
        } else {
            //ToastHelper.errorToast(state.message.title);
        }
    }, [state])

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="xl:w-4/12 2xl:1/3 h-full flex flex-col items-start justify-center">
                <h1 className="text-4xl font-bold text-start mb-5">Créer un évènement</h1>
                <p>Remplissez le formulaire ci-dessous pour créer un évènement en tant qu'organisateur</p>

                <div className="flex flex-col w-full h-full mt-5">

                </div>
            </div>
        </div>
    );
}