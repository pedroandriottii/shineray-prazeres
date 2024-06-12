'use client';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Avaliation } from '@/lib/types';
import { Card } from '@/components/ui/card';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from 'next/navigation';

const Page: React.FC = () => {
    const role = Cookies.get('role');
    const token = Cookies.get('accessToken');
    const [avaliations, setAvaliations] = useState<Avaliation[]>([]);
    const [averageRating, setAverageRating] = useState<Avaliation | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const router = useRouter();

    useEffect(() => {
        if (role === 'ADMIN') {
            fetchAvaliations();
            fetchAverageRating();
        }
    }, [role]);

    const fetchAvaliations = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/avaliations`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch avaliations');
            }

            const data = await response.json();
            setAvaliations(data);
        } catch (error) {
            console.error('Failed to fetch avaliations', error);
            setError('Failed to fetch avaliations');
        } finally {
            setLoading(false);
        }
    };

    const handleRowClick = (id: number) => {
        router.push(`/painel/clientes/${id}`);
    };

    const fetchAverageRating = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/avaliations/average`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch average rating');
            }

            const data = await response.json();
            setAverageRating(data);
        } catch (error) {
            console.error('Failed to fetch average rating', error);
            setError('Failed to fetch average rating');
        }
    };

    const toggleSortOrder = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const sortedAvaliations = [...avaliations].sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.rating - b.rating;
        } else {
            return b.rating - a.rating;
        }
    });

    return (
        <div className='p-6 flex flex-col gap-6'>
            <Card className='p-2 border-none bg-shineray-color-dark text-center text-2xl uppercase text-white rounded-sm'>
                Área das Avaliações
            </Card>
            <Card className="bg-[#373737] border-none">
                <div className='flex items-center gap-6 justify-between text-shineray-color-dark p-4'>
                    <div className='flex items-center gap-4'>
                        <span className='text-shineray-color-dark'><StarBorderIcon /></span>
                        <h1 className='text-2xl uppercase text-center'>Avaliações</h1>
                    </div>
                    <div>
                        {averageRating && (
                            <div className="flex flex-col items-center text-xl">
                                <p>Média: {averageRating.rating}</p>
                            </div>
                        )}
                    </div>
                </div>
                <Table>
                    <TableHeader >
                        <TableRow>
                            <TableHead className='text-white font-bold text-xl'>Nome</TableHead>
                            <TableHead className='text-white font-bold text-xl cursor-pointer' onClick={toggleSortOrder}>
                                Nota {sortOrder === 'asc' ? '↑' : '↓'}
                            </TableHead>
                            <TableHead className='text-white font-bold text-xl'>Avaliação</TableHead>
                            <TableHead className='text-white font-bold text-xl'>Data</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedAvaliations.map(item => (
                            <TableRow key={item.id} className='hover:bg-shineray-color-dark hover:rounded-2xl cursor-pointer' onClick={() => handleRowClick(item.user.id)}>
                                <TableCell className='text-white font-md'>{item.user.name}</TableCell>
                                <TableCell className='text-white font-md'>{item.rating}</TableCell>
                                <TableCell className='text-white font-md'>{item.message}</TableCell>
                                <TableCell className='text-white font-md'>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card >
        </div >
    );
};

export default Page;
