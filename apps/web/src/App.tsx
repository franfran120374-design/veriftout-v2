import { useState } from 'react'
import { HubColoc } from './components/agents/hub-coloc/HubColoc'
import { Meditrad } from './components/agents/meditrad/Meditrad'
import { LoginModal } from './components/auth/LoginModal'
import { useAuth } from './components/auth/AuthProvider'

const agents = [
  { id: 'hub-coloc', name: 'Hub Coloc', icon: '🏠', desc: 'Gestion colocation intelligente' },
  { id: 'meditrad', name: 'Meditrad', icon: '🏥', desc: 'Traduction médicale multilingue' },
  { id: 'heritage', name: 'Mon Héritage', icon: '📜', desc: 'Généalogie familiale' },
  { id: 'security', name: 'Anti-Phishing', icon: '🛡️', desc: 'Protection en ligne' },
  { id: 'assistant', name: 'Assistant', icon: '🤖', desc: 'Assistant personnel' },
  { id: 'finance', name: 'Finance', icon: '💰', desc: 'Gestion budget' },
  { id: 'health', name: 'Santé', icon: '❤️', desc: 'Suivi santé' },
  { id: 'admin', name: 'Administratif', icon: '📋', desc: 'Paperasse simplifiée' },
  { id: 'learning', name: 'Apprentissage', icon: '📚', desc: 'Formation personnalisée' },
  { id: 'housing', name: 'Logement', icon: '🔑', desc: 'Recherche logement' },
]

function App() {
  const [selected, setSelected] = useState<string | null>(null)
  const [showLogin, setShowLogin] = useState(false)
  const { user, logout } = useAuth()

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
      <header className='bg-white shadow'>
        <div className='max-w-7xl mx-auto py-6 px-4 flex justify-between items-center'>
          <div>
            <h1 className='text-4xl font-bold text-gray-900'>VerifTout V2</h1>
            <p className='text-gray-600 mt-2'>Agents IA gratuits et illimités</p>
          </div>
          <div>
            {user ? (
              <div className='flex items-center gap-4'>
                <span className='text-gray-600 text-sm'>{user.email}</span>
                <button
                  onClick={logout}
                  className='bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition'
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition'
              >
                Connexion
              </button>
            )}
          </div>
        </div>
      </header>

      <main className='max-w-7xl mx-auto py-8 px-4'>
        {!selected && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {agents.map(agent => (
              <div
                key={agent.id}
                onClick={() => setSelected(agent.id)}
                className='bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1'
              >
                <div className='text-5xl mb-3'>{agent.icon}</div>
                <h3 className='text-xl font-bold text-gray-900 mb-2'>{agent.name}</h3>
                <p className='text-gray-600 text-sm'>{agent.desc}</p>
                <div className='mt-4'>
                  <span className='text-xs text-green-600 font-semibold'>GRATUIT</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {selected === 'hub-coloc' && (
          <div>
            <button onClick={() => setSelected(null)} className='mb-4 text-blue-600 hover:text-blue-700 font-semibold'>
              ← Retour
            </button>
            <HubColoc />
          </div>
        )}

        {selected === 'meditrad' && (
          <div>
            <button onClick={() => setSelected(null)} className='mb-4 text-blue-600 hover:text-blue-700 font-semibold'>
              ← Retour
            </button>
            <Meditrad />
          </div>
        )}

        {selected && selected !== 'hub-coloc' && selected !== 'meditrad' && (
          <div className='bg-white p-6 rounded-xl shadow-lg'>
            <h2 className='text-2xl font-bold mb-4'>{agents.find(a => a.id === selected)?.name}</h2>
            <p className='text-gray-600 mb-4'>Interface en construction...</p>
            <button onClick={() => setSelected(null)} className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700'>
              Fermer
            </button>
          </div>
        )}
      </main>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
  )
}

export default App