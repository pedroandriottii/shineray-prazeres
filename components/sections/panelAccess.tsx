import Link from 'next/link';
import React from 'react';

const PanelAccess: React.FC = () => {
    return (
        <div className='p-2'>
            <h1 className='flex justify-center text-shineray-color-dark uppercase font-bold'>
                Área do Cliente
            </h1>
            <p>Nossos clientes possuem acesso à um painel com informações sobre sua moto, serviços e garantias.</p>
            <Link href={'/login'}>
                <div className='flex justify-center p-2 rounded-2xl text-center bg-shineray-color-dark text-white m-2'>
                    Fazer Login
                </div>
            </Link>
        </div>
    );
};

export default PanelAccess;