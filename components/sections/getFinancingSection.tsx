'use client';
import { useEffect, useState } from 'react';
import { FinancingItem, Motorcycle } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Card } from '@/components/ui/card';
import Cookies from 'js-cookie';
import DeleteIcon from '@mui/icons-material/Delete';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Link from 'next/link';

interface GetFinancingSectionProps {
    isConcluded?: boolean;
}

const GetFinancingSection: React.FC<GetFinancingSectionProps> = ({ isConcluded }) => {
    const [financingItems, setFinancingItems] = useState<FinancingItem[]>([]);
    const [motorcycles, setMotorcycles] = useState<Record<number, Motorcycle>>({});

    useEffect(() => {
        const fetchFinancingItems = async () => {
            const token = Cookies.get('accessToken');

            if (!token) {
                console.error('No access token found');
                return;
            }

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/financing`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch financing items');
                }

                const data: FinancingItem[] = await response.json();
                setFinancingItems(isConcluded !== undefined ? data.filter(item => item.isConcluded === isConcluded) : data);

                const motorcycleIds = data.map((item: FinancingItem) => item.motorcycleId);
                fetchMotorcycles(motorcycleIds);
            } catch (error) {
                console.error('Failed to fetch financing items', error);
            }
        };

        const fetchMotorcycles = async (motorcycleIds: number[]) => {
            try {
                const uniqueIds = Array.from(new Set(motorcycleIds));
                const fetches = uniqueIds.map(id =>
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/motorcycles/${id}`)
                        .then(res => res.json())
                );
                const motorcycleData = await Promise.all(fetches);
                const motorcyclesMap = motorcycleData.reduce((acc, motorcycle) => {
                    acc[motorcycle.id] = motorcycle;
                    return acc;
                }, {} as Record<number, Motorcycle>);
                setMotorcycles(motorcyclesMap);
            } catch (error) {
                console.error('Failed to fetch motorcycles', error);
            }
        };

        fetchFinancingItems();
    }, [isConcluded]);

    const handleConclude = async (id: number) => {
        const token = Cookies.get('accessToken');

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/financing/${id}/conclude`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setFinancingItems((prev) => prev.filter((m) => m.id !== id));
            toast.success('Financiamento Concluído com sucesso!');
        } catch (error) {
            toast.error('Houve um problema ao concluir o Financiamento.');
        }
    };

    const handleDelete = async (id: number) => {
        const token = Cookies.get('accessToken');

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/financing/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setFinancingItems((prev) => prev.filter((m) => m.id !== id));
            toast.success('Financiamento deletado com sucesso!');
        } catch (error) {
            toast.error('Houve um problema ao deletar o Financiamento.');
        }
    }

    return (
        <div className='p-4'>
            <ToastContainer />
            <div className='flex items-center gap-6 p-4 justify-center'>
                <span className='text-shineray-color-dark'>
                    <AttachMoneyIcon fontSize='large' />
                </span>
                <h1 className='text-2xl uppercase text-shineray-color-dark text-center'>Financiamentos</h1>
            </div>
            <Card className='bg-slate-300'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Moto</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead>Telefone</TableHead>
                            <TableHead>CPF</TableHead>
                            <TableHead>Data de Nascimento</TableHead>
                            <TableHead>Método</TableHead>
                            <TableHead>Entrada</TableHead>
                            <TableHead>CNH</TableHead>
                            <TableHead>Concluída?</TableHead>
                            <TableHead>Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    {financingItems.map(item => (
                        <TableBody key={item.id}>
                            <TableRow className='hover:bg-slate-200'>
                                <Link href={`/painel/motos/${item.motorcycleId}`}>
                                    <TableCell className='flex items-center justify-between underline'>{motorcycles[item.motorcycleId]?.name || 'Loading...'}
                                    </TableCell>
                                </Link>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.phone}</TableCell>
                                <TableCell>{item.cpf}</TableCell>
                                <TableCell>{new Date(item.birthDate).toLocaleDateString()}</TableCell>
                                <TableCell>{item.method}</TableCell>
                                <TableCell>R$ {item.value}</TableCell>
                                <TableCell>{item.hasDriverLicense ? <Badge className='bg-green-600 hover:bg-green-500'>Possui</Badge> : <Badge variant='destructive'>Não Possui</Badge>}</TableCell>
                                <AlertDialog >
                                    <AlertDialogTrigger asChild >
                                        <TableCell>{item.isConcluded ? <Badge className='bg-green-600 hover:bg-green-500'>Concluída</Badge> : <Badge variant='destructive' className=' cursor-pointer'>Pendente</Badge>}</TableCell>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Mudar para Concluído?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Esta acao nao pode ser desfeita.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleConclude(item.id)}>Continuar</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>

                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <TableCell><span className='text-blue-400 cursor-pointer'><DeleteIcon /></span></TableCell>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Voce tem certeza?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Esta acao nao pode ser desfeita.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDelete(item.id)}>Continuar</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </TableRow>
                        </TableBody>
                    ))}
                </Table>
            </Card>
        </div>
    );
}

export default GetFinancingSection;
