cd C:\Users\Admin\Documents\veriftout-v2\apps\web\src

@"
import { useState } from 'react'
import { HubColoc } from './components/agents/hub-coloc/HubColoc'
import { Meditrad } from './components/agents/meditrad/Meditrad'
import { LoginModal } from './components/auth/LoginModal'
import { useAuth } from './components/auth/AuthProvider'

const agents = [
  { id: 'hub-coloc', name: 'Hub Coloc', icon: '🏠', desc: 'Gestion colocation intelligente' },
  { id: 'meditrad', name: 'Meditrad', icon: '🏥', desc: 'Traduction médicale multilingue' },
  { id: 'heritage', name: 'Mon Héritage', icon: '📜', desc: 'Généalogie familiale' },
  { id: 'security', name: 'A