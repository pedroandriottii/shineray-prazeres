'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Cookies from 'js-cookie';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

import { useRouter } from 'next/navigation';
import { Client } from '@/lib/types';
import { Rating, Star } from '@smastrom/react-rating';
import { Textarea } from '@/components/ui/textarea';
import ClientsLinks from '@/components/ClientsLinks';

interface Service {
    id: number;
    name: string;
    description: string;
    price: number;
    type: string;
    userId: string | null;
    date: string;
    kilometers: number;
    rating: number | null;
    user: {
        id: string;
        name: string;
        email: string;
        createdAt: string;
        updatedAt: string;
    };
    createdAt: string;
    updatedAt: string;
}

enum ServiceType {
    GARANTIA = 'GARANTIA',
    PAGO = 'PAGO'
}

const Services: React.FC = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editService, setEditService] = useState<Service | null>(null);
    const [selectedClient, setSelectedClient] = useState<string>('');
    const router = useRouter();
    const token = Cookies.get('accessToken');
    const role = Cookies.get('role');
    const [currentServiceId, setCurrentServiceId] = useState<number | null>(null);
    const [rating, setRating] = useState<number>(0);
    const [message, setMessage] = useState<string>('');

    const myStyles = {
        itemShapes: Star,
        activeFillColor: '#cc0000',
        inactiveFillColor: '#ffffff',
        inactiveBoxBorderColor: '#cc0000',
        itemStrokeWidth: 1,
        inactiveStrokeColor: "#cc0000",
        activeStrokeColor: "#cc0000",
    }

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`, {
                    headers: {
                        'Content-Type': 'application/json',
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

        const fetchClients = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch clients');
                }
                const data = await response.json();
                setClients(data);
            } catch (err) {
                console.error('Error fetching clients:', err);
            }
        };

        fetchServices();
        fetchClients();
    }, [token]);

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

    const handleEdit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!editService) return;

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/${editService.id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: editService.name,
                    description: editService.description,
                    price: editService.price,
                    type: editService.type,
                    userId: selectedClient || editService.userId,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const updatedService = await response.json();
            setServices((prevServices) => prevServices.map((service) => (service.id === updatedService.id ? updatedService : service)));
            setEditService(null);
            setSelectedClient('');
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setServices((prevServices) => prevServices.filter((service) => service.id !== id));
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        if (editService) {
            setEditService({
                ...editService,
                [e.target.name]: e.target.value,
            });
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="p-6 bg-white h-screen">
            {role === 'CLIENT' && (<ClientsLinks />)}
            <h1 className="text-2xl md:text-4xl md:mt-6 md:mb-10 font-bold mb-4">Lista de Serviços</h1>
            <div className="grid grid-cols-2 grid-flow-row gap-4 md:grid-cols-2 lg:grid-cols-4">
                {services.map((service) => (
                    <Card key={service.id} className="flex p-2 flex-col flex-1 h-full justify-between">
                        <CardHeader>
                            <CardTitle className='text-base'>{service.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                        <p><strong>Tipo:</strong> {service.type}</p>
                        <p><strong>Data:</strong> {new Date(service.date).toLocaleDateString()}</p>
                        <p><strong>Quilometragem:</strong> {service.kilometers}</p>
                        {service.price && (
                            <p><strong>Preço:</strong> {service.price}</p>
                        )}
                        {service.rating !== null && (
                            <p className='text-green-500 underline underline-offset-1'>Obrigado pela Avaliação!</p>
                        )}
                        </CardContent>
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
                                            <div className="mb-4 flex flex-col gap-2 justify-center items-center">
                                                <Rating
                                                    itemStyles={myStyles}
                                                    value={rating}
                                                    onChange={setRating} 
                                                    style={{ maxHeight: '50px', maxWidth: '200px' }}
                                                />
                                            </div>
                                            <div className="mb-4 flex flex-col gap-2">
                                                <Label htmlFor="message">Deixe um comentário</Label>
                                                <Textarea
                                                    id="message"
                                                    value={message}
                                                    onChange={(e) => setMessage(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <DialogFooter>
                                                <Button onClick={() => handleAvaliate(service.id)} className='bg-[#cc0000] hover:bg-[#ff0000] font-bold w-full'>Enviar Avaliação</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    )}
                                </Dialog>
                            )}
                        {role === 'ADMIN' && (
                            <>
                                <p>Usuário: {service.user?.name}</p><Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" onClick={() => { setEditService(service); setSelectedClient(service.userId || ''); }}>Editar Serviço</Button>
                                    </DialogTrigger>
                                    {editService && editService.id === service.id && (
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>Editar Serviço</DialogTitle>
                                                <DialogDescription>Edite seu serviço e clique para salvar quando concluir</DialogDescription>
                                            </DialogHeader>
                                            <form onSubmit={handleEdit}>
                                                <div className="mb-4">
                                                    <Label htmlFor="name">Nome</Label>
                                                    <Input type="text" id="name" name="name" value={editService.name} onChange={handleChange} required />
                                                </div>
                                                <div className="mb-4">
                                                    <Label htmlFor="description">Descrição</Label>
                                                    <textarea id="description" name="description" value={editService.description} onChange={handleChange} required />
                                                </div>
                                                <div className="mb-4">
                                                    <Label htmlFor="price">Preço</Label>
                                                    <Input type="number" id="price" name="price" value={editService.price} onChange={handleChange} required />
                                                </div>
                                                <div className="mb-4">
                                                    <Label htmlFor="type">Tipo</Label>
                                                    <Input type="text" id="type" name="type" value={editService.type} onChange={handleChange} required />
                                                </div>
                                                <div className="mb-4">
                                                    <Label htmlFor="client">Cliente</Label>
                                                    <select id="client" name="userId" value={selectedClient} onChange={(e) => setSelectedClient(e.target.value)}>
                                                        <option value="">Selecione um cliente</option>
                                                        {clients.map((client) => (
                                                            <option key={client.id} value={client.id}>{client.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <Button type="submit" className="mt-4 w-full">Atualizar Serviço</Button>
                                            </form>
                                        </DialogContent>
                                    )}
                                </Dialog><AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="destructive">Deletar Serviço</Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                                            <AlertDialogDescription>Esta ação não pode ser desfeita. Você perderá o serviço para sempre.</AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDelete(service.id)}>Continuar</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </>
                        )}
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Services;
