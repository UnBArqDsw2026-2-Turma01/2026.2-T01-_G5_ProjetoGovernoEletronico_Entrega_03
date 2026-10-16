// Autoria: Victor Leandro (@Afrontoso) — testes da interface do painel (commit cf84aac)
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { criarPainelSimulado } from '../../dominio/painelSimulado'
import { PainelView } from '../PainelView'

describe('PainelView', () => {
  it('exibe as seções de nível superior e as seções aninhadas', () => {
    render(<PainelView painel={criarPainelSimulado()} />)

    expect(screen.getByRole('heading', { level: 2, name: 'Minha Saúde' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'Mini apps' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'Mais serviços' })).toBeInTheDocument()
  })

  it('exibe os cartões de atalho da árvore', () => {
    render(<PainelView painel={criarPainelSimulado()} />)

    expect(screen.getByRole('link', { name: /Vacinas/ })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Hemovida/ })).toBeInTheDocument()
  })

  it('mostra o total calculado por contarElementos()', () => {
    const painel = criarPainelSimulado()
    render(<PainelView painel={painel} />)

    expect(screen.getByText(String(painel.contarElementos()))).toBeInTheDocument()
  })
})
