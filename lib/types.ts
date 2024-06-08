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
}