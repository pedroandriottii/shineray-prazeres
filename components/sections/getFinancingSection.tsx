'use client';
import { useEffect, useState } from 'react';
import { FinancingItem } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Card } from '@/components/ui/card';
import Cookies from 'js-cookie';
import VisibilityIcon from '@mui/icons-material/Visibility';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Link from 'next/link';

interface Motorcycle {
    id: number;
    name: string;
}

const GetFinancingSection: React.FC = () => {
    const [financingItems, setFinancingItems] = useState<FinancingItem[]>([]);
    const [motorcycles, setMotorcycles] = useState<Record<number, Motorcycle>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFinancingItems = async () => {
            const token = Cookies.get('accessToken');

            if (!token) {
                console.error('No access token found');
                setLoading(false);
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
                setFinancingItems(data);

                const motorcycleIds = data.map((item: FinancingItem) => item.motorcycleId);
                fetchMotorcycles(motorcycleIds);
            } catch (error) {
                console.error('Failed to fetch financing items', error);
                setLoading(false);
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
            } finally {
                setLoading(false);
            }
        };

        fetchFinancingItems();
    }, []);

    return (
        <div className='p-4'>
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
                            <TableHead>Nome</TableHead>
                            <TableHead>E-mail</TableHead>
                            <TableHead>Telefone</TableHead>
                            <TableHead>CPF</TableHead>
                            <TableHead>Data de Nascimento</TableHead>
                            <TableHead>CNH</TableHead>
                            <TableHead>Método</TableHead>
                            <TableHead>Concluída?</TableHead>
                            <TableHead>Moto</TableHead>
                        </TableRow>
                    </TableHeader>
                    {financingItems.map(item => (
                        <TableBody key={item.id}>
                            <TableRow className='hover:bg-slate-200'>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.phone}</TableCell>
                                <TableCell>{item.cpf}</TableCell>
                                <TableCell>{new Date(item.birthDate).toLocaleDateString()}</TableCell>
                                <TableCell>{item.hasDriverLicense ? <Badge className='bg-green-600 hover:bg-green-500'>Possui</Badge> : <Badge variant='destructive'>Não Possui</Badge>}</TableCell>
                                <TableCell>{item.method}</TableCell>
                                <TableCell>{item.isConcluded ? 'Yes' : 'No'}</TableCell>
                                <TableCell className='flex items-center justify-between'>{motorcycles[item.motorcycleId]?.name || 'Loading...'}
                                    <Link href={`/painel/motos/${item.motorcycleId}`}>
                                        <span className='text-blue-500'>
                                            <VisibilityIcon />
                                        </span>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    ))}
                </Table>
            </Card>
        </div>
    );
}

export default GetFinancingSection;
