import Link from 'next/link';
import React from 'react';

const ClientSection: React.FC = () => {
    return (
        <div className='flex flex-col px-6 w-full max-w-[1700px]'>
            <div className='relative flex flex-1 z-0 justify-between items-center bg-black px-4 py-2 text-white'>
                <h2 className='text-xl'>Área do Cliente</h2>
                <div className="absolute right-0 bottom-0 border-corner"></div>
            </div>
            <div className='flex flex-col items-center'>
                <p className='py-4'>Nossos clientes possuem acesso à um painel com informações sobre sua moto, serviços e garantias.</p>
                <Link href={'/login'}>
                    <button className='bg-shineray-color-dark rounded-full p-2 text-white w-44'>Fazer Login</button>
                </Link>
            </div>

        </div>
    );
};

export default ClientSection;