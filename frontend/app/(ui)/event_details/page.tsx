'use client';


import {redirect, useSearchParams} from "next/navigation";
import {Fragment, useActionState, useEffect, useState} from "react";

import {getEventByIdAction} from "@/app/actions/getEventByIdAction";
import EventTimer from "@/components/layouts/EventTimer";
import {LucideCalendar, LucideMapPin} from "lucide-react";
import {Button, Input, Link} from "@heroui/react";
import DateHelper from "@/app/helpers/dateHelper";
import PassCard from "@/components/PassCard";
import {getPassesByEventAction} from "@/app/actions/getPassesByEventAction";
import Pass from "@/models/pass";
import LucideIcon from "@/components/LucideIcon";
import {Dialog, DialogPanel, DialogTitle, Transition, TransitionChild} from "@headlessui/react";
import {Textarea} from "@heroui/input";
import {Form} from "@heroui/form";
import {baseFormActionResponse} from "@/app/utils/constants";
import {createPassAction} from "@/app/actions/createPassAction";
import ToastHelper from "@/app/helpers/toastHelper";

export default function Page() {
    const [event, setEvent] = useState<any>();
    const [passes, setPasses] = useState<Pass[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);


    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [state, formAction, isPending] = useActionState(createPassAction, baseFormActionResponse)

    const [formData, setFormData] = useState({
        name: "Ticket standard",
        price: 25.0,
        advantages: "Liste des avantages du ticket standard",
        eventId: id,
    });

    useEffect(() => {
        if (state.success) {
            setIsDialogOpen(false)
            ToastHelper.successToast("Ticket créé avec succès");
        } else {
            //ToastHelper.errorToast(state.message.title);
        }
    }, [state])
    useEffect(() => {
        getEventByIdAction(id).then(response => {
            setEvent(response.data);
            return getPassesByEventAction(id);
        }).then(response => {
            console.log("passes = ", response.data);
            ToastHelper.infoToast("Chargement des tickets");
            setPasses(Pass.fromJsonArray(response.data));
        }).catch(error => {
            console.error("Error fetching event or passes", error);
        });
    }, []);

    return (
        (event !== undefined) ? (
            <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="w-full h-80 relative flex flex-col items-center justify-center">
                    <div className="absolute inset-y-full flex items-center z-10">
                        <EventTimer eventTime={event.startDate}/>
                    </div>
                    <div className="flex h-full w-full items-center justify-center">
                        <img
                            src={`uploads/${event?.mainImage}`}
                            alt="Slide 1"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
                <div className="mt-24 w-10/12 h-full flex flex-col items-center justify-center">
                    <h1 className="text-5xl font-bold uppercase">{event?.title}</h1>
                    <div className="flex flex-row justify-between w-full mt-10">
                        <div className="flex flex-col w-1/2">
                            <p className="text-medium  ">
                                lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit
                                amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante
                                hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet
                                vitae augue.
                            </p>
                        </div>
                        <div className="flex flex-col w-1/3">
                            <div className="flex flex-row gap-2 items-start">
                                <LucideMapPin></LucideMapPin>
                                <div className="flex flex-col">
                                    <h2 className="text-2xl font-bold">{event?.location}</h2>
                                    <p className="text-lg">{event?.country}</p>
                                </div>
                            </div>
                            <div className="border-t-2 border-b-gray-400 p-3 mt-5">
                            </div>
                            <div className="flex flex-row gap-2 items-center">
                                <LucideCalendar></LucideCalendar>
                                <h2 className="text-2xl font-bold">{DateHelper.formatEventDateRange(event?.startDate, event?.endDate)}</h2>
                            </div>
                            <div className="border-t-2 border-b-gray-400 p-3 mt-5">
                                <Button
                                    color={"secondary"}
                                    className={"w-full"}
                                    onPress={() => setIsDialogOpen(true)}
                                    startContent={(<p>Créer un ticket</p>)}
                                    endContent={(
                                        <LucideIcon name={"Plus"}/>
                                    )}
                                />
                                <Transition show={isDialogOpen} as={Fragment}>
                                    <Dialog onClose={() => setIsDialogOpen(false)} className="relative z-50">
                                        <TransitionChild
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <div className="fixed inset-0 bg-black/30"/>
                                        </TransitionChild>

                                        <div className="fixed inset-0 flex items-center justify-center p-4">
                                            <TransitionChild
                                                as={Fragment}
                                                enter="ease-out duration-300"
                                                enterFrom="opacity-0 scale-95"
                                                enterTo="opacity-100 scale-100"
                                                leave="ease-in duration-200"
                                                leaveFrom="opacity-100 scale-100"
                                                leaveTo="opacity-0 scale-95"
                                            >
                                                <DialogPanel
                                                    className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg relative">
                                                    <button
                                                        onClick={() => setIsDialogOpen(false)}
                                                        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                                                    >
                                                        <LucideIcon name={"X"} className="h-6 w-6"/>
                                                    </button>

                                                    <DialogTitle className="text-lg font-medium text-gray-900">
                                                        Nouveau Ticket
                                                    </DialogTitle>

                                                    <Form
                                                        action={formAction}
                                                        validationBehavior="aria"
                                                        className="flex w-full h-full"
                                                    >
                                                        <Input
                                                            onChange={(e) => {
                                                                setFormData({
                                                                    ...formData,
                                                                    name: e.target.value
                                                                })
                                                            }}
                                                            isRequired
                                                            value={formData.name}
                                                            name="name"
                                                            label="Nom du ticket"
                                                            labelPlacement="inside"
                                                            placeholder="Saisir le nom du ticket"
                                                            type="text"
                                                            size="md"
                                                        />

                                                        <Input
                                                            onChange={(e) => {
                                                                setFormData({
                                                                    ...formData,
                                                                    price: e.target.value as unknown as number
                                                                })
                                                            }}
                                                            isRequired
                                                            value={formData.price as unknown as string}
                                                            name="price"
                                                            label="Prix du ticket"
                                                            labelPlacement="inside"
                                                            placeholder="Saisir le prix du ticket"
                                                            type="number"
                                                            size="md"
                                                        />
                                                        <Textarea
                                                            onChange={(e) => {
                                                                setFormData({
                                                                    ...formData,
                                                                    advantages: e.target.value
                                                                })
                                                            }}
                                                            value={formData.advantages}
                                                            name="advantages"
                                                            label="Avantages du ticket"
                                                            labelPlacement="inside"
                                                            placeholder="Liste des avantages du ticket"
                                                            type="textarea"
                                                            aria-multiline="true"
                                                            aria-rowcount={3}
                                                            size="md"
                                                        />

                                                        <div className="w-full border-t-1.5 border-secondary-200 my-2">
                                                        </div>
                                                        <Input
                                                            isRequired
                                                            onChange={(e) => {
                                                                setFormData({
                                                                    ...formData,
                                                                    eventId: e.target.value
                                                                })
                                                            }}
                                                            value={formData.eventId as unknown as string}
                                                            name="eventId"
                                                            label="ID de l'évènement"
                                                            labelPlacement="inside"
                                                            readOnly={true}
                                                            type="number"
                                                            size="md"
                                                        />


                                                        <div className="w-full flex flex-row justify-end">
                                                            <Button
                                                                className="w-1/3 my-5 p-8 text-xl"
                                                                variant={"solid"}
                                                                color={"secondary"}
                                                                isLoading={isPending}
                                                                size={"lg"}
                                                                type={"submit"}
                                                            >
                                                                Créer
                                                            </Button>
                                                        </div>
                                                    </Form>
                                                </DialogPanel>
                                            </TransitionChild>
                                        </div>
                                    </Dialog>
                                </Transition>
                            </div>

                        </div>
                    </div>
                            <div className="z-10 w-10/12 flex flex-row gap-2 items-center overflow-x-auto whitespace-nowrap p-4">
                                <div className="inline-flex gap-4">
                                {

                                    (passes !== undefined) ? (
                                        passes.map((pass: Pass) => (<PassCard key={pass.id} pass={pass}/>
                                        ))) : (<div className="text-center text-gray-500 mb-12">
                                            <p>Aucun ticket disponible pour cet évènement.</p>
                                        </div>
                                    )
                                }
                                </div>
                            </div>
                        </div>
                    </div>
                    ) : (
                    <div>
                        <h1 className="text-2xl font-bold">Not Found</h1>
                    </div>
                    )
                    );
                    }