import { Client } from '@/lib/types';
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface ChangePasswordProps {
  clientId: string | undefined;
  isOpen: boolean;
  onClose: () => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ clientId, isOpen, onClose }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (clientId) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${clientId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ password }),
        });

        if (response.ok) {
          onClose();
        } else {
          setError('Erro ao atualizar a senha');
        }
      } catch (err) {
        setError('Erro ao atualizar a senha');
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-[360px]'>
        <DialogHeader>
          <DialogTitle>Digite sua nova senha:</DialogTitle>
          <DialogDescription>
            Esta ação irá tornar sua segurança ainda maior.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            <div className="flex flex-col items-start gap-4">
              <Label htmlFor="password" className="text-right">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                className="col-span-3"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-start gap-4">
              <Label htmlFor="confirmPassword" className="text-right">
                Repita sua senha
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Digite sua senha"
                className="col-span-3"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </div>
          <DialogFooter>
            <Button type="submit" className='mt-6 bg-[#CC0000] w-full hover:bg-[#f10000] hover:text-white text-white font-semibold '>Alterar senha</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePassword;
