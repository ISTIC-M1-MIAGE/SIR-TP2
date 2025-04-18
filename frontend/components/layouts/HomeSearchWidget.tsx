'use client';

import LucideIcon from "@/components/LucideIcon";
import {Autocomplete, AutocompleteItem, Button, DateRangePicker, Input} from "@heroui/react";
import {getLocalTimeZone, today} from "@internationalized/date";
import {Form} from "@heroui/form";
import {useActionState, useEffect, useState} from "react";
import {baseFormActionResponse} from "@/app/utils/constants";
import UIHelper from "@/app/helpers/UIHelper";
import City from "@/models/city";
import {getCitiesAction} from "@/app/actions/getCitiesAction";
import {searchEventAction} from "@/app/actions/searchEventAction";
import ToastHelper from "@/app/helpers/toastHelper";

interface Props {
    //defaultValue?: TimerValue;
    onSearchSuccess?: (events: Event[]) => void;
}

export default function HomeSearchWidget(props: Props) {
    const [cities, setCities] = useState<City[]>([]);
    const [formData, setFormData] = useState({
        title: "",
        city: "",
        dateRange: null,
        /*dateRange: {
            start: today(getLocalTimeZone()),
            end: today(getLocalTimeZone()).add({months: 1}),
        }*/
    });

    const [state, formAction, isPending] = useActionState(searchEventAction, baseFormActionResponse)

    // Load cities only
    useEffect(() => {
        getCitiesAction().then(response => {
            setCities(City.fromJsonArray(response.data));
        })
    }, []);

    // Handle search results
    useEffect(() => {
        if (state.success) {
            ToastHelper.successToast(state.message.title);
            // TODO: Update event array
        } else {
            ToastHelper.errorToast(state.message.title);
        }
    }, [state])

    return (
        <Form
            action={formAction}
            className={"w-full p-5 gap-3 rounded-3xl flex flex-col md:flex-row sm:items-end bg-white border-2 shadow-2xl text-black"}>
            <div className={"w-full flex flex-col sm:flex-row gap-3"}>
                <div className={"w-full flex flex-col gap-1"}>
                    <div className={"flex items-center gap-1"}>
                        <LucideIcon name={"Search"} size={16}/>
                        <h2>Titre</h2>
                    </div>

                    <Input
                        isDisabled={isPending}
                        type="text"
                        placeholder="Rechercher par titre"
                        variant={"underlined"}
                        size={"sm"}
                        id={"title"}
                        value={formData.title}
                        onChange={(e) => UIHelper.handleInputChange(e, setFormData)}
                        errorMessage={state.errors?.title}
                    />
                </div>

                <div className={"w-full flex flex-col gap-1"}>
                    <div className={"flex items-center gap-1"}>
                        <LucideIcon name={"MapPin"} size={16}/>
                        <h2>Lieu</h2>
                    </div>

                    <Autocomplete
                        isDisabled={isPending}
                        placeholder={"Recherchez par lieu"}
                        variant={"underlined"}
                        size={"sm"}
                        id={"city"}
                        value={formData.city}
                        onChange={(e) => UIHelper.handleInputChange(e, setFormData)}
                        errorMessage={state.errors?.city}
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
                        isDisabled={isPending}
                        className={"bg-auto"}
                        variant={"underlined"}
                        size={"sm"}
                        firstDayOfWeek={'mon'}
                        visibleMonths={2}
                        minValue={today(getLocalTimeZone())}
                        id={"dateRange"}
                        value={formData.dateRange}
                        onChange={(e) => UIHelper.handleDateRangePickerChange('dateRange', e, setFormData)}
                        errorMessage={state.errors?.city}
                    />
                </div>
            </div>

            <Button
                isLoading={isPending}
                type={"submit"}
                color="secondary"
                className={"w-full md:w-min mt-3 md:mt-0"}
            >
                <LucideIcon name={'Search'}/>
                <p className={'md:hidden'}>
                    Rechercher
                </p>
            </Button>
        </Form>
    );
}
