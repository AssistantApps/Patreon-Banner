
import { IDependencyInjection } from '../../../integration/dependencyInjection';
import { PatreonService } from '../../../services/api/PatreonService';

export interface IExpectedServices {
    patreonService: PatreonService;
}

export const dependencyInjectionToProps = (services: IDependencyInjection): IExpectedServices => {
    return {
        patreonService: services.patreonService,
    }
};