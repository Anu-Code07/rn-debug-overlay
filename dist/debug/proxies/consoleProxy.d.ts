export type ConsoleLevel = 'log' | 'warn' | 'error';
export type ConsoleEntry = {
    level: ConsoleLevel;
    message: any[];
    timestamp: number;
};
export declare function installConsoleProxy(onEntry: (e: ConsoleEntry) => void): () => void;
//# sourceMappingURL=consoleProxy.d.ts.map