export type Log = {
    id: string;
    level: string;
    message: string;
    resourceId: string;
    timestamp: string;
    traceId: string;
    spanId: string;
    commit: string;
    metadata: {
        parentResourceId: string;
    };
};