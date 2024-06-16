'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Cookies from 'js-cookie';
import { Client, Service } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';
import ChangePassword from './auth/changePassword';
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';
import { Textarea } from './ui/textarea';
import { Rating, Star, ThinRoundedStar } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

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

    const myStyles = {
        itemShapes: Star,
        activeFillColor: '#cc0000',
        inactiveFillColor: '#ffffff',
        inactiveBoxBorderColor: '#cc0000',
        itemStrokeWidth: 1,
        inactiveStrokeColor: "#cc0000",
        activeStrokeColor: "#cc0000",
    }

    console.log(userData)

    return (
        <div className="bg-white h-[85vh]">
            <div className='p-6'>
            <AlertDialog defaultOpen={userData?.isFirstAccess}>
                <AlertDialogContent className='max-w-[360px]' >
                    <AlertDialogHeader>
                        <AlertDialogTitle>Olá, {userData?.name}! Este é seu primeiro login?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Recomendamos que altere sua senha automatica que voce recebeu para sua maior segurança.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className='flex flex-col sm:flex-col sm:space-x-0 gap-2 mt-4'>
                        <AlertDialogAction className='bg-[#CC0000] hover:bg-[#f10000] hover:text-white text-white font-semibold' onClick={() => setAlterarSenha(true)}>Alterar</AlertDialogAction>
                        <AlertDialogCancel className='' asChild>
                            <Button className='bg-black font-semibold hover:bg-gray-800 hover:text-white'>Cancelar</Button>
                        </AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <ChangePassword clientId={id} isOpen={alterarSenha} onClose={handleDialogClose} />
            <h1 className="text-2xl md:text-4xl md:mt-6 md:mb-10 font-bold mb-4">Olá, {userData?.name}! Bem vindo!</h1>
            {userData ? (
                <div className="mb-6 flex flex-col md:flex-row justify-center items-start gap-4 min-h-[40vh]">
                    <Card className='mb-6 shadow-lg w-full md:mb-0'>
                        <CardHeader >
                            <CardTitle className='text-base'>Meus Dados</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className='text-sm'><strong>Nome:</strong> {userData.name}</p>
                            <p className='text-sm'><strong>Email:</strong> {userData.email}</p>
                            <p className='text-sm'><strong>Telefone:</strong> {userData.phone}</p>
                            <p className='text-sm'><strong>CPF:</strong> {userData.cpf}</p>
                        </CardContent>
                    </Card>
                    <Card className='shadow-lg w-full'>
                    <CardHeader >
                            <CardTitle className='text-base'>Minha Shineray</CardTitle>
                        </CardHeader>
                        <CardContent>

                        <p className='text-sm'><strong>Moto:</strong> {userData.motorcycle}</p>
                        <p className='text-sm'><strong>Chassi:</strong> {userData.chassi}</p>
                        <p className='text-sm'><strong>Cor:</strong> {userData.color}</p>
                        <p className='text-sm'><strong>Data da Venda:</strong> {new Date(userData.saleDate).toLocaleDateString()}</p>
                        </CardContent>
                    </Card>
                </div>
            ) : (
                <div className='text-red-500'>Cliente não encontrado</div>
            )}
            </div>

            <div className='bg-[#CC0000] p-6'>
            <h2 className="text-2xl font-bold text-white mb-4 ">Meus Serviços</h2>
            {services.length > 0 ? (
                <Carousel>
                    <CarouselContent>
                    {services.map((service) => (
                        <CarouselItem className='md:basis-1/2 lg:basis-1/3' key={service.id}>
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
                                        <Button onClick={() => setCurrentServiceId(service.id)} className='bg-[#cc0000] hover:bg-[#ff0000] font-bold w-full rounded-full'>Avaliar</Button>
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
                        </Card>
                        </CarouselItem>
                    ))}
                    </CarouselContent>
                </Carousel>
            ) : (
                <p>Sem serviços</p>
            )}
        </div>
        </div>

    );
};

export default ClientPanel;
