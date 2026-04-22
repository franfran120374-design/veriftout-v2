import { useState } from 'react';
import { useAuth } from './AuthProvider';

export function LoginModal({ onClose }: { onClose: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password);
      }
      onClose();
    } catch (err: any) {
      // Traduction erreurs Firebase
      const errorMessages: Record<string, string> = {
        'auth/email-already-in-use': 'Cet email est déjà utilisé',
        'auth/invalid-email': 'Email invalide',
        'auth/weak-password': 'Mot de passe trop faible (min 6 caractères)',
        'auth/user-not-found': 'Utilisateur introuvable',
        'auth/wrong-password': 'Mot de passe incorrect',
        'auth/configuration-not-found': 'Email/Password pas activé dans Firebase Console'
      };
      setError(errorMessages[err.code] || err.message);
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white p-8 rounded-xl shadow-2xl max-w-md w-full'>
        <h2 className='text-2xl font-bold mb-6'>
          {isLogin ? 'Connexion' : 'Inscription'}
        </h2>

        {error && (
          <div className='bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm'>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-4'>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full px-4 py-2 border rounded-lg'
            required
          />
          
          <input
            type='password'
            placeholder='Mot de passe (min 6 caractères)'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full px-4 py-2 border rounded-lg'
            required
            minLength={6}
          />

          <button
            type='submit'
            className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700'
          >
            {isLogin ? 'Se connecter' : "S'inscrire"}
          </button>
        </form>

        <button
          onClick={() => setIsLogin(!isLogin)}
          className='w-full mt-4 text-blue-600 hover:text-blue-700'
        >
          {isLogin ? 'Pas encore de compte ? Créer un compte' : 'Déjà un compte ? Se connecter'}
        </button>

        <button
          onClick={onClose}
          className='w-full mt-2 text-gray-500 hover:text-gray-700'
        >
          Fermer
        </button>
      </div>
    </div>
  );
}
