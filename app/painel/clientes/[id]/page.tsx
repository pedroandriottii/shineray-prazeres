'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Client {
    id: string;
    name: string;
    email: string;
    role: string;
    phone: string;
    cpf: string;
    motorcycle: string;
    chassi: string;
    color: string;
    saleDate: string;
}

interface Service {
    id: number;
    name: string;
    price: number;
    type: string;
    date: string;
    kilometers: number;
    rating?: number;
    message?: string;
}

const ClientDetailPage: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const id = pathname.split('/').pop();

    const [client, setClient] = useState<Client | null>(null);
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchClient = async () => {
            try {
                const token = Cookies.get('accessToken');
                if (!token) {
                    setError('Token not found');
                    setLoading(false);
                    return;
                }

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch client details');
                }

                const data = await response.json();
                setClient(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        const fetchServices = async () => {
            try {
                const token = Cookies.get('accessToken');
                if (!token) {
                    setError('Token not found');
                    setLoading(false);
                    return;
                }

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/user/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch services');
                }

                const data = await response.json();
                setServices(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchClient();
        fetchServices();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='p-6'>
            <ToastContainer />
            {client ? (
                <div className='bg-gray-800 p-6 rounded-lg'>
                    <h1 className='text-3xl font-bold mb-4'>Detalhes do Cliente</h1>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div>
                            <p><strong>Nome:</strong> {client.name}</p>
                            <p><strong>Email:</strong> {client.email}</p>
                            <p><strong>CPF:</strong> {client.cpf}</p>
                            <p><strong>Telefone:</strong> {client.phone}</p>
                            <p><strong>Função:</strong> {client.role === 'ADMIN' ? 'Gestor' : 'Cliente'}</p>
                        </div>
                        <div>
                            <p><strong>Moto:</strong> {client.motorcycle}</p>
                            <p><strong>Chassi:</strong> {client.chassi}</p>
                            <p><strong>Cor:</strong> {client.color}</p>
                            <p><strong>Data da Venda:</strong> {new Date(client.saleDate).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <h2 className='text-2xl font-bold mt-6'>Serviços</h2>
                    <ul className='list-disc ml-6'>
                        {services.map(service => (
                            <li key={service.id}>
                                <p><strong>Nome:</strong> {service.name}</p>
                                <p><strong>Tipo:</strong> {service.type}</p>
                                <p><strong>Data:</strong> {new Date(service.date).toLocaleDateString()}</p>
                                <p><strong>Quilometragem:</strong> {service.kilometers}</p>
                                {service.price && <p><strong>Preço:</strong> R$ {service.price}</p>}
                                {service.rating && <p><strong>Avaliação:</strong> {service.rating}</p>}
                                {service.message && <p><strong>Mensagem:</strong> {service.message}</p>}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className='text-red-500'>Cliente não encontrado</div>
            )}
        </div>
    );
};

export default ClientDetailPage;
