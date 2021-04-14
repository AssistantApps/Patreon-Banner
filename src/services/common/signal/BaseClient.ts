import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { SignalRSendEvent, SignalRReceiveEvent } from '../../../constants/enum/signalREvent';
import { getApi, getConsoleLogDebug } from '../../../helper/configHelper';

declare global {
    interface Window { config: any }
}

export class BaseClient {
    private _baseUrl: String = getApi();
    private _hubUrl: String = '/hubs/OAuth';
    private _connection: HubConnection;

    constructor(hubUrl?: String) {
        if (hubUrl != null) this._hubUrl = hubUrl;
        this._connection = new HubConnectionBuilder()
            .withUrl(`${this._baseUrl}${this._hubUrl}`)
            .withAutomaticReconnect()
            .build();
        this._connection.start().then(() => this.logMessage('signalR connection'));
    }

    isConnected = (): boolean => {
        return this._connection.state === HubConnectionState.Connected;
    }

    protected addListener = (channel: SignalRReceiveEvent, callBack: (args: any[]) => void) => {
        this.logMessage(`Listener created for: ${SignalRReceiveEvent[channel].toString()}`);
        this._connection.on(SignalRReceiveEvent[channel].toString(), callBack);
    }

    protected removeListener = (channel: SignalRReceiveEvent, callBack: (args: any[]) => void) => {
        this.logMessage(`Listener removed for: ${SignalRReceiveEvent[channel].toString()}`);
        this._connection.off(SignalRReceiveEvent[channel].toString(), callBack);
    }

    protected sendPayload = async <T>(channel: SignalRSendEvent, payload: T) => {
        if (this.isConnected()) {
            try {
                const channelString = SignalRSendEvent[channel].toString();
                await this._connection.send(channelString, payload);
                this.logMessage('Message sent!', `channel: ${channelString}`, payload);
            }
            catch (e) {
                console.error('sendPayload error', e);
            }
        }
        else {
            console.warn('No connection, cannot send payload!')
        }
    }

    private logMessage = (message: string, ...optionalParams: any[]) => {
        if (!getConsoleLogDebug()) return;
        console.log(message, optionalParams);
    }
}
