'use client';
import {Form} from "@heroui/form";
import {Button, Input} from "@heroui/react";
import {useActionState, useEffect, useState} from "react";
import {registerAction} from "@/app/actions/registerAction";
import {baseFormActionResponse} from "@/app/utils/constants";
import {redirect} from "next/navigation";
import {loginAction} from "@/app/actions/loginAction";

export default function Page() {
    const [formData, setFormData] = useState({
        email: "jacksparow@pirate.com",
        password: "Example",
    });

    const [state, formAction, isPending] = useActionState(loginAction, baseFormActionResponse)

    useEffect(() => {
        if (state.success) {
            //redirect("/account/profile");
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
                            Connexion
                        </h1>
                        <Form action={formAction} validationBehavior="aria" className="w-3/4">
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
                                name="password"
                                value={formData.password}
                                label="Mot de passe"
                                labelPlacement="inside"
                                placeholder="Mot de Passe"
                                type="password"
                                size="lg"
                            />
                            <div className="w-full flex flex-row justify-start mt-5">
                                <a href="#" className="text-secondary text-xl">Mot de passe oublié ?</a>
                            </div>
                            <div className="w-full flex flex-row justify-end">
                                <Button
                                    className="w-1/3 mt-5 p-8 text-xl"
                                    variant={"solid"}
                                    color={"secondary"}
                                    size={"lg"}
                                    type={"submit"}
                                >
                                    Connexion
                                </Button>
                            </div>
                        </Form>

                    </div>
                </div>
        </div>
    );
}
