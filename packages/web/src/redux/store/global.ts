export interface GlobalStore {
    messages: {
        message: string;
        key: number;
    }[];
    loadingCount: number;
    nextKey: number;
}

export const GlobalStoreInitial: GlobalStore = {
    messages: [],
    loadingCount: 0,
    nextKey: 1,
};
