"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Cookies from 'js-cookie';

interface Client {
    id: string;
    name: string;
}

enum ServiceType {
    GARANTIA = 'GARANTIA',
    GRATIS = 'GRATIS',
    PAGO = 'PAGO'
}

const CreateService: React.FC = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [type, setType] = useState<ServiceType>(ServiceType.GARANTIA);
    const [clients, setClients] = useState<Client[]>([]);
    const [selectedClient, setSelectedClient] = useState<string>('');
    const router = useRouter();

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);
                if (!response.ok) {
                    throw new Error('Failed to fetch clients');
                }
                const data = await response.json();
                setClients(data);
            } catch (error) {
                console.error('Error fetching clients:', error);
            }
        };

        fetchClients();
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const token = Cookies.get('accessToken');

        const serviceData: any = {
            name,
            description,
            price: parseFloat(price),
            type,
        };

        if (selectedClient) {
            serviceData.userId = selectedClient;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(serviceData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            router.push('/painel/servicos');
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">Cadastrar Serviço</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <Label htmlFor="name">Nome</Label>
                    <Input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="mb-4">
                    <Label htmlFor="description">Descrição</Label>
                    <textarea id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div className="mb-4">
                    <Label htmlFor="price">Preço</Label>
                    <Input type="text" id="price" name="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div className="mb-4">
                    <Label htmlFor="type">Tipo</Label>
                    <select id="type" name="type" value={type} onChange={(e) => setType(e.target.value as ServiceType)} required>
                        {Object.keys(ServiceType).map((key) => (
                            <option key={key} value={ServiceType[key as keyof typeof ServiceType]}>{ServiceType[key as keyof typeof ServiceType]}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <Label htmlFor="client">Cliente (Opcional)</Label>
                    <select id="client" name="client" value={selectedClient} onChange={(e) => setSelectedClient(e.target.value)}>
                        <option value="">Selecione um cliente</option>
                        {clients.map((client) => (
                            <option key={client.id} value={client.id}>{client.name}</option>
                        ))}
                    </select>
                </div>
                <Button type="submit" className="mt-4 w-full">Cadastrar Serviço</Button>
            </form>
        </div>
    );
};

export default CreateService;
