import CollectItem from './CollectItem';

export interface Point {
    id: number;
    image: string;
    name: string;
    email: string;
    whatsapp: string;
    latitude: number;
    longitude: number;
    city: string;
    uf: string;
    created_at: string;
    updated_at: string;
    items: CollectItem[];
}

export interface PointList {
    results: Point[];
    page: number;
    pagesCount: number;
}
