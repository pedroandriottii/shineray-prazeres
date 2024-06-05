'use client'
import GetFinancingSection from '@/components/sections/getFinancingSection';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Page: React.FC = () => {
    const [role, setRole] = useState<string>('');
    const [userId, setUserId] = useState<string>('');

    useEffect(() => {
        const role = localStorage.getItem('role');
        const userId = localStorage.getItem('userId');

        if (role) {
            setRole(role);
        }
        if (userId) {
            setUserId(userId);
        }
    })

    return (
        <div>
            <h1 className='bg-green-500'>ROLA - {role}</h1>
            <h1 className='bg-purple-200'>AIDI - {userId}</h1>
            {role === 'ADMIN' && (
                <div>
                    <h1>PAGINA DO ADM</h1>
                    <Link href={'/painel/cadastro/cliente'}>
                        Cadastrar Cliente
                    </Link>
                    <Link href={'/painel/cadastro/moto'}>
                        Cadastrar Moto
                    </Link>
                    <GetFinancingSection />
                </div>
            )}
            {role === 'CLIENT' && (
                <div>
                    <h1>PAGINA DO CLIENTE</h1>
                </div>
            )}

        </div>
    );
};

export default Page;