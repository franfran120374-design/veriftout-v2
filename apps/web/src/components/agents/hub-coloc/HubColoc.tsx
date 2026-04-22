import { useState, useEffect } from 'react';
import { db } from '../../../lib/firebase';
import { collection, addDoc, query, where, onSnapshot, Timestamp } from 'firebase/firestore';
import { useAuth } from '../../auth/AuthProvider';

interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  paidBy: string;
  date: any;
}

export function HubColoc() {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('groceries');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'expenses'),
      where('paidBy', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const expensesList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Expense[];
      setExpenses(expensesList);
    });

    return unsubscribe;
  }, [user]);

  const addExpense = async () => {
    if (!user || !amount || !description) return;

    setLoading(true);
    try {
      await addDoc(collection(db, 'expenses'), {
        amount: parseFloat(amount),
        description,
        category,
        paidBy: user.uid,
        date: Timestamp.now(),
      });

      setAmount('');
      setDescription('');
      setCategory('groceries');
    } catch (error) {
      console.error('Erreur ajout:', error);
    }
    setLoading(false);
  };

  if (!user) {
    return (
      <div className='bg-white p-6 rounded-xl shadow text-center'>
        <p className='text-gray-600'>Connecte-toi pour utiliser Hub Coloc</p>
      </div>
    );
  }

  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className='space-y-6'>
      <div className='bg-white p-6 rounded-xl shadow'>
        <h2 className='text-2xl font-bold mb-4'>Nouvelle Dépense</h2>
        
        <div className='space-y-4'>
          <input
            type='number'
            placeholder='Montant (€)'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className='w-full px-4 py-2 border rounded-lg'
            step='0.01'
          />
          
          <input
            type='text'
            placeholder='Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='w-full px-4 py-2 border rounded-lg'
          />
          
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='w-full px-4 py-2 border rounded-lg'
          >
            <option value='groceries'>Courses</option>
            <option value='utilities'>Factures</option>
            <option value='rent'>Loyer</option>
            <option value='internet'>Internet</option>
            <option value='cleaning'>Ménage</option>
            <option value='other'>Autre</option>
          </select>
          
          <button
            onClick={addExpense}
            disabled={loading || !amount || !description}
            className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300'
          >
            {loading ? 'Ajout...' : 'Ajouter'}
          </button>
        </div>
      </div>

      <div className='bg-white p-6 rounded-xl shadow'>
        <div className='flex justify-between items-center mb-4'>
          <h3 className='text-xl font-bold'>Mes Dépenses</h3>
          <div className='text-2xl font-bold text-blue-600'>{total.toFixed(2)} €</div>
        </div>

        {expenses.length === 0 ? (
          <div className='text-gray-500 text-center py-4'>Aucune dépense</div>
        ) : (
          <div className='space-y-3'>
            {expenses.map(expense => (
              <div key={expense.id} className='flex justify-between items-center p-4 bg-gray-50 rounded-lg'>
                <div>
                  <div className='font-semibold'>{expense.description}</div>
                  <div className='text-sm text-gray-600'>{expense.category}</div>
                </div>
                <div className='text-lg font-bold'>{expense.amount.toFixed(2)} €</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
