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

    const getDisplayValue = (field: string | number | boolean | null) => {
        switch (field) {
            case null:
                return '--';
            case 'SEM_ENTRADA':
                return 'Sem Entrada';
            case 'COM_ENTRADA':
                return 'Com Entrada';
            case 'A_VISTA':
                return 'À Vista';
            default:
                return field;
        }
    }

    return (
        <div >
            <Card className='bg-[#373737] border-none'>
                <div className='flex items-center p-4 text-shineray-color-dark gap-4'>
                    <span>
                        <AttachMoneyIcon fontSize='large' />
                    </span>
                    <h1 className='text-2xl uppercase text-center'>Financiamentos</h1>
                </div>
                <Table className='bg-[#373737]'>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='text-white font-bold text-xl'>Moto</TableHead>
                            <TableHead className='text-white font-bold text-xl'>Nome</TableHead>
                            <TableHead className='text-white font-bold text-xl'>Telefone</TableHead>
                            <TableHead className='text-white font-bold text-xl'>CPF</TableHead>
                            <TableHead className='text-white font-bold text-xl'>Data de Nascimento</TableHead>
                            <TableHead className='text-white font-bold text-xl'>Método</TableHead>
                            <TableHead className='text-white font-bold text-xl'>Entrada</TableHead>
                            <TableHead className='text-white font-bold text-xl'>CNH</TableHead>
                            <TableHead className='text-white font-bold text-xl'>Status</TableHead>
                            <TableHead className='text-white font-bold text-xl'>Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    {financingItems.map(item => (
                        <TableBody key={item.id}>
                            <TableRow className='hover:bg-shineray-color-dark'>
                                <Link href={`/painel/motos/${item.motorcycleId}`}>
                                    <TableCell className='text-white font-md underline'>{motorcycles[item.motorcycleId]?.name}
                                    </TableCell>
                                </Link>
                                <TableCell className='text-white'>{item.name}</TableCell>
                                <TableCell className='text-white'>{item.phone}</TableCell>
                                <TableCell className='text-white'>{item.cpf}</TableCell>
                                <TableCell className='text-white'>{new Date(item.birthDate).toLocaleDateString()}</TableCell>
                                <TableCell className='text-white'>{getDisplayValue(item.method)}</TableCell>
                                <TableCell className='text-white'>R$ {getDisplayValue(item.value)}</TableCell>
                                <TableCell className='text-white'>{item.hasDriverLicense ? <Badge className='bg-green-600 hover:bg-green-500'>Possui</Badge> : <Badge variant='destructive'>Não Possui</Badge>}</TableCell>
                                <AlertDialog >
                                    <AlertDialogTrigger asChild >
                                        <TableCell>{item.isConcluded ? <Badge className='bg-green-600 hover:bg-green-500'>Concluída</Badge> : <Badge variant='destructive' className='cursor-pointer'>Pendente</Badge>}</TableCell>
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
            </Card >
            <ToastContainer />
        </div>

    );
}

export default GetFinancingSection;
