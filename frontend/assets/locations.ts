import {faker} from '@faker-js/faker';

export const Locations: any[] = Array.from({length: 15}, (index: number) => {
    return {
        id: "location-" + index,
        name: faker.location.city(),
    };
});
