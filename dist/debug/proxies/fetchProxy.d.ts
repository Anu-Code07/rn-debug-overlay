export type NetworkEntry = {
    id: string;
    type: 'fetch' | 'axios';
    method: string;
    url: string;
    startedAt: number;
    endedAt?: number;
    status?: number;
    ok?: boolean;
    durationMs?: number;
    reqBytes?: number;
    resBytes?: number;
    error?: string;
    requestHeaders?: Record<string, string>;
    requestBody?: string;
    responseHeaders?: Record<string, string>;
    responseBody?: string;
};
export declare function installFetchProxy(onEntry: (e: NetworkEntry) => void): () => void;
//# sourceMappingURL=fetchProxy.d.ts.map