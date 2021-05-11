import { PatreonItemViewModel } from "../../contracts/generated/ViewModel/patreonItemViewModel";
import { PatreonViewModel } from "../../contracts/generated/ViewModel/patreonViewModel";
import { ResultWithValue } from "../../contracts/results/ResultWithValue";
import { anyObject } from "../../helper/typescriptHacks";


const createTestPatronData = (name: string): PatreonItemViewModel => {
    return {
        name,
        imageUrl: `https://ui-avatars.com/api/?size=128&name=${name}`,
        // imageUrl: `https://picsum.photos/seed/${name}/200/300`,
        thumbnailUrl: `https://ui-avatars.com/api/?size=128&name=${name}`,
        totalAmountCents: 0,
        url: '',
    }
}

const testPatrons = [
    createTestPatronData('Richard Hull'),
    createTestPatronData('Patrick Hodge'),
    createTestPatronData('Scott Flores'),
    createTestPatronData('Xander Kent'),
    createTestPatronData('Owen Cooper'),
    createTestPatronData('Elias Gallegos'),
    createTestPatronData('Christopher Lara'),
    createTestPatronData('Marc Patton'),
    createTestPatronData('Ibrahim Colon'),
    createTestPatronData('Franklin Mcclure'),
    createTestPatronData('Felix Fox'),
    createTestPatronData('Eden Clements'),
    createTestPatronData('Isabella Steele'),
    createTestPatronData('Annie Copeland'),
    createTestPatronData('Teresa Gilbert'),
    createTestPatronData('Casey Mccann'),
    createTestPatronData('Rosie Simpson'),
];

const shuffle = (array: Array<PatreonItemViewModel>) => {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

export const patreonTestData = (): ResultWithValue<PatreonViewModel> => {
    return {
        isSuccess: true,
        value: {
            userGuid: '',
            patrons: shuffle(testPatrons),
            saveDate: new Date(),
            settings: anyObject
        },
        errorMessage: ''
    }
}
