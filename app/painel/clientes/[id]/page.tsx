'use client';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card } from '@mui/material';
import { Button } from '@/components/ui/button';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import { Client, Service } from '@/lib/types';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ClientDetailPage: React.FC = () => {
    const pathname = usePathname();
    const id = pathname.split('/').pop();

    const router = useRouter();

    const [client, setClient] = useState<Client | null>(null);
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [type, setType] = useState('');
    const [date, setDate] = useState('');
    const [kilometers, setKilometers] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);

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

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = Cookies.get('accessToken');
            if (!token) {
                toast.error('Token not found');
                return;
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name,
                    price: parseFloat(price),
                    type,
                    date: new Date(date).toISOString(),
                    kilometers: parseInt(kilometers),
                    userId: id,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to register service');
            }

            toast.success('Serviço criado com sucesso!');
            setName('');
            setPrice('');
            setType('');
            setDate('');
            setKilometers('');
            setIsDialogOpen(false);

        } catch (err) {
            console.error('Error registering service:', err);
            toast.error('Falha ao registrar o serviço.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='p-6 flex flex-col gap-6'>
            <ToastContainer />
            <Card className='flex items-center justify-between p-2 border-none bg-shineray-color-dark text-2xl uppercase text-white rounded-sm'>
                <ArrowBackIcon
                    className='cursor-pointer'
                    onClick={() => router.back()}
                />
                <span className='flex-1 text-center'>Detalhes do Cliente</span>
                <div className='w-6' />
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
                            <div>
                                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button className='bg-shineray-color-dark text-white hover:bg-white hover:text-shineray-color-dark'>Cadastrar Serviço</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader className='flex items-center'>
                                            <DialogTitle>Cadastrar Serviço</DialogTitle>
                                            <DialogDescription>
                                                Insira as informações do Serviço
                                            </DialogDescription>
                                        </DialogHeader>

                                        <form onSubmit={handleRegister} className="grid gap-4 py-4">
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="name" className="text-right">
                                                    Nome
                                                </Label>
                                                <Input
                                                    id="name"
                                                    value={name}
                                                    placeholder='Nome do Serviço'
                                                    onChange={(e) => setName(e.target.value)}
                                                    className="col-span-3"
                                                    required
                                                />
                                            </div>

                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="type" className="text-right">
                                                    Tipo
                                                </Label>
                                                <Select onValueChange={(value) => setType(value)} defaultValue={type}>
                                                    <SelectTrigger className="col-span-3">
                                                        <SelectValue placeholder="Selecione um Tipo" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Tipo</SelectLabel>
                                                            <SelectItem value="GARANTIA">Garantia</SelectItem>
                                                            <SelectItem value="PAGO">Pago</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            {type === 'PAGO' && (
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="price" className="text-right">
                                                        Preço
                                                    </Label>
                                                    <Input
                                                        id="price"
                                                        type="number"
                                                        value={price}
                                                        placeholder='R$ 0,00'
                                                        onChange={(e) => setPrice(e.target.value)}
                                                        className="col-span-3"
                                                        required
                                                    />
                                                </div>
                                            )}
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="date" className="text-right">
                                                    Data
                                                </Label>
                                                <Input
                                                    id="date"
                                                    type="date"
                                                    value={date}
                                                    onChange={(e) => setDate(e.target.value)}
                                                    className="col-span-3"
                                                    required
                                                />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="kilometers" className="text-right">
                                                    KM
                                                </Label>
                                                <Input
                                                    id="kilometers"
                                                    type="number"
                                                    value={kilometers}
                                                    onChange={(e) => setKilometers(e.target.value)}
                                                    className="col-span-3"
                                                    required
                                                />
                                            </div>
                                            <DialogFooter>
                                                <Button type="submit">Cadastrar</Button>
                                            </DialogFooter>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                        {services.length > 0 ? (
                            <div className='grid grid-cols-4 gap-6 p-4'>
                                {services.map(service => (
                                    <div key={service.id} className='p-2 shadow-md border  rounded-xl border-shineray-color-dark'>
                                        <p className='text-center'><strong>{service.name}</strong></p>
                                        <div className='flex justify-between'>
                                            <p>{service.type}</p>
                                            {service.price && <p> R$ {service.price}</p>}
                                        </div>
                                        <p><span className='text-sm'>Data:</span> {new Date(service.date).toLocaleDateString()}</p>
                                        <p><span className='text-sm'>Quilometragem:</span > {service.kilometers} KM</p>
                                        {service.rating && <p><strong>Avaliação:</strong> {service.rating}</p>}
                                        {service.message && <p className='flex flex-col items-center'><span className='text-sm'>Mensagem:</span > {service.message}</p>}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>Sem serviços</p>
                        )}
                    </Card>
                </div>
            ) : (
                <div className='text-red-500'>Cliente não encontrado</div>
            )}
        </div>
    );
};

export default ClientDetailPage;
