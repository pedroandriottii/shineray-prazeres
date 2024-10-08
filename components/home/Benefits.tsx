import React from 'react';
import Image from 'next/image';
import threeStars from '@/public/home/three-stars.svg';
import gasolina from '@/public/home/gasolina.svg';
import capacete from '@/public/home/capacete.svg';
import tools from '@/public/home/tools.svg';
import { Inter, Poppins } from 'next/font/google';
import Link from 'next/link';

const FontInter = Inter({ subsets: ['latin'], weight: ['500', '700'] });
const FontPoppins = Poppins({ subsets: ['latin'], weight: ['300'] });

const Benefits: React.FC = () => {
  return (
    <section className='w-full'>
      <div className='bg-benefits bg-cover w-full bg-black h-full md:min-h-[600px] md:max-h-[600px] md:flex md:items-center md:justify-center'>
        <div className='md:justify-center md:items-center flex text-white max-w-[1700px] w-full'>
          <div className='flex md:my-auto flex-col flex-1 items-center justify-center py-10 md:py-14 gap-10 md:gap-20 '>
            <h3 className={`${FontInter.className} text-lg text-center md:text-2xl uppercase underline underline-offset-4`}><span className='font-bold'>Benefícios</span> para nossos clientes</h3>
            <div className={`${FontPoppins.className} flex px-6 lg:px-12 flex-col gap-4 md:flex-row md:w-full md:justify-between`}>
              <div className='flex md:aspect-square md:flex-1 md:max-w-[250px] md:items-center md:justify-center md:flex-col md:text-center md:px-4 md:py-4 text-lg gap-2 md:gap-4 items-center border-2 px-3 py-3 rounded-lg bg-black/60'>
                <Image src={threeStars} alt='Três estrelas' width={120} height={120} className='w-[45px] sm:w-[80px] md:w-[100px]' />
                <p>Garantia de 1 ano!</p>
              </div>
              <div className='flex md:aspect-square md:flex-1 md:max-w-[250px] md:items-center md:justify-center md:flex-col md:text-center md:px-4 md:py-4 text-lg gap-2 md:gap-4 items-center border-2 px-3 py-3 rounded-lg bg-black/60'>
                <Image src={tools} alt='Três estrelas' width={120} height={120} className='w-[35px] sm:w-[60px] md:w-[80px]' />
                <p>As duas primeiras revisões 100% gratuitas!</p>
              </div>
              <div className='flex md:aspect-square md:flex-1 md:max-w-[250px] md:items-center md:justify-center md:flex-col md:text-center md:px-4 md:py-4 text-lg gap-2 md:gap-4 items-center border-2 px-3 py-3 rounded-lg bg-black/60'>
                <Image src={capacete} alt='Três estrelas' width={120} height={120} className='w-[35px] sm:w-[60px] md:w-[80px]' />
                <p>Ganhe um Capacete!</p>
              </div>
              <div className='flex md:aspect-square md:flex-1 md:max-w-[250px] md:items-center md:justify-center md:flex-col md:text-center md:px-4 md:py-4 text-lg gap-2 md:gap-4 items-center border-2 px-3 py-3 rounded-lg bg-black/60'>
                <Image src={gasolina} alt='Três estrelas' width={120} height={120} className='w-[35px] sm:w-[60px] md:w-[80px]' />
                <p>Saia com o tanque cheio!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full flex pt-6 justify-center'>
        <a href="#">
          <Link href={'/catalogo'}>
            <button className='font-bold flex justify-center bg-shineray-color-dark text-white p-2 rounded-full w-80 md:mt-4'>
              Veja os modelos disponíveis!
            </button>
          </Link>

        </a>
      </div>
    </section>
  );
};

export default Benefits;