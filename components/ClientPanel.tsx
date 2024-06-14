'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import Cookies from 'js-cookie';
import { Client, Service } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import ChangePassword from './auth/changePassword';

const ClientPanel: React.FC = () => {
    const id = Cookies.get('userId');
    const token = Cookies.get('accessToken');
    const [userData, setUserData] = useState<Client>();
    const [services, setServices] = useState<Service[]>([]);
    const [loadingUserData, setLoadingUserData] = useState(true);
    const [loadingServices, setLoadingServices] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [rating, setRating] = useState<number>(0);
    const [message, setMessage] = useState<string>('');
    const [currentServiceId, setCurrentServiceId] = useState<number | null>(null);
    const [alterarSenha, setAlterarSenha] = useState<boolean>(false);

    useEffect(() => {
        if (id) {
            fetchUserData(id);
            fetchUserServices(id);
        }
    }, [id]);

    const handleDialogClose = () => {
        setAlterarSenha(false);
      };

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

    const handleAvaliate = async (serviceId: number) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/${serviceId}/avaliate`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ rating, message }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit rating');
            }

            const updatedService = await response.json();
            setServices((prevServices) => prevServices.map((service) => service.id === updatedService.id ? updatedService : service));
            setRating(0);
            setMessage('');
            setCurrentServiceId(null);
        } catch (error) {
            console.error('Failed to submit rating', error);
            alert('Failed to submit rating');
        }
    };

    if (loadingUserData || loadingServices) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    console.log(userData)

    return (
        <div className="p-6">
            <AlertDialog defaultOpen={userData?.isFirstAccess}>
                <AlertDialogContent className='max-w-[360px]' >
                    <AlertDialogHeader>
                        <AlertDialogTitle>Olá, {userData?.name}! Este é seu primeiro login?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Recomendamos que altere sua senha automatica que voce recebeu para sua maior segurança.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className='flex flex-col sm:flex-col sm:space-x-0 gap-2 mt-4'>
                        <AlertDialogCancel className='' asChild>
                            <Button className='bg-black font-semibold hover:bg-gray-800 hover:text-white'>Cancelar</Button>
                        </AlertDialogCancel>
                        <AlertDialogAction className='bg-[#CC0000] hover:bg-[#f10000] hover:text-white text-white font-semibold' onClick={() => setAlterarSenha(true)}>Alterar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <ChangePassword clientId={id} isOpen={alterarSenha} onClose={handleDialogClose} />
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

            <h2 className="text-2xl font-bold mb-4 text-white">Meus Serviços</h2>
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
                            {service.rating !== null && (
                                <h1>Obrigado pela Avaliação!</h1>
                            )}
                            {service.rating === null && (
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button onClick={() => setCurrentServiceId(service.id)}>Avaliar Serviço</Button>
                                    </DialogTrigger>
                                    {currentServiceId === service.id && (
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Avaliar Serviço</DialogTitle>
                                                <DialogDescription>Insira sua avaliação abaixo</DialogDescription>
                                            </DialogHeader>
                                            <div className="mb-4">
                                                <Label htmlFor="rating">Avaliação (1 a 5)</Label>
                                                <Input
                                                    type="number"
                                                    id="rating"
                                                    value={rating}
                                                    onChange={(e) => setRating(Number(e.target.value))}
                                                    min={1}
                                                    max={5}
                                                    required
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <Label htmlFor="message">Mensagem</Label>
                                                <textarea
                                                    id="message"
                                                    value={message}
                                                    onChange={(e) => setMessage(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <DialogFooter>
                                                <Button onClick={() => handleAvaliate(service.id)}>Enviar Avaliação</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    )}
                                </Dialog>
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
