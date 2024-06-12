"use client"
import { AuthProvider } from '@/context/AuthContext';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Logout from '@/components/base/logout';
import { Montserrat } from "next/font/google";
import Cookies from 'js-cookie';

const Font = Montserrat({ subsets: ["latin"], weight: ["400"] });

const PainelLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isMounted, setIsMounted] = useState(false);
    const role = Cookies.get('role');

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }
    return (
        <html lang="en">
            <AuthProvider>
                <body className={`${Font.className} font-light bg-[#121212]`} >
                    <div className="white px-6 py-4 flex justify-between items-center">
                        <Image
                            src={'/logo_revisao.png'}
                            width={60}
                            height={60}
                            alt="Logomarca Shineray Prazeres"
                        />
                        <div className="flex justify-around gap-10">
                            <Link href={'/painel'}>
                                <Button variant='outline'>Painel</Button>
                            </Link>
                            {role === 'ADMIN' && (
                                <>
                                    <Link href={'/painel/motos'}>
                                        <Button variant='outline'>Estoque</Button>
                                    </Link>
                                    <Link href={'/painel/clientes'}>
                                        <Button variant='outline'>Clientes</Button>
                                    </Link>
                                    <Link href={'/painel/financiamentos'}>
                                        <Button variant='outline'>Financiamentos</Button>
                                    </Link>
                                    <Link href={'/painel/avaliacoes'}>
                                        <Button variant='outline'>Avaliações</Button>
                                    </Link>
                                </>
                            )}
                            {role === 'CLIENT' && (
                                <Link href={'/painel/servicos'}>
                                    <Button variant='outline'>Serviços</Button>
                                </Link>
                            )}
                        </div>
                        <Logout />
                    </div>
                    {children}
                </body>
            </AuthProvider>
        </html>
    );
};

export default PainelLayout;
