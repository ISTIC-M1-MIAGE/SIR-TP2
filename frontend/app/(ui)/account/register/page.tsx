'use client';
import {Form} from "@heroui/form";
import {Button, Input} from "@heroui/react";
import {useActionState, useEffect, useState} from "react";
import {createEventAction} from "@/app/actions/createEventAction";
import {baseFormActionResponse} from "@/app/utils/constants";
import {redirect} from "next/navigation";
import {registerAction} from "@/app/actions/registerAction";

export default function Page() {
    const [formData, setFormData] = useState({
        firstname: "Jack",
        lastname: "Sparow",
        email: "jacksparow@pirate.com",
        phone: "0712345678",
        password: "Example",
        passwordConfirm: "Example",
    });

    const [state, formAction, isPending] = useActionState(registerAction, baseFormActionResponse)

    useEffect(() => {
        if (state.success) {
            redirect("/auth/login");
        } else {
            //ToastHelper.errorToast(state.message.title);
        }
    }, [state])
    return (
        <div className="w-full h-dvh flex flex-row items-center justify-between">
            <div className="w-5/12 h-full flex flex-col items-center justify-center">
                <img
                    src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Slide 1"
                    className=" w-full h-full object-cover"
                />
            </div>
            <div className="w-5/12 h-full flex flex-col items-start justify-center">
                <div className="h-1/2 w-full flex flex-col items-start justify-center">
                    <h1 className="text-4xl font-bold mb-8">
                        Inscription
                    </h1>
                    <Form action={formAction} validationBehavior="aria" className="w-3/4">
                        <div className="flex-row w-full flex gap-5">
                            <Input
                                isRequired
                                name="lastname"
                                value={formData.lastname}
                                label="Nom"
                                labelPlacement="inside"
                                placeholder="Saisir votre Prénom"
                                type="text"
                                size="lg"

                            />
                            <Input
                            isRequired
                            name="firstname"
                            value={formData.firstname}
                            label="Prénom"
                            labelPlacement="inside"
                            placeholder="Saisir votre Prénom"
                            type="text"
                            size="lg"

                        />
                        </div>

                        <Input
                            isRequired
                            name="email"
                            value={formData.email}
                            label="Email"
                            labelPlacement="inside"
                            placeholder="Saisir votre email"
                            type="email"
                            size="lg"
                            onInvalid={(value) => {
                                return "Veuillez entrer un email valide";
                            }}
                        />
                        <Input
                            isRequired
                            name="phone"
                            value={formData.phone}
                            label="Téléphone"
                            labelPlacement="inside"
                            placeholder="Saisir votre téléphone"
                            type="tel"
                            size="lg"
                            onInvalid={(value) => {
                                return "Veuillez entrer un numéro valide";
                            }}
                        />
                        <Input
                            isRequired
                            name="password"
                            value={formData.password}
                            label="Mot de passe"
                            labelPlacement="inside"
                            placeholder="Mot de Passe"
                            type="password"
                            size="lg"
                        />
                        <Input
                            isRequired
                            name="confirm_password"
                            label="Confirmation Mot de passe"
                            labelPlacement="inside"
                            placeholder="Confirmer Mot de Passe"
                            type="password"
                            value={formData.passwordConfirm}
                            validate={(value) => {
                                if (value != formData.password) {
                                    return "Les mots de passe ne correspondent pas";
                                }
                                return true;
                            }}
                            size="lg"
                        />
                        <div className="w-full flex flex-row justify-end">
                            <Button
                                className="w-1/3 mt-5 p-8 text-xl"
                                variant={"solid"}
                                color={"secondary"}
                                size={"lg"}
                                type={"submit"}
                            >
                                Inscription
                            </Button>
                        </div>
                    </Form>

                </div>
            </div>
        </div>
    );
}
