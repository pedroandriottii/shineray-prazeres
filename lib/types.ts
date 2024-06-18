export interface AuthContextType {
    accessToken: string | null;
    role: string | null;
    userId: string | null;
    setAccessToken: (token: string | null) => void;
}

export interface FinancingItem {
    id: number;
    name: string;
    phone: string;
    cpf: string;
    birthDate: string;
    hasDriverLicense: boolean;
    method: string;
    isConcluded: boolean;
    createdAt: string;
    updatedAt: string;
    motorcycleId: number;
    value: number;
    motorcycleName: string;
}

export interface Motorcycle {
    id: number;
    name: string;
    price: number;
    color: string;
    imageUrls: string[];
    description: string;
    specs: string;
    createdAt: string;
    updatedAt: string;
}

export interface Client {
    id: number;
    name: string;
    email: string;
    role: string;
    password: string;
    phone: string;
    cpf: string;
    motorcycle: string;
    chassi: string;
    color: string;
    saleDate: string;
    isFirstAccess: boolean;
}

export interface Service {
    id: number;
    name: string;
    price: number;
    type: string;
    date: string;
    kilometers: number;
    rating?: number;
    message?: string;
}

export interface Avaliation {
    id: number;
    rating: number;
    message: string;
    serviceId: number;
    createdAt: string;
    user: Client;
}