interface IAnalyticsServiceProps {
    analyticsEnabled?: boolean;
}

export class AnalyticsService {
    private _analyticsEnabled: boolean = false;

    constructor(props: IAnalyticsServiceProps) {
        this._analyticsEnabled = props.analyticsEnabled ?? false;
    }

    track(event: string, ...optionalParams: any[]): void {
        if (!this._analyticsEnabled) return;

        console.log('Analytics Track: ' + event, optionalParams);
    }
}
