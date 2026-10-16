import { useMemo } from 'react'
import { criarPainelSimulado } from './dominio/painelSimulado'
import { PainelView } from './ui/PainelView'
import './ui/painel.css'

function App() {
  const painel = useMemo(() => criarPainelSimulado(), [])

  return <PainelView painel={painel} />
}

export default App
