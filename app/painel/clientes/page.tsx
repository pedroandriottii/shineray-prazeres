'use client';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import PersonIcon from '@mui/icons-material/Person';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputMask from 'react-input-mask';
import { useRouter } from 'next/navigation';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Client } from '@/lib/types';

const Page: React.FC = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [cpf, setCpf] = useState('');
    const [motorcycle, setMotorcycle] = useState('');
    const [chassi, setChassi] = useState('');
    const [color, setColor] = useState('');
    const [saleDate, setSaleDate] = useState('');
    const [role, setRole] = useState('CLIENT');
    const [generatedPassword, setGeneratedPassword] = useState<string | null>(null);
    const [showPasswordDialog, setShowPasswordDialog] = useState(false);
    const [showRegisterDialog, setShowRegisterDialog] = useState(false);
    const [searchCpf, setSearchCpf] = useState('');


    const router = useRouter();

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const token = Cookies.get('accessToken');
            if (!token) {
                setError('Token not found');
                setLoading(false);
                return;
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch clients');
            }

            const data = await response.json();
            setClients(data);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const generatePassword = () => {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let password = "";
        for (let i = 0; i < 8; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        return password;
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        const token = Cookies.get('accessToken');
        e.preventDefault();

        const password = generatePassword();
        setGeneratedPassword(password);

        const newClient = {
            name,
            email,
            password,
            role,
            phone,
            cpf,
            motorcycle,
            chassi,
            color,
            saleDate: new Date(saleDate).toISOString(),
        };

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newClient),
            });
            console.log(response)
            console.log(newClient)

            if (response.ok) {
                toast.success('Cliente cadastrado com sucesso!');
                setClients(prevClients => [...prevClients, newClient as Client]);
                setShowRegisterDialog(false);
                setShowPasswordDialog(true);
            } else {
                toast.error('Falha ao cadastrar cliente');
            }
        } catch (error) {
            console.error('Failed to register client', error);
            toast.error('Ocorreu um erro ao cadastrar o cliente.');
        }
    };

    const handleSearch = async () => {
        setLoading(true);
        try {
            const token = Cookies.get('accessToken');
            if (!token) {
                setError('Token not found');
                setLoading(false);
                return;
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users?cpf=${searchCpf}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch clients');
            }

            const text = await response.text();
            if (text) {
                const data = JSON.parse(text);
                setClients(data);
            } else {
                setClients([]);
            }
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleRowClick = (id: number) => {
        router.push(`/painel/clientes/${id}`);
    };

    return (
        <div className='p-4'>
            <ToastContainer />
            <Card className='bg-[#373737]'>
                <div className='flex items-center justify-between p-4'>
                    <div className='flex items-center gap-6 text-shineray-color-dark'>
                        <span className=''>
                            <PersonIcon fontSize='large' />
                        </span>

                        <h1 className='text-2xl uppercase text-center'>Clientes</h1>
                    </div>
                    <div className="flex justify-center gap-4">
                        <InputMask
                            mask="999.999.999-99"
                            value={searchCpf}
                            onChange={(e) => setSearchCpf(e.target.value)}
                            className="border rounded-md p-1"
                            placeholder='Pesquisar por CPF'
                        />
                        <Button onClick={handleSearch} className='bg-shineray-color-dark text-white hover:bg-white hover:text-shineray-color-dark'>
                            Pesquisar
                        </Button>
                    </div>
                    <div>
                        <Dialog open={showRegisterDialog} onOpenChange={setShowRegisterDialog}>
                            <DialogTrigger asChild>
                                <Button className='bg-shineray-color-dark text-white hover:bg-white hover:text-shineray-color-dark'>Cadastrar Cliente</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader className='flex items-center'>
                                    <DialogTitle>Cadastrar Cliente</DialogTitle>
                                    <DialogDescription>
                                        Insira as informações do Cliente
                                    </DialogDescription>
                                </DialogHeader>

                                <form onSubmit={handleRegister} className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Nome
                                        </Label>
                                        <Input
                                            id="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="email" className="text-right">
                                            E-mail
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="phone" className="text-right">
                                            Telefone
                                        </Label>
                                        <InputMask mask="+5\5 (99) 99999-9999" value={phone} onChange={(e) => setPhone(e.target.value)} className="col-span-3 border rounded-md p-2" placeholder='+55 (99) 99999-9999' />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="cpf" className="text-right">
                                            CPF
                                        </Label>
                                        <InputMask mask="999.999.999-99" value={cpf} onChange={(e) => setCpf(e.target.value)} className="col-span-3 border rounded-md p-2" placeholder='CPF' />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="motorcycle" className="text-right">
                                            Moto
                                        </Label>
                                        <Input
                                            id="motorcycle"
                                            type="text"
                                            value={motorcycle}
                                            onChange={(e) => setMotorcycle(e.target.value)}
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="chassi" className="text-right">
                                            Chassi
                                        </Label>
                                        <Input
                                            id="chassi"
                                            type="text"
                                            value={chassi}
                                            onChange={(e) => setChassi(e.target.value)}
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="color" className="text-right">
                                            Cor
                                        </Label>
                                        <Input
                                            id="color"
                                            type="text"
                                            value={color}
                                            onChange={(e) => setColor(e.target.value)}
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="saleDate" className="text-right">
                                            Data da Venda
                                        </Label>
                                        <Input
                                            type="date"
                                            value={saleDate}
                                            onChange={(e) => setSaleDate(e.target.value)}
                                            className="col-span-3"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="role" className="text-right">
                                            Cargo
                                        </Label>
                                        <Select onValueChange={(value) => setRole(value)} defaultValue={role}>
                                            <SelectTrigger className="col-span-3">
                                                <SelectValue placeholder="Selecione um Cargo" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Cargo</SelectLabel>
                                                    <SelectItem value="CLIENT">Cliente</SelectItem>
                                                    <SelectItem value="ADMIN">Administrador</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <DialogFooter>
                                        <Button type="submit">Cadastrar</Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
                <Table >
                    <TableHeader >
                        <TableRow>
                            <TableHead className='text-white font-bold text-xl'>Nome</TableHead>
                            <TableHead className='text-white font-bold text-xl'>E-mail</TableHead>
                            <TableHead className='text-white font-bold text-xl'>CPF</TableHead>
                            <TableHead className='text-white font-bold text-xl'>Telefone</TableHead>
                            <TableHead className='text-white font-bold text-xl'>Função</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {clients.map(item => (
                            <TableRow key={item.id} className='hover:bg-shineray-color-dark hover:rounded-2xl cursor-pointer' onClick={() => handleRowClick(item.id)}>
                                <TableCell className='text-white font-md'>{item.name}</TableCell>
                                <TableCell className='text-white font-md'>{item.email}</TableCell>
                                <TableCell className='text-white font-md'>{item.cpf}</TableCell>
                                <TableCell className='text-white font-md'>{item.phone}</TableCell>
                                <TableCell className='text-white font-md'>
                                    {item.role === 'ADMIN' ? <Badge variant='destructive'>Gestor</Badge> : <Badge variant='default'>Cliente</Badge>}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Senha Gerada</DialogTitle>
                            <DialogDescription>
                                A senha gerada para o cliente é:
                            </DialogDescription>
                        </DialogHeader>
                        <div className='p-4'>
                            <p className='text-shineray-color-dark flex text-center justify-center text-2xl text-bold'>{generatedPassword}</p>
                        </div>
                        <DialogFooter>
                            <Button onClick={() => setShowPasswordDialog(false)}>Fechar</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </Card >
        </div >
    );
};

export default Page;
