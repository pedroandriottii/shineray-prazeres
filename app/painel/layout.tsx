'use client';
import { AuthProvider } from '@/context/AuthContext';
import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const PainelLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();

    const handleLogout = () => {
        Cookies.remove('accessToken');
        Cookies.remove('role');
        Cookies.remove('userId');
        router.push('/login');
    };

    return (
        <html lang="en">
            <AuthProvider>
                <body>
                    <div className="white p-2 flex justify-between items-center">
                        <Image
                            src={'/logo_revisao.png'}
                            width={60}
                            height={60}
                            alt="Logomarca Shineray Prazeres"
                        />
                        <div className="flex justify-around gap-10">
                            <Link href={'/painel/cadastro/motos'}>
                                <Button>Cadastrar Moto</Button>
                            </Link>
                            <Link href={'/painel/cadastro/clientes'}>
                                <Button>Cadastrar Cliente</Button>
                            </Link>
                            <Link href={'/painel/cadastro/servicos'}>
                                <Button>Cadastrar Serviço</Button>
                            </Link>
                            <Link href={'/painel/financiamentos'}>
                                <Button>Financiamentos</Button>
                            </Link>
                        </div>
                        <LogoutIcon onClick={handleLogout} />
                    </div>
                    <main className="bg-[#F0F0F0]">{children}</main>
                </body>
            </AuthProvider>
        </html>
    );
};

export default PainelLayout;
