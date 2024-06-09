'use client'
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Motorcycle } from '@/lib/types';

const Page: React.FC = () => {
    const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editMotorcycle, setEditMotorcycle] = useState<Motorcycle | null>(null);
    const [image, setImage] = useState<File | null>(null);
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
        formData.append('chassi', editMotorcycle.chassi);
        formData.append('price', editMotorcycle.price.toString());
        formData.append('year', editMotorcycle.year.toString());
        formData.append('model', editMotorcycle.model);
        formData.append('color', editMotorcycle.color);
        formData.append('specs', editMotorcycle.specs);

        if (image) {
            formData.append('image', image);
        }
        formData.append('description', editMotorcycle.description);

        try {
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

            router.push('/painel/motos');
            toast.success('Moto atualizada com sucesso!');
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
            toast.error('Houve um problema ao atualizar a moto.');
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
    }

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
        <div className='p-6'>
            <Link href={'/painel/motos/cadastrar'}>
                <Button>
                    BUTÂUM
                </Button>
            </Link>
            <div className='grid grid-flow-row gap-10 lg:grid-cols-6'>
                {motorcycles.map((motorcycle) => (
                    <div key={motorcycle.id} className="motorcycle-card">
                        <Link href={`/painel/motos/${motorcycle.id}`}>
                            <Card className='flex p-2 flex-col'>
                                <img className='w-full rounded-md' src={motorcycle.imageUrls[0]} alt={motorcycle.name} width={200} height={150} />
                                <div className='flex justify-between items-center'>
                                    <p className='flex items-center gap-2'>
                                        <h2 className='flex text-center py-2 uppercase justify-center font-bold text-shineray-color-dark'>{motorcycle.name}</h2>
                                        <p>{motorcycle.year}</p>
                                    </p>
                                    <p>R${motorcycle.price}</p>
                                </div>
                                <p>{motorcycle.description}</p>
                                <p>{motorcycle.model}</p>
                                <p><span className='text-shineray-color-dark uppercase'>Cor: </span>{motorcycle.color}</p>
                                <span className='text-shineray-color-dark uppercase flex justify-center pt-2'>Ficha Técnica:</span>
                                <p className='flex text-center justify-center'>{motorcycle.specs}</p>
                            </Card>
                        </Link>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" onClick={() => setEditMotorcycle(motorcycle)}>Edit Moto</Button>
                            </DialogTrigger>
                            {editMotorcycle && (
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Editar moto</DialogTitle>
                                        <DialogDescription>
                                            Edite sua moto e clique para salvar quando concluir
                                        </DialogDescription>
                                    </DialogHeader>
                                    <form onSubmit={handleEdit}>
                                        <div className="mb-4">
                                            <Label htmlFor="name">Nome</Label>
                                            <Input type="text" id="name" name="name" value={editMotorcycle.name} onChange={handleChange} required />
                                        </div>
                                        <div className="mb-4">
                                            <Label htmlFor="chassi">Chassi</Label>
                                            <Input type="text" id="chassi" name="chassi" value={editMotorcycle.chassi} onChange={handleChange} required />
                                        </div>
                                        <div className="mb-4">
                                            <Label htmlFor="price">Preço</Label>
                                            <Input type="text" id="price" name="price" value={editMotorcycle.price} onChange={handleChange} required />
                                        </div>
                                        <div className="mb-4">
                                            <Label htmlFor="year">Ano</Label>
                                            <Input type="text" id="year" name="year" value={editMotorcycle.year} onChange={handleChange} required />
                                        </div>
                                        <div className="mb-4">
                                            <Label htmlFor="model">Modelo</Label>
                                            <Input type="text" id="model" name="model" value={editMotorcycle.model} onChange={handleChange} required />
                                        </div>
                                        <div className="mb-4">
                                            <Label htmlFor="color">Cor</Label>
                                            <Input type="text" id="color" name="color" value={editMotorcycle.color} onChange={handleChange} required />
                                        </div>
                                        <div className="mb-4">
                                            <Label htmlFor="image">Imagem</Label>
                                            <Input type="file" id="image" name="image" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} />
                                        </div>
                                        <div className="mb-4">
                                            <Label htmlFor="description">Descrição</Label>
                                            <textarea id="description" name="description" value={editMotorcycle.description} onChange={handleChange} required />
                                        </div>
                                        <div className="mb-4">
                                            <Label htmlFor="specs">Specs</Label>
                                            <textarea id="specs" name="specs" value={editMotorcycle.specs} onChange={handleChange} required />
                                        </div>
                                        <Button type="submit" className="mt-4 w-full">Atualizar Moto</Button>
                                    </form>
                                </DialogContent>
                            )}
                        </Dialog>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive">Deleta essa Motoca</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Voce tem certeza valter??</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Esta acao nao pode ser desfeita. voce vai perder pra sempre a sua motoca.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDelete(motorcycle.id)}>Continuar</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Page;
