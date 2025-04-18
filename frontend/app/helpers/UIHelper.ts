import {ChangeEvent, Dispatch, SetStateAction} from "react";
import {DateValue, RangeValue} from "@heroui/react";

export default abstract class UIHelper {
    static handleInputChange(
        event: ChangeEvent<HTMLInputElement | HTMLSelectElement> | { id: string; value: any },
        setState: Dispatch<SetStateAction<any>>
    ) {
        const {id, value} = 'target' in event ? event.target : event;
        setState((prevData: any) => ({
            ...prevData,
            [id]: value,
        }));
    }

    static handleDateRangePickerChange(
        id: string,
        range: RangeValue<DateValue> | null,
        setState: Dispatch<SetStateAction<any>>
    ) {
        setState((prevData: any) => ({
            ...prevData,
            [id]: range,
        }));
    }
}