import { SignalRSendEvent, SignalRReceiveEvent } from '../../../constants/enum/signalREvent';
import { BaseClient } from './BaseClient';

export class OAuthClient extends BaseClient {
    constructor() {
        super('/hubs/oauth');
    }

    listenToOAuth = (callBack: () => void) => {
        this.addListener(SignalRReceiveEvent.OAuthComplete, callBack);
    }

    removeListenToOAuth = (callBack: () => void) => {
        this.removeListener(SignalRReceiveEvent.OAuthComplete, callBack);
    }

    joinGroup = (channelId: string) => {
        this.sendPayload<string>(SignalRSendEvent.JoinOAuthGroup, channelId);
    }

    leaveGroup = (channelId: string) => {
        this.sendPayload<string>(SignalRSendEvent.LeaveOAuthGroup, channelId);
    }
}
