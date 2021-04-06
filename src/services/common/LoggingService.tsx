interface ILoggingServiceProps {
    loggingEnabled?: boolean;
}

export class LoggingService {
    private _loggingEnabled: boolean = false;

    constructor(props: ILoggingServiceProps) {
        console.warn(props);
        this._loggingEnabled = props.loggingEnabled ?? false;
    }

    log(message: string, ...optionalParams: any[]): void {
        if (!this._loggingEnabled) return;
        console.log(message, optionalParams);
    }

    error(message: string, ...optionalParams: any[]): void {
        if (!this._loggingEnabled) return;
        console.error(message, optionalParams);
    }
}
