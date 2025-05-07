export interface MemoryRecord {
    type: string;
    data: any;
}
export declare class MemoryService {
    constructor();
    /**
     * Append a memory record to session or persistent store.
     */
    appendMemory(record: MemoryRecord): Promise<void>;
}
