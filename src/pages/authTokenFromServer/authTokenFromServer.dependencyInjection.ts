import { IDependencyInjection } from '../../integration/dependencyInjection';
import { PatreonService } from '../../services/api/PatreonService';
import { StorageService } from '../../services/StorageService';

export interface IExpectedServices {
    storageService: StorageService;
    patreonService: PatreonService;
}

export const dependencyInjectionToProps = (services: IDependencyInjection): IExpectedServices => {
    const { storageService, patreonService } = services;
    return {
        storageService,
        patreonService,
    }
};