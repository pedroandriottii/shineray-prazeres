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
}

export interface Motorcycle {
    id: number;
    name: string;
    chassi: string;
    price: number;
    year: number;
    model: string;
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
}
