import { patreonTestData } from '../constants/testData/patreonTestData';
import { PatreonViewModel } from '../contracts/generated/ViewModel/patreonViewModel';

export const noPatronsViewModel: PatreonViewModel = {
    ...patreonTestData().value,
    patrons: [],
}

export const lowNumPatronsViewModel: PatreonViewModel = {
    ...patreonTestData().value,
    patrons: patreonTestData().value.patrons.slice(0, 4),
}

export const testDataPatronsViewModel: PatreonViewModel = {
    ...patreonTestData().value,
}