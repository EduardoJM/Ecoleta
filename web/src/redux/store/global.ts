export interface GlobalStore {
    messages: string[];
    loadingCount: number;
}

export const GlobalStoreInitial: GlobalStore = {
    messages: [],
    loadingCount: 0,
};
