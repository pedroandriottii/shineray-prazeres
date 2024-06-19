'use client'
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Motorcycle } from '@/lib/types';
import 'react-toastify/dist/ReactToastify.css';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import Image from 'next/image';

const Page: React.FC = () => {
    const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editMotorcycle, setEditMotorcycle] = useState<Motorcycle | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchMotorcycles = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/motorcycles`, {});

                if (!response.ok) {
                    throw new Error('Failed to fetch motorcycles');
                }

                const data = await response.json();
                setMotorcycles(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchMotorcycles();
    }, []);

    const handleEdit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!editMotorcycle) return;
        const token = Cookies.get('accessToken');

        const formData = new FormData();
        formData.append('name', editMotorcycle.name);
        formData.append('price', editMotorcycle.price.toString());
        formData.append('color', editMotorcycle.color);
        formData.append('specs', editMotorcycle.specs);
        formData.append('description', editMotorcycle.description);

        try {
            setIsLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/motorcycles/${editMotorcycle.id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            toast.success('Moto atualizada com sucesso!');
            router.push('/painel/motos');
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
            toast.error('Houve um problema ao atualizar a moto.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        const token = Cookies.get('accessToken');

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/motorcycles/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setMotorcycles((prev) => prev.filter((m) => m.id !== id));
            toast.success('Moto deletada com sucesso!');
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
            toast.error('Houve um problema ao deletar a moto.');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (editMotorcycle) {
            setEditMotorcycle({
                ...editMotorcycle,
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
        <div className='p-6 flex flex-col gap-6'>
            <Card className='p-2 border-none bg-shineray-color-dark text-center text-2xl uppercase text-white rounded-sm'>
                Gerenciamento de Estoque
            </Card>
            <Card className='bg-[#373737] border-none'>
                <div className='flex items-center justify-between p-4'>
                    <div className='flex items-center gap-6 text-shineray-color-dark'>
                        <TwoWheelerIcon />
                        <h1 className='text-2xl uppercase text-center'>Motos</h1>
                    </div>
                    <div>
                        <Link href={'/painel/motos/cadastrar'}>
                            <Button className='bg-shineray-color-dark hover:bg-white hover:text-shineray-color-dark'>
                                Cadastrar Moto
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className='grid grid-flow-row gap-10 lg:grid-cols-5 p-4'>
                    {motorcycles.map((motorcycle) => (
                        <Card key={motorcycle.id} className='flex flex-col rounded-b-none'>
                            <Link href={`/painel/motos/${motorcycle.id}`}>
                                <Image
                                    className='w-full rounded-t-md'
                                    src={motorcycle.imageUrls[0]}
                                    alt={motorcycle.name}
                                    width={200}
                                    height={150}
                                />
                                <div className='flex flex-col gap-2 p-2'>
                                    <p className='text-center text-xl text-shineray-color-dark uppercase'>{motorcycle.name}</p>
                                    <div className='flex justify-between items-center border-shineray-color-dark border p-1'>
                                        <p>Valor</p>
                                        <p>R$ {motorcycle.price}</p>
                                    </div>
                                </div>
                            </Link>
                            <div className='grid grid-cols-2'>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className='bg-[#373737] rounded-none' onClick={() => setEditMotorcycle(motorcycle)}>Editar</Button>
                                    </DialogTrigger>
                                    {editMotorcycle && editMotorcycle.id === motorcycle.id && (
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>Editar moto</DialogTitle>
                                                <DialogDescription>
                                                    Atualize as informações da moto.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <form onSubmit={handleEdit}>
                                                <div className="mb-4">
                                                    <Label htmlFor="name">Nome</Label>
                                                    <Input type="text" id="name" name="name" value={editMotorcycle.name} onChange={handleChange} required />
                                                </div>

                                                <div className="mb-4">
                                                    <Label htmlFor="price">Preço</Label>
                                                    <Input type="text" id="price" name="price" value={editMotorcycle.price.toString()} onChange={handleChange} required />
                                                </div>
                                                <div className="mb-4">
                                                    <Label htmlFor="color">Cor</Label>
                                                    <Input type="text" id="color" name="color" value={editMotorcycle.color} onChange={handleChange} required />
                                                </div>
                                                <div className="mb-4">
                                                    <Label htmlFor="description">Descrição</Label>
                                                    <textarea id="description" name="description" value={editMotorcycle.description} onChange={handleChange} required />
                                                </div>
                                                <div className="mb-4">
                                                    <Label htmlFor="specs">Specs</Label>
                                                    <textarea id="specs" name="specs" value={editMotorcycle.specs} onChange={handleChange} required />
                                                </div>
                                                <Button type="submit" className="mt-4 w-full" disabled={isLoading}>
                                                    {isLoading ? 'Atualizando...' : 'Atualizar Moto'}
                                                </Button>
                                            </form>
                                        </DialogContent>
                                    )}
                                </Dialog>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="destructive" className='rounded-none'>Deletar</Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Voce tem certeza?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Esta ação não pode ser desfeita. Você tem certeza de que deseja deletar esta moto?
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDelete(motorcycle.id)}>Continuar</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </Card>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default Page;
