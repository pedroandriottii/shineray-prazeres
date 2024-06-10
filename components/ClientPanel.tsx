'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import Cookies from 'js-cookie';
import { Client, Service } from '@/lib/types';

const ClientPanel: React.FC = () => {
    const id = Cookies.get('userId');
    const token = Cookies.get('accessToken');
    const [userData, setUserData] = useState<Client | null>(null);
    const [services, setServices] = useState<Service[]>([]);
    const [loadingUserData, setLoadingUserData] = useState(true);
    const [loadingServices, setLoadingServices] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            fetchUserData(id);
            fetchUserServices(id);
        }
    }, [id]);

    const fetchUserData = async (userId: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }

            const data = await response.json();
            setUserData(data);
        } catch (error) {
            console.error('Failed to fetch user data', error);
            setError('Failed to fetch user data');
        } finally {
            setLoadingUserData(false);
        }
    };

    const fetchUserServices = async (userId: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services?userId=${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch services');
            }

            const data = await response.json();
            setServices(data);
        } catch (err) {
            console.error('Error fetching services:', err);
            setError('Failed to fetch services');
        } finally {
            setLoadingServices(false);
        }
    };

    if (loadingUserData || loadingServices) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Painel do Cliente</h1>
            {userData ? (
                <div className="mb-6">
                    <Card className="p-4">
                        <h2 className="text-lg font-bold mb-2">Meus Dados</h2>
                        <p><strong>Nome:</strong> {userData.name}</p>
                        <p><strong>Email:</strong> {userData.email}</p>
                        <p><strong>Telefone:</strong> {userData.phone}</p>
                        <p><strong>CPF:</strong> {userData.cpf}</p>
                        <h2 className="text-lg font-bold mb-2 mt-4">Minha Shineray</h2>
                        <p><strong>Moto:</strong> {userData.motorcycle}</p>
                        <p><strong>Chassi:</strong> {userData.chassi}</p>
                        <p><strong>Cor:</strong> {userData.color}</p>
                        <p><strong>Data da Venda:</strong> {new Date(userData.saleDate).toLocaleDateString()}</p>
                    </Card>
                </div>
            ) : (
                <div className='text-red-500'>Cliente não encontrado</div>
            )}

            <h2 className="text-2xl font-bold mb-4">Meus Serviços</h2>
            {services.length > 0 ? (
                <div className="grid grid-flow-row gap-10 lg:grid-cols-6">
                    {services.map((service) => (
                        <Card key={service.id} className="flex p-2 flex-col">
                            <h2 className="text-lg font-bold">{service.name}</h2>
                            <p><strong>Tipo:</strong> {service.type}</p>
                            <p><strong>Data:</strong> {new Date(service.date).toLocaleDateString()}</p>
                            <p><strong>Quilometragem:</strong> {service.kilometers}</p>
                            {service.price && (
                                <p><strong>Preço:</strong> {service.price}</p>
                            )}
                            {service.rating && (
                                <p><strong>Avaliação:</strong> {service.rating}</p>
                            )}
                            {service.message && (
                                <p><strong>Mensagem:</strong> {service.message}</p>
                            )}
                        </Card>
                    ))}
                </div>
            ) : (
                <p>Sem serviços</p>
            )}
        </div>
    );
};

export default ClientPanel;
