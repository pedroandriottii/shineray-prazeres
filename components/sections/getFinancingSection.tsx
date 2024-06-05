'use client';
import { useEffect, useState } from 'react';
import { FinancingItem } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Card } from '@/components/ui/card';
import Cookies from 'js-cookie';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


const GetFinancingSection: React.FC = () => {
    const [financingItems, setFinancingItems] = useState<FinancingItem[]>([]);
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

                const data = await response.json();
                setFinancingItems(data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch financing items', error);
                setLoading(false);
            }
        };

        fetchFinancingItems();
    }, []);

    return (
        <div className='p-4'>
            <div className='flex items-center gap-6 p-4 justify-center'>
                <span className='text-shineray-color-dark'>
                    < AttachMoneyIcon fontSize='large' />
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
                            <TableHead>Metodo</TableHead>
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
                                <TableCell> {item.method}</TableCell>
                                <TableCell>{item.isConcluded ? 'Yes' : 'No'}</TableCell>
                                <TableCell>SHI-175</TableCell>
                            </TableRow>
                        </TableBody>
                    ))}
                </Table>
            </Card>
        </div >



    );
}

export default GetFinancingSection;
