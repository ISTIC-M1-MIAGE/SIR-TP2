'use client';

import {LucideImage, LucideTrash2} from "lucide-react";
import {Button, Input, SelectItem} from "@heroui/react";
import {Form} from "@heroui/form";
import {Textarea} from "@heroui/input";
import {useActionState, useEffect, useRef, useState} from "react";
import {Select} from "@heroui/select";
import {createEventAction} from "@/app/actions/createEventAction";
import {baseFormActionResponse} from "@/app/utils/constants";
import {saveFileAction} from "@/app/actions/saveFileAction";
import {redirect} from "next/navigation";
import UIHelper from "@/app/helpers/UIHelper";
import City from "@/models/city";
import {getCitiesAction} from "@/app/actions/getCitiesAction";


export default function Page() {
    const fileinputRef = useRef(null);
    const [image, setImage] = useState<any>([]);
    const [location, setLocation] = useState({
        adresse: "1 rue de la paix",
        ville: "Paris",
        postal: "75001"
    });
    const [cities, setCities] = useState<City[]>([]);
    const [formData, setFormData] = useState({
        mainImage: "",
        title: "Mon évènement test",
        description: "Description de l'évènement",
        location: "",
        city: undefined,
        startDate: "2025-05-01T00:00",
        endDate: "2025-05-05T00:00",
        organizerId: 0,
        closingTicketOfficeDate: "2025-05-03T00:00"
    });

    const [state, formAction, isPending] = useActionState(createEventAction, baseFormActionResponse)

    useEffect(() => {
        if (state.success) {
            redirect("/")
        } else {
            //ToastHelper.errorToast(state.message.title);
        }
    }, [state])

    useEffect(() => {
        getCitiesAction().then(response => {
            setCities(City.fromJsonArray(response.data));
        })
    }, []);

    const handleDelete = () => {
        if (fileinputRef.current) {
            // @ts-ignore
            fileinputRef.current.value = "";
            setImage("");
        }
    }
    const handleChange = async (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const filename = await saveFileAction(file)
            setImage(filename);
            setFormData({
                ...formData,
                mainImage: filename
            })
        }
    }

    const handleClick = () => {
        if (fileinputRef.current) {
            // @ts-ignore
            fileinputRef.current.click();
        }
    };
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="xl:w-4/12 2xl:1/3 h-full flex flex-col items-start justify-center">
                <h1 className="text-4xl font-bold text-start mb-5">Créer un évènement</h1>
                <p>Remplissez le formulaire ci-dessous pour créer un évènement en tant qu'organisateur</p>

                <div className="flex flex-col w-full h-full mt-5">
                    <Form
                        /*action={(data) => {
                        data.set('location',`${location.adresse},${location.postal} ${location.ville}`);
                        data.set('organizerId', "1");
                        console.log("formData = ", data);
                        formAction(data);
                    }}

                         */

                        action={formAction}
                        validationBehavior="aria"
                        className="flex w-full h-full"
                    >
                        <div className="flex flex-col w-full h-full relative mt-5 items-end">
                            <input onChange={handleChange} className="hidden" ref={fileinputRef} type={"file"}
                                   accept="image/jpeg;image/png;image/jpg"/>
                            <div className="flex flex-row w-full justify-between">
                                {(image != "") ?
                                    <LucideTrash2 className="text-danger w-5 h-5 m-0" onClick={handleDelete}/>
                                    : <p></p>
                                }
                                <input value={formData.mainImage} name="mainImage" className="hidden" readOnly={true}/>
                                <p className="text-xs text-white rounded-t-xl bg-secondary-400 text-start px-3 py-2">Affiche
                                    de l'évènement</p>
                            </div>
                            <div onClick={handleClick}
                                 className="cursor-pointer w-full h-44 flex border-1.5 border-secondary-400 items-center rounded-tl-xl rounded-b-xl justify-center">
                                {(image != "") ?
                                    <img className="flex flex-col w-full h-full object-cover rounded-tl-xl rounded-b-xl"
                                         src={`uploads/${image}`}/>
                                    :
                                    <LucideImage className="text-gray-400 w-8 h-8"/>
                                }
                            </div>
                        </div>
                        <Input
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    title: e.target.value
                                })
                            }}
                            isRequired
                            value={formData.title}
                            name="title"
                            label="Titre"
                            labelPlacement="inside"
                            placeholder="Saisir le titre de l'évènement"
                            type="text"
                            size="md"
                        />
                        <Textarea
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    description: e.target.value
                                })
                            }}
                            value={formData.description}
                            name="description"
                            label="Description"
                            labelPlacement="inside"
                            placeholder="La description de l'évènement"
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
                                setLocation({
                                    ...location,
                                    adresse: e.target.value
                                })
                            }}
                            value={location.adresse}
                            name="adresse"
                            label="Adresse"
                            labelPlacement="inside"
                            placeholder="Saisir votre adresse"
                            type="text"
                            size="md"
                        />
                        <div className="w-full flex flex-row items-center justify-between">
                            <Input
                                onChange={(e) => {
                                    setLocation({
                                        ...location,
                                        ville: e.target.value
                                    })
                                }}
                                value={location.ville}
                                className="w-1/2"
                                isRequired
                                name="ville"
                                label="Ville"
                                labelPlacement="inside"
                                placeholder="Saisir la ville"
                                type="text"
                                size="md"
                            />
                            <Input
                                onChange={(e) => {
                                    setLocation({
                                        ...location,
                                        postal: e.target.value
                                    })
                                }}
                                value={location.postal}
                                className="w-1/2 ml-5"
                                isRequired
                                name="postal"
                                label="Code postal"
                                labelPlacement="inside"
                                placeholder="Saisir le code postal"
                                type="text"
                                size="md"
                            />
                        </div>
                        <Select
                            onChange={(e) => UIHelper.handleInputChange(e, setFormData)}
                            value={formData.city}
                            errorMessage={state.errors?.city}
                            className="w-1/2 ml-5"
                            isRequired
                            defaultSelectedKeys={formData.city ? [formData.city] : undefined}
                            name="city"
                            label="Ville"
                            placeholder="Choisir la ville"
                            size="md">
                            {cities.map((city) => (
                                <SelectItem key={city.id}>
                                    {city.name}
                                </SelectItem>
                            ))}
                        </Select>
                        <div className="w-full border-t-1.5 border-secondary-200 my-2">
                        </div>

                        <div className="w-full flex flex-row items-center justify-between">
                            <Input
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        startDate: e.target.value
                                    })
                                }}
                                value={formData.startDate}
                                className="w-1/2"
                                isRequired
                                name="startDate"
                                label="Date de début"
                                labelPlacement="inside"
                                placeholder="Saisir la date de début"
                                type="datetime-local"
                                size="md"
                            />
                            <Input
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        endDate: e.target.value
                                    })
                                }}
                                value={formData.endDate}
                                className="w-1/2 ml-5"
                                isRequired
                                name="endDate"
                                label="Date de fin"
                                labelPlacement="inside"
                                placeholder="Saisir la date de fin"
                                type="datetime-local"
                                size="md"
                            />
                        </div>
                        <div className="w-full flex flex-row items-center justify-between">
                            <Input
                                onChange={(e) => {
                                    console.log(e.target.value)
                                    setFormData({
                                        ...formData,
                                        closingTicketOfficeDate: e.target.value
                                    })
                                }}
                                value={formData.closingTicketOfficeDate}
                                className="w-1/2"
                                isRequired
                                name="closingTicketOfficeDate"
                                label="Fermeture de la billetterie"
                                labelPlacement="inside"
                                placeholder="Fermeture de la billetterie"
                                type="datetime-local"
                                size="md"
                            />
                        </div>

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
                </div>
            </div>
        </div>
    );
}