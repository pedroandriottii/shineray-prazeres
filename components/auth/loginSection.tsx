'use client';
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

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
            console.log('Login successful:', data);
            router.push('/painel')
        } catch (error: any) {
            console.error('Error:', error);
            setError(error.message);
        }
    };

    return (
        <div className='flex flex-col items-center p-6 gap-2'>
            <h1 className='uppercase text-shineray-color-dark text-xl'>Login</h1>
            <p className='text-center text-slate-400'>Faça o login e acompanhe os seus serviços aqui na Revisão Motos!</p>
            <form onSubmit={handleLogin}>
                <div className='flex gap-4 flex-col'>
                    <div>
                        <Label htmlFor="email">Email:</Label>
                        <Input
                            type="email"
                            id="email"
                            value={email}
                            placeholder='cliente@email.com'
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="password">Senha:</Label>
                        <Input
                            type="password"
                            id="password"
                            value={password}
                            placeholder='********'
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <Button type="submit" className='bg-shineray-color-dark flex w-full hover:bg-red-500'>Login</Button>
                </div>

            </form>
        </div>
    );
};

export default LoginSection;
