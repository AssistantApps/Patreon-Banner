import process from "process";

const development: boolean = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export const isDev = (): boolean => {
    console.log('NODE_ENV', process.env.NODE_ENV);
    return development;
}