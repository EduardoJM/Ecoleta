export interface UserData {
    id: number;
    name: string;
    email: string;
    avatar: string;
    created_at: string;
    updated_at: string;
}

export interface UserAuthenticatedData {
    user: UserData;
    token: string;
}
