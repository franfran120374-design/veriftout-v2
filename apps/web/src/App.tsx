import { useState } from 'react'

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-4xl font-bold text-gray-900">VerifTout V2</h1>
          <p className="text-gray-600 mt-2">Agents IA gratuits et illimités</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map(agent => (
            <div
              key={agent.id}
              onClick={() => setSelected(agent.id)}
              className={`bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1 ${
                selected === agent.id ? 'ring-4 ring-blue-500' : ''
              }`}
            >
              <div className="text-5xl mb-3">{agent.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{agent.name}</h3>
              <p className="text-gray-600 text-sm">{agent.desc}</p>
              <div className="mt-4">
                <span className="text-xs text-green-600 font-semibold">GRATUIT</span>
              </div>
            </div>
          ))}
        </div>

        {selected && (
          <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">
              {agents.find(a => a.id === selected)?.name}
            </h2>
            <p className="text-gray-600 mb-4">Interface agent en construction...</p>
            <button
              onClick={() => setSelected(null)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Fermer
            </button>
          </div>
        )}
      </main>
    </div>
  )
}

export default App