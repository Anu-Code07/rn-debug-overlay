import { default as React } from 'react';
import { ConsoleEntry } from './proxies/consoleProxy';
import { NetworkEntry } from './proxies/fetchProxy';
type DebugContextType = {
    logs: ConsoleEntry[];
    requests: NetworkEntry[];
    jsFps: number;
    loopLagMs: number;
    device: Record<string, any>;
    clearLogs(): void;
    clearRequests(): void;
};
export declare const useDebug: () => DebugContextType;
interface DebugProviderProps {
    children: React.ReactNode;
    axios?: any;
    capacity?: number;
    enabled?: boolean;
}
export declare const DebugProvider: ({ children, axios, capacity, enabled }: DebugProviderProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=DebugProvider.d.ts.map