'use client'
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import PersonIcon from '@mui/icons-material/Person';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card } from '@/components/ui/card';

interface Client {
    id: number;
    name: string;
    email: string;
    role: string;
}

const Page: React.FC = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const token = Cookies.get('accessToken');
                if (!token) {
                    setError('Token not found');
                    setLoading(false);
                    return;
                }

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch clients');
                }

                const data = await response.json();
                setClients(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchClients();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='p-4'>
            <div className='flex items-center gap-6'>
                <span className='text-shineray-color-dark'>
                    <PersonIcon fontSize='large' />
                </span>
                <h1 className='text-2xl uppercase text-shineray-color-dark text-center'>Clientes</h1>
            </div>
            <Card>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>E-mail</TableHead>
                            <TableHead>Role</TableHead>
                        </TableRow>
                    </TableHeader>
                    {clients.map(item => (
                        <TableBody key={item.id}>
                            <TableRow className='hover:bg-slate-200'>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.role}</TableCell>
                            </TableRow>
                        </TableBody>
                    ))}
                </Table>
            </Card>
        </div>
    );
};

export default Page;
