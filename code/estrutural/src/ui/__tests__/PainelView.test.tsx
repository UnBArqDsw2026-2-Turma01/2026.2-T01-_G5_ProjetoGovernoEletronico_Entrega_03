// Autoria: Victor Leandro (@Afrontoso) — testes da interface do painel (commit cf84aac)
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { criarPainelSimulado } from '../../dominio/painelSimulado'
import { PainelView } from '../PainelView'

describe('PainelView', () => {
  it('exibe as seções de nível superior e as seções aninhadas', () => {
    render(<PainelView painel={criarPainelSimulado()} />)

    expect(screen.getByRole('heading', { level: 2, name: 'Minha Saúde' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'Mini apps' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'Conteúdo' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'Mais serviços' })).toBeInTheDocument()
  })

  it('exibe cartões e banners lado a lado na árvore', () => {
    render(<PainelView painel={criarPainelSimulado()} />)

    expect(screen.getByRole('link', { name: /Vacinas/ })).toBeInTheDocument()
    expect(
      screen.getByRole('complementary', { name: 'Campanha de vacinação contra a gripe' }),
    ).toBeInTheDocument()
  })

  it('mostra o total calculado por contarElementos()', () => {
    const painel = criarPainelSimulado()
    render(<PainelView painel={painel} />)

    expect(screen.getByText(String(painel.contarElementos()))).toBeInTheDocument()
  })

  it('encontra uma seção aninhada pelo id usando buscarPorId()', async () => {
    render(<PainelView painel={criarPainelSimulado()} />)

    await userEvent.type(screen.getByLabelText('buscarPorId()'), 'mais-servicos')
    await userEvent.click(screen.getByRole('button', { name: 'Buscar' }))

    expect(screen.getByRole('status')).toHaveTextContent('Encontrado: Mais serviços')
    expect(screen.getByRole('status')).toHaveTextContent('Seção (composto), com 3 elemento(s)')
  })

  it('avisa quando o id não existe', async () => {
    render(<PainelView painel={criarPainelSimulado()} />)

    await userEvent.type(screen.getByLabelText('buscarPorId()'), 'inexistente')
    await userEvent.click(screen.getByRole('button', { name: 'Buscar' }))

    expect(screen.getByRole('status')).toHaveTextContent('Nenhum elemento com o id inexistente')
  })
})
