'use client';

import React, { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [hasDriverLicense, setHasDriverLicense] = useState(false);
  const [method, setMethod] = useState('COM_ENTRADA');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const newItem = {
      name,
      email,
      phone,
      cpf,
      birthDate: new Date(birthDate).toISOString(),
      hasDriverLicense,
      method,
      IsConcluded: false,
    };

    try {
      console.log(newItem)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/financing`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        alert('Financing item added successfully!');
      } else {
        alert('Failed to add financing item.');
      }
    } catch (error) {
      console.error('Failed to add financing item', error);
      alert('An error occurred while adding the financing item.');
    }
  };

  return (
    <div>
      <h1 className="text-center font-bold text-lg">Add Financing Item</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 p-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded-md p-2"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded-md p-2"
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border rounded-md p-2"
          required
        />
        <input
          type="text"
          placeholder="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          className="border rounded-md p-2"
          required
        />
        <input
          type="date"
          placeholder="Birth Date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="border rounded-md p-2"
          required
        />
        <label>
          <input
            type="checkbox"
            checked={hasDriverLicense}
            onChange={(e) => setHasDriverLicense(e.target.checked)}
          />
          Has Driver License
        </label>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="border rounded-md p-2"
        >
          <option value="COM_ENTRADA">Com Entrada</option>
          <option value="SEM_ENTRADA">Sem Entrada</option>
          <option value="A_VISTA">A Vista</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white rounded-md p-2">Submit</button>
      </form>
    </div>
  );
}
