import React from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import Link from 'next/link';
import Image from 'next/image';
import { Poppins } from 'next/font/google';

const Font = Poppins({ subsets: ['latin'], weight: ['400'] });

function Footer() {
    return (
        <div className={Font.className}>
            <div className='flex items-center justify-center p-2'>
                <Image
                    src={'/base/locationIcon.svg'}
                    width={24}
                    height={24}
                    alt='Localização'
                />
                <h1 className='text-xl text-center p-2 uppercase text-bold'>Nossa Localização</h1>
            </div>
            <div className='flex w-full items-center align-center justify-center'>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.382317925296!2d-34.9207799!3d-8.164181499999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7aae1b883ecebb1%3A0x25e1fe5373e7938!2sR.%20Ar%C3%A3o%20Lins%20de%20Andrade%2C%20950%20-%20Cajueiro%20Seco%2C%20Jaboat%C3%A3o%20dos%20Guararapes%20-%20PE%2C%2054400-200!5e0!3m2!1spt-BR!2sbr!4v1717097792080!5m2!1spt-BR!2sbr"
                    width="100%"
                    height="60%"
                    style={{ border: 0 }}
                    loading="lazy"
                ></iframe>
            </div>
            <div>
                <h2 className='text-center p-2 text-sm'>Rua Arão Lins de Andrade, 950, Prazeres - Jaboatão dos Guararapes - PE - Brasil</h2>
            </div>
            <div className='p-4 flex justify-around underline '>
                <Link href={'/'}>
                    <p>Início</p>
                </Link>
                <Link href={'/#sobre-nos'}>
                    <p>Sobre Nós</p>
                </Link>
                <Link href={'/catalogo'}>
                    <p>Catálogo</p>
                </Link>
            </div>
            <div className='flex justify-center gap-10 p-2'>
                <a href='' target='__blank' className='text-shineray-color-dark'><WhatsAppIcon fontSize='large' /></a>
                <a href='https://www.instagram.com/shinerayprazeres/' target='__blank' className='text-shineray-color-dark'><InstagramIcon fontSize='large' /></a>
            </div>
            <div className='text-center border-t-black p-2'>
                © Todos os direitos reservados
            </div>
        </div >
    );
}

export default Footer;
