'use client'
import GetFinancingSection from '@/components/sections/getFinancingSection';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import React from 'react';
import Cookies from 'js-cookie';

const Page: React.FC = () => {
    const role = Cookies.get('role');
    const userId = Cookies.get('userId');
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