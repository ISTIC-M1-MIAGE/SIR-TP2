'use client';
import {Form} from "@heroui/form";
import {Button, Input} from "@heroui/react";

export default function Page() {
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
                    <Form validationBehavior="aria" className="w-3/4">
                        <div className="flex-row w-full flex gap-5">
                            <Input
                                isRequired
                                name="name"
                                label="Nom"
                                labelPlacement="inside"
                                placeholder="Saisir votre Prénom"
                                type="text"
                                size="lg"
                                validate={(value) => {

                                    return true;
                                }}
                            />
                            <Input
                            isRequired
                            name="firstname"
                            label="Prénom"
                            labelPlacement="inside"
                            placeholder="Saisir votre Prénom"
                            type="text"
                            size="lg"
                            validate={(value) => {
                                return true;
                            }}
                        />
                        </div>

                        <Input
                            isRequired
                            name="email"
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
                            validate={(value) => {
                                const password = document.querySelector('input[name="password"]')?.textContent;
                                if (value !== password) {
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
