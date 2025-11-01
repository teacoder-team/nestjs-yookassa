export declare class YookassaError extends Error {
    code: string;
    description: string;
    data?: any;
    constructor(code: string, description: string, data?: any);
}
