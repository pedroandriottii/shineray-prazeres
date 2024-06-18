import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';

const ClientsLinks: React.FC = () => {
  return (
    <div className='w-full flex justify-end gap-3 px-4 md:px-10 py-4 md:pt-8'>
      <Link href={'/painel'}>
        <Button className='bg-[#cc0000] hover:bg-[#ff0000] text-white font-bold rounded-full border-none px-10 py-2'>Painel</Button>
      </Link>
      <Link href={'/painel/servicos'}>
          <Button className='bg-[#cc0000] hover:bg-[#ff0000] text-white font-bold rounded-full border-none px-10 py-2'>Serviços</Button>
      </Link>
    </div>
  );
};

export default ClientsLinks;