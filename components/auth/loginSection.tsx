'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Inter } from 'next/font/google';
import { Poppins } from 'next/font/google';
import Image from 'next/image';

const FontInter = Inter({ subsets: ['latin'], weight: ['200'] });
const FontPoppins = Poppins({ subsets: ['latin'], weight: ['200'] });

const LoginSection: React.FC = () => {
    const { setAccessToken } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();

        const credentials = {
            email,
            password,
        };

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            const data = await response.json();
            setAccessToken(data.accessToken);
            setError('');
            router.push('/painel');
        } catch (error: any) {
            setError(error.message);
        }
    };

    useEffect(() => {
        document.body.style.overflowY = 'hidden';
        return () => {
            document.body.style.overflowY = 'auto';
        };
    }, []);

    return (
        <div className="relative w-full h-full md:h-screen">
            <div className="block md:hidden">
                <Image
                    src={'/login/cover.jpg'}
                    alt="Hero Background Mobile"
                    width={1920}
                    height={1080}
                    style={{ objectFit: 'cover' }}
                    quality={100}
                    className="z-0 w-full h-full"
                />
            </div>
            <div className="hidden md:block relative w-full h-full">
                <Image
                    src={'/login/coverDesk.jpg'}
                    alt="Hero Background Desktop"
                    fill
                    style={{ objectFit: 'cover' }}
                    quality={100}
                    className="z-0"
                />
            </div>
            <div className={`${FontInter.className} absolute inset-0 flex flex-col justify-center items-center text-white z-10`}>
                <div className="flex items-center gap-2">
                    <Image
                        src={'/base/shinerayLogo.png'}
                        alt='Logomarca Shineray'
                        width={160}
                        height={60}
                        className='w-40 md:w-60'
                    />
                    <Image
                        src={'/base/revisaoLogo.png'}
                        alt='Logomarca Revisão'
                        width={40}
                        height={40}
                        className='w-10 md:w-20'
                    />
                </div>
                <div className={`flex flex-col gap-2 ${FontPoppins.className} p-6 md:text-center md:w-1/3 md:text-xl md:gap-6`}>
                    <h2 className='font-extrabold'>
                        Olá! Seja bem-vindo à nossa plataforma.
                    </h2>
                    <p className='text-justify md:text-center'>A partir do seu login, desbloqueie acesso à um painel com informações sobre sua moto, <span className='font-extrabold'>serviços</span> e <span className='font-extrabold'>garantias</span>!</p>
                </div>
                <form onSubmit={handleLogin} className='flex flex-col w-full p-6 gap-6 items-center md:w-1/2'>
                    <div className='flex flex-col w-5/6'>
                        <label htmlFor="email" className='text-sm p-2'>E-mail:</label>
                        <input
                            type="email"
                            id="email"
                            className='bg-[#F4F4F4] rounded-full w-full p-2 text-black'
                            placeholder='E-mail'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col w-5/6'>
                        <label htmlFor="password" className='text-sm p-2'>Senha:</label>
                        <input
                            type="password"
                            id="password"
                            className='bg-[#F4F4F4] rounded-full w-full p-2 text-black'
                            placeholder='********'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className='mt-4 bg-shineray-color-dark text-white md:w-1/2 rounded-full font-extrabold p-1 w-2/3'>Entrar</button>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default LoginSection;
