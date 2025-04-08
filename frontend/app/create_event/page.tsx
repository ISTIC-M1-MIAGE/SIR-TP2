'use client';

import {LucideImage, LucideTrash2} from "lucide-react";
import {Button, Input, SelectItem} from "@heroui/react";
import {Form} from "@heroui/form";
import {Textarea} from "@heroui/input";
import {useRef, useState} from "react";
import {Select} from "@heroui/select";
import {Devises} from "@/models/devise";
import {Countries} from "@/models/country";

export default function Page() {
    const fileinputRef = useRef(null);
    const [image, setImage] = useState<any>([]);

    const handleDelete = () => {
        if (fileinputRef.current) {
            // @ts-ignore
            fileinputRef.current.value = "";
            setImage("");
        }
    }
    const handleChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
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
                    <Form validationBehavior="aria" className="flex w-full h-full">
                        <div className="flex flex-col w-full h-full relative mt-5 items-end">
                            <input name="image" onChange={handleChange} className="hidden" ref={fileinputRef} type={"file"} accept="image/jpeg;image/png;image/jpg"/>
                            <div className="flex flex-row w-full justify-between">
                                {(image != "")?
                                    <LucideTrash2 className="text-danger w-5 h-5 m-0" onClick={handleDelete}/>
                                    : <p></p>
                                }

                                <p className="text-xs text-white rounded-t-xl bg-secondary-400 text-start px-3 py-2">Affiche de l'évènement</p>

                            </div>
                            <div onClick={handleClick}
                                 className="cursor-pointer w-full h-44 flex border-1.5 border-secondary-400 items-center rounded-tl-xl rounded-b-xl justify-center" >
                                {(image != "")? <img className="flex flex-col w-full h-full object-cover rounded-tl-xl rounded-b-xl" src={image} />
                                    :
                                  <LucideImage className="text-gray-400 w-8 h-8"/>
                                }
                            </div>
                        </div>
                        <Input
                            isRequired
                            name="title"
                            label="Titre"
                            labelPlacement="inside"
                            placeholder="Saisir le titre de l'évènement"
                            type="text"
                            size="md"
                        />
                        <Textarea
                            name="description"
                            label="Description"
                            labelPlacement="inside"
                            placeholder="La description de l'évènement"
                            type="textarea"
                            aria-multiline="true"
                            aria-rowcount={3}
                            size="md"
                        />

                        <div className="w-full border-t-1.5 border-secondary-400 my-2" >
                        </div>
                        <Input
                            isRequired
                            name="adresse"
                            label="Adresse"
                            labelPlacement="inside"
                            placeholder="Saisir votre adresse"
                            type="text"
                            size="md"
                        />
                        <div className="w-full flex flex-row items-center justify-between">
                            <Input
                                className="w-5/12"
                                isRequired
                                name="ville"
                                label="Ville"
                                labelPlacement="inside"
                                placeholder="Saisir la ville"
                                type="text"
                                size="md"
                            />
                            <Input
                                className="w-5/12"
                                isRequired
                                name="postal"
                                label="Code postal"
                                labelPlacement="inside"
                                placeholder="Saisir le code postal"
                                type="text"
                                size="md"
                            />
                        </div>
                        <div className="w-full flex flex-row items-center justify-between">
                            <Select
                                className="w-5/12"
                                isRequired
                                name="Devise"
                                label="Devise"
                                placeholder="Choisir la devise accéptée"
                                size="md">
                                {Object.values(Devises).map((devise) => (
                                    <SelectItem key={devise}>
                                        {devise}
                                    </SelectItem>
                                ))}
                            </Select>
                            <Select
                                className="w-5/12"
                                isRequired
                                name="country"
                                label="Pays"
                                placeholder="Choisir le pays"
                                size="md">
                                {Object.values(Countries).map((country) => (
                                    <SelectItem key={country} >
                                        {country}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                        <div className="w-full border-t-1.5 border-secondary-400 my-2" >
                        </div>
                        <div className="w-full flex flex-row items-center justify-between">
                            <Input
                                className="w-5/12"
                                isRequired
                                name="date_debut"
                                label="Date de début"
                                labelPlacement="inside"
                                placeholder="Saisir la date de début"
                                type="date"
                                size="md"
                            />
                            <Input
                                className="w-5/12"
                                isRequired
                                name="date_fin"
                                label="Date de fin"
                                labelPlacement="inside"
                                placeholder="Saisir la date de fin"
                                type="date"
                                size="md"
                            />
                        </div>

                        <div className="w-full flex flex-row justify-end">
                            <Button
                                className="w-1/3 mt-5 p-8 text-xl"
                                variant={"solid"}
                                color={"secondary"}
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