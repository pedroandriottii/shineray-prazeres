import { AuthProvider } from '@/context/AuthContext';
import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Logout from '@/components/base/logout';

const PainelLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
                            <Link href={'/painel/motos'}>
                                <Button>Estoque</Button>
                            </Link>
                            <Link href={'/painel/clientes'}>
                                <Button>Clientes</Button>
                            </Link>
                            <Link href={'/painel/servicos'}>
                                <Button>Serviços</Button>
                            </Link>
                            <Link href={'/painel/financiamentos'}>
                                <Button>Financiamentos</Button>
                            </Link>
                        </div>
                        <Logout />
                    </div>
                    <main className="bg-[#F0F0F0]">{children}</main>
                </body>
            </AuthProvider>
        </html>
    );
};

export default PainelLayout;
