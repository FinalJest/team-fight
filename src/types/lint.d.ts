/* eslint-disable @typescript-eslint/naming-convention */
interface BaseAppConfig {
    REACT_APP_VERSION: string;
}

declare namespace NodeJS {
    export interface ProcessEnv extends BaseAppConfig {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: string | any;
    }
}
