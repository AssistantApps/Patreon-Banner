
import { IDependencyInjection } from '../../integration/dependencyInjection';
import { AssistantAppsService } from '../../services/api/AssistantAppsService';

export interface IExpectedServices {
    assistantAppsService: AssistantAppsService;
}

export const dependencyInjectionToProps = (services: IDependencyInjection): IExpectedServices => {
    return {
        assistantAppsService: services.assistantAppsService,
    }
};