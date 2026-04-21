import { useState } from 'react';
import { db, auth } from '../../../lib/firebase';
import { collection, addDoc, query, where, onSnapshot } from 'firebase/firestore';
import type { Expense } from '../../../types/hubColoc';

export function HubColoc() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('groceries');

  const addExpense = async () => {
    if (!auth.currentUser || !amount || !description) return;

    const expense = {
      colocId: 'demo-coloc', // TODO: real coloc ID
      amount: parseFloat(amount),
      description,
      category,
      paidBy: auth.currentUser.uid,
      splitBetween: [auth.currentUser.uid], // TODO: real members
      date: new Date(),
    };

    await addDoc(collection(db, 'expenses'), expense);
    
    setAmount('');
    setDescription('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">Nouvelle Dépense</h2>
        
        <div className="space-y-4">
          <input
            type="number"
            placeholder="Montant (€)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
          
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
          
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="groceries">Courses</option>
            <option value="utilities">Factures</option>
            <option value="rent">Loyer</option>
            <option value="internet">Internet</option>
            <option value="cleaning">Ménage</option>
            <option value="other">Autre</option>
          </select>
          
          <button
            onClick={addExpense}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Ajouter
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-bold mb-4">Dépenses Récentes</h3>
        <div className="text-gray-500">Connecte-toi pour voir tes dépenses</div>
      </div>
    </div>
  );
}