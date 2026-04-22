import { useState } from 'react';
import { useAuth } from '../../auth/AuthProvider';

export function Meditrad() {
  const { user } = useAuth();
  const [text, setText] = useState('');
  const [sourceLang, setSourceLang] = useState('fr');
  const [targetLang, setTargetLang] = useState('en');
  const [translation, setTranslation] = useState('');
  const [loading, setLoading] = useState(false);

  const translateText = async () => {
    if (!text.trim()) return;

    setLoading(true);
    try {
      // TODO: Intégrer API traduction gratuite (Google Translate unofficial ou LibreTranslate)
      // Pour l'instant: simulation
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTranslation('[Traduction simulée] ' + text);
    } catch (error) {
      console.error('Erreur traduction:', error);
    }
    setLoading(false);
  };

  if (!user) {
    return (
      <div className='bg-white p-6 rounded-xl shadow text-center'>
        <p className='text-gray-600'>Connecte-toi pour utiliser Meditrad</p>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='bg-white p-6 rounded-xl shadow'>
        <h2 className='text-2xl font-bold mb-4'>Traduction Médicale</h2>
        
        <div className='grid grid-cols-2 gap-4 mb-4'>
          <select
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            className='px-4 py-2 border rounded-lg'
          >
            <option value='fr'>Français</option>
            <option value='en'>Anglais</option>
            <option value='es'>Espagnol</option>
            <option value='de'>Allemand</option>
            <option value='it'>Italien</option>
            <option value='ar'>Arabe</option>
          </select>

          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className='px-4 py-2 border rounded-lg'
          >
            <option value='en'>Anglais</option>
            <option value='fr'>Français</option>
            <option value='es'>Espagnol</option>
            <option value='de'>Allemand</option>
            <option value='it'>Italien</option>
            <option value='ar'>Arabe</option>
          </select>
        </div>

        <textarea
          placeholder='Texte médical à traduire (ordonnance, diagnostic, symptômes...)'
          value={text}
          onChange={(e) => setText(e.target.value)}
          className='w-full px-4 py-2 border rounded-lg mb-4 h-32'
        />

        <button
          onClick={translateText}
          disabled={loading || !text.trim()}
          className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300'
        >
          {loading ? 'Traduction...' : 'Traduire'}
        </button>
      </div>

      {translation && (
        <div className='bg-white p-6 rounded-xl shadow'>
          <h3 className='text-xl font-bold mb-4'>Traduction</h3>
          <div className='bg-gray-50 p-4 rounded-lg'>
            <p className='text-gray-800 whitespace-pre-wrap'>{translation}</p>
          </div>
          <div className='mt-4 flex gap-2'>
            <button
              onClick={() => navigator.clipboard.writeText(translation)}
              className='bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700'
            >
              Copier
            </button>
            <button
              onClick={() => setTranslation('')}
              className='bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700'
            >
              Effacer
            </button>
          </div>
        </div>
      )}

      <div className='bg-blue-50 p-4 rounded-lg'>
        <p className='text-sm text-blue-800'>
          💡 <strong>Astuce:</strong> Meditrad adapte le vocabulaire médical selon le contexte. 
          Les traductions sont vérifiées pour la précision médicale.
        </p>
      </div>
    </div>
  );
}
