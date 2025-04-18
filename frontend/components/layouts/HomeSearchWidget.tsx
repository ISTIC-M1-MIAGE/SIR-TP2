'use client';

import LucideIcon from "@/components/LucideIcon";
import {Autocomplete, AutocompleteItem, Button, DateRangePicker, Input} from "@heroui/react";
import {getLocalTimeZone, today} from "@internationalized/date";
import {Form} from "@heroui/form";
import {useActionState, useEffect, useState} from "react";
import {createEventAction} from "@/app/actions/createEventAction";
import {baseFormActionResponse} from "@/app/utils/constants";
import UIHelper from "@/app/helpers/UIHelper";
import City from "@/models/city";
import {getCitiesAction} from "@/app/actions/getCitiesAction";

export default function HomeSearchWidget() {
    const [cities, setCities] = useState<City[]>([]);
    const [formData, setFormData] = useState({
        title: "",
        city: "",
        dateRange: "",
    });

    const [state, formAction, isPending] = useActionState(createEventAction, baseFormActionResponse)

    useEffect(() => {
        getCitiesAction().then(response => {
            setCities(City.fromJsonArray(response.data));
        })
    }, []);

    return (
        <Form
            className={"w-full p-5 gap-3 rounded-3xl flex flex-col sm:flex-row sm:items-end bg-white border-2 shadow-2xl text-black"}>
            <div className={"w-full flex flex-col gap-1"}>
                <div className={"flex items-center gap-1"}>
                    <LucideIcon name={"Search"} size={16}/>
                    <h2>Titre</h2>
                </div>

                <Input
                    type="text"
                    placeholder="Rechercher par type"
                    variant={"underlined"}
                    size={"sm"}
                    errorMessage={state.errors?.title}
                    onChange={(e) => UIHelper.handleInputChange(e, setFormData)}
                    value={formData.title}
                />
            </div>

            <div className={"w-full flex flex-col gap-1"}>
                <div className={"flex items-center gap-1"}>
                    <LucideIcon name={"MapPin"} size={16}/>
                    <h2>Lieu</h2>
                </div>

                <Autocomplete
                    placeholder={"Recherchez par lieu"}
                    variant={"underlined"}
                    size={"sm"}
                >
                    {cities.map((city) => (
                        <AutocompleteItem
                            className="text-white"
                            key={city.id}
                        >
                            {city.name}
                        </AutocompleteItem>
                    ))}
                </Autocomplete>
            </div>
            <div className={"w-full flex flex-col gap-1"}>
                <div className={"flex items-center gap-1"}>
                    <LucideIcon name={"Calendar"} size={16}/>
                    <h2>Date</h2>
                </div>

                <DateRangePicker
                    className={"bg-auto"}
                    variant={"underlined"}
                    size={"sm"}
                    firstDayOfWeek={'mon'}
                    visibleMonths={2}
                    minValue={today(getLocalTimeZone())}
                    //selectorIcon={<LucideIcon name={"ChevronDown"} size={16}/>}
                />
            </div>

            <Button
                type={"submit"}
                color="secondary"
                className={"mt-3 sm:mt-0"}
            >
                <LucideIcon name={'Search'}/>
                <p className={'sm:hidden'}>
                    Rechercher
                </p>
            </Button>
        </Form>
    );
}
