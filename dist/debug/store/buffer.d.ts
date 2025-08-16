export declare class RingBuffer<T> {
    private capacity;
    private data;
    private idx;
    private filled;
    constructor(capacity: number);
    push(item: T): void;
    toArray(): T[];
    clear(): void;
}
//# sourceMappingURL=buffer.d.ts.map