// Autoria: Victor Leandro (@Afrontoso) — App passa a exibir o painel do Composite (commit 4e527b0)
import { useMemo } from 'react'
import { criarPainelSimulado } from './dominio/painelSimulado'
import { PainelView } from './ui/PainelView'
import './ui/painel.css'

function App() {
  const painel = useMemo(() => criarPainelSimulado(), [])

  return <PainelView painel={painel} />
}

export default App
