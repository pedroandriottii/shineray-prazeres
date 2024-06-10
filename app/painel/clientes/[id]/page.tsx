'use client';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card } from '@mui/material';
import { Button } from '@/components/ui/button';
import { Client, Service } from '@/lib/types';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';

const ClientDetailPage: React.FC = () => {
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
                console.error('Error fetching client details:', err);
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

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services?user=${id}`, {
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
                console.error('Error fetching services:', err);
                setError((err as Error).message);
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
        <div className='p-6 flex flex-col gap-6'>
            <ToastContainer />
            <Card className='p-2 border-none bg-shineray-color-dark text-center text-2xl uppercase text-white'>
                Detalhes do Cliente
            </Card>
            {client ? (
                <div className='flex flex-col gap-6'>
                    <Card className='p-6 flex flex-col border-none bg-[#373737] text-white'>
                        <div className='flex justify-around text-center'>
                            <div className='flex flex-col gap-4'>
                                <h1 className='text-3xl text-shineray-color-dark uppercase'>Informações do Cliente</h1>
                                <div>
                                    <strong className='text-sm'>Nome:</strong>
                                    <p className='border rounded-full border-shineray-color-dark'> {client.name}</p>
                                </div>
                                <div>
                                    <strong className='text-sm'>Email:</strong>
                                    <p className='border rounded-full border-shineray-color-dark'> {client.email}</p>
                                </div>
                                <div>
                                    <strong className='text-sm'>CPF:</strong>
                                    <p className='border rounded-full border-shineray-color-dark'> {client.cpf}</p>
                                </div>
                                <div>
                                    <strong className='text-sm'>Telefone:</strong>
                                    <p className='border rounded-full border-shineray-color-dark'> {client.phone}</p>
                                </div>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <h1 className='text-3xl text-shineray-color-dark uppercase'>Informações da Moto</h1>
                                <div>
                                    <strong className='text-sm'>Moto:</strong>
                                    <p className='border rounded-full border-shineray-color-dark'> {client.motorcycle}</p>
                                </div>
                                <div>
                                    <strong className='text-sm'>Chassi:</strong>
                                    <p className='border rounded-full border-shineray-color-dark'> {client.chassi}</p>
                                </div>
                                <div>
                                    <strong className='text-sm'>Cor:</strong>
                                    <p className='border rounded-full border-shineray-color-dark'> {client.color}</p>
                                </div>
                                <div>
                                    <strong className='text-sm'>Data da Venda:</strong>
                                    <p className='border rounded-full border-shineray-color-dark'> {new Date(client.saleDate).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                    <Card className='p-6 bg-[#373737] text-white'>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                                <span className='text-shineray-color-dark'><MiscellaneousServicesIcon /></span>
                                <h2 className='text-2xl text-shineray-color-dark uppercase'>Serviços</h2>
                            </div>
                            <Button className='bg-shineray-color-dark hover:bg-white hover:text-shineray-color-dark'>
                                Cadastrar Serviço
                            </Button>
                        </div>
                        {services.length > 0 ? (
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
                        ) : (
                            <p>Sem serviços</p>
                        )}
                    </Card>
                </div>
            ) : (
                <div className='text-red-500'>Cliente não encontrado</div>
            )
            }
        </div >
    );
};

export default ClientDetailPage;
