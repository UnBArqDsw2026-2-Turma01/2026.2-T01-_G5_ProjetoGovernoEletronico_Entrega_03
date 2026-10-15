# Padrão de Testes - SubEquipe 1 (GoF Criacional)

Este documento define o padrão de testes que a **SubEquipe 1** deve seguir durante a Entrega 3, no mini-projeto do padrão **GoF Criacional (Factory Method)**, localizado em `code/criacional/`. O objetivo é que todas as versões do código (V1 a V4) sejam testadas da mesma forma, para que os testes **evoluam junto com o código**, deixando claro o que cada versão acrescentou e ajudando a comprovar que o padrão foi aplicado corretamente.

> **Importante:** conforme definido na [ata de 14/10](/Atas/Entrega3/AtasSub1/Ata-14-10.md), os testes fazem parte do escopo do código. Este documento é a iniciativa extra que **padroniza** como eles devem ser escritos, organizados e registrados.

---

## 1. Ferramentas

O projeto `code/criacional/` já está configurado com as ferramentas abaixo (ver `package.json` e `vite.config.ts`). **Não é necessário instalar nada além de `npm install`.**

| Ferramenta | Uso |
| --- | --- |
| [Vitest](https://vitest.dev/) | Executor de testes, asserções (`expect`) e mocks (`vi.fn`) |
| [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) | Renderização e consulta de componentes React |
| [@testing-library/user-event](https://testing-library.com/docs/user-event/intro) | Simulação de interações reais do usuário (clique, digitação) |
| [@testing-library/jest-dom](https://github.com/testing-library/jest-dom) | Matchers para o DOM (`toBeInTheDocument`, `toHaveTextContent`...) |
| jsdom | Ambiente de navegador simulado (configurado em `vite.config.ts`) |

O arquivo `src/setupTests.ts` já importa os matchers do jest-dom e executa o `cleanup()` após cada teste.

---

## 2. Tipos de Teste

Seguimos a ideia da **pirâmide de testes**: muitos testes unitários (rápidos e focados no padrão) e poucos testes de interface (que validam a integração com o React).

| Tipo | O que testa | Onde fica | Mínimo por versão |
| --- | --- | --- | --- |
| **Unitário do padrão** | Participantes do Factory Method (Creator, ConcreteCreator, Product, ConcreteProduct) sem React | `src/padrao/__tests__/` | Todos os ConcreteCreators e ConcreteProducts |
| **Unitário do domínio** | Regras e dados simulados do Meu SUS Digital (autenticação, consentimento LGPD, histórico clínico) | `src/dominio/__tests__/` | Regras com lógica (validações, decisões) |
| **Interface** | Componentes React acionando o núcleo do padrão | `src/ui/__tests__/` | Pelo menos 1 teste de fluxo do usuário |

> O núcleo do padrão (`src/padrao/`) **não deve depender de React**. Se for necessário renderizar algo para testar uma classe do padrão, é sinal de que a separação entre núcleo e interface precisa ser revista.

---

## 3. Organização e Nomenclatura

### 3.1. Estrutura de pastas

```
code/criacional/src/
├── padrao/
│   ├── CriadorDeAutenticacao.ts
│   ├── ...
│   └── __tests__/
│       └── CriadorDeAutenticacao.test.ts
├── dominio/
│   ├── ...
│   └── __tests__/
├── ui/
│   ├── TelaDeAcesso.tsx
│   └── __tests__/
│       └── TelaDeAcesso.test.tsx
└── setupTests.ts
```

### 3.2. Regras de nomenclatura

| Item | Regra | Exemplo |
| --- | --- | --- |
| Arquivo de teste de classe/função | `<NomeDoArquivo>.test.ts` | `CriadorDeAutenticacao.test.ts` |
| Arquivo de teste de componente | `<NomeDoComponente>.test.tsx` | `TelaDeAcesso.test.tsx` |
| Bloco `describe` | Nome da classe, componente ou cenário testado | `describe('CriadorGovBr', ...)` |
| Caso `it` | Frase em português no formato **"deve ... quando ..."** | `it('deve criar um AutenticadorGovBr quando o método for gov.br', ...)` |
| Dados de teste reutilizáveis | Pasta `__tests__/fixtures/` | `fixtures/pacientes.ts` |

- Os testes devem ser escritos **em português**, assim como os nomes do domínio.
- Um arquivo de teste por arquivo de código testado.
- Cada `it` deve verificar **um único comportamento**.

---

## 4. Estrutura de um Teste (AAA)

Todo teste deve seguir o padrão **Arrange – Act – Assert** (Preparar – Agir – Verificar), com as três etapas separadas por uma linha em branco:

```ts
it('deve ... quando ...', () => {
  // Arrange: prepara os objetos e dados necessários
  const criador = new CriadorGovBr()

  // Act: executa o comportamento testado
  const autenticador = criador.criarAutenticador()

  // Assert: verifica o resultado
  expect(autenticador).toBeInstanceOf(AutenticadorGovBr)
})
```

Boas práticas:
- Testes **independentes**: um teste não pode depender do resultado ou da ordem de outro.
- **Sem chamadas a APIs reais**: usar apenas os dados simulados do domínio ou mocks (`vi.fn()`).
- Evitar lógica (`if`, `for`) dentro dos testes; prefira `it.each` para vários cenários.
- Não usar `it.skip` / `it.only` em código que vai para o PR.

---

## 5. O que Testar no Factory Method

Os testes do núcleo devem comprovar que o padrão foi **realmente aplicado**, e não apenas que o código funciona. Para isso, cada versão deve cobrir os seguintes critérios:

| # | Critério | O que verificar |
| :--: | --- | --- |
| C1 | **Criação correta** | Cada ConcreteCreator retorna o ConcreteProduct esperado |
| C2 | **Contrato do produto** | Todo ConcreteProduct respeita a interface Product (mesmos métodos, mesmo tipo de retorno) |
| C3 | **Operação do Creator** | A operação de alto nível do Creator usa o produto criado pelo factory method, sem conhecer a classe concreta |
| C4 | **Cliente desacoplado** | O código cliente funciona com qualquer ConcreteCreator recebido pela abstração |
| C5 | **Extensibilidade (aberto/fechado)** | Um novo ConcreteCreator pode ser adicionado sem alterar o cliente (testável com um criador "falso" criado no próprio teste) |
| C6 | **Casos inválidos** | Entradas inválidas (ex.: método de autenticação inexistente, consentimento negado) geram o erro ou resultado esperado |

### 5.1. Exemplo de testes unitários do padrão

> Os nomes abaixo são **ilustrativos** e servem apenas para mostrar o formato. Cada versão deve usar as classes definidas na modelagem do GoF Criacional.

```ts
// src/padrao/__tests__/CriadorDeAutenticacao.test.ts
import { describe, expect, it } from 'vitest'
import {
  CriadorDeAutenticacao,
  CriadorGovBr,
  CriadorCpfSenha,
  AutenticadorGovBr,
  AutenticadorCpfSenha,
  type Autenticador,
} from '../CriadorDeAutenticacao'

describe('CriadorDeAutenticacao (Factory Method)', () => {
  // C1 - Criação correta
  it.each([
    { criador: new CriadorGovBr(), esperado: AutenticadorGovBr },
    { criador: new CriadorCpfSenha(), esperado: AutenticadorCpfSenha },
  ])('deve criar $esperado.name quando usar $criador.constructor.name', ({ criador, esperado }) => {
    const autenticador = criador.criarAutenticador()

    expect(autenticador).toBeInstanceOf(esperado)
  })

  // C3 - Operação do Creator usa o produto criado
  it('deve autenticar o paciente quando as credenciais forem válidas', () => {
    const criador = new CriadorCpfSenha()

    const resultado = criador.autenticar({ cpf: '12345678909', senha: 'senha-valida' })

    expect(resultado.sucesso).toBe(true)
  })

  // C5 - Extensibilidade: novo criador sem alterar o cliente
  it('deve aceitar um novo tipo de criador quando ele estender a abstração', () => {
    class AutenticadorFalso implements Autenticador {
      autenticar() {
        return { sucesso: true }
      }
    }
    class CriadorFalso extends CriadorDeAutenticacao {
      criarAutenticador(): Autenticador {
        return new AutenticadorFalso()
      }
    }

    const resultado = new CriadorFalso().autenticar({ cpf: '', senha: '' })

    expect(resultado.sucesso).toBe(true)
  })

  // C6 - Caso inválido
  it('deve recusar a autenticação quando a senha for inválida', () => {
    const criador = new CriadorCpfSenha()

    const resultado = criador.autenticar({ cpf: '12345678909', senha: 'errada' })

    expect(resultado.sucesso).toBe(false)
  })
})
```

### 5.2. Exemplo de teste de interface

Nos testes de interface, consulte os elementos **como o usuário os enxerga** (papel, rótulo, texto) e evite testar detalhes de implementação (estado interno, classes CSS, nomes de funções).

Prioridade de consultas da Testing Library:
1. `getByRole` (ex.: botão, campo, título)
2. `getByLabelText`
3. `getByText`
4. `getByTestId` (somente quando não houver alternativa)

```tsx
// src/ui/__tests__/TelaDeAcesso.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { TelaDeAcesso } from '../TelaDeAcesso'

describe('TelaDeAcesso', () => {
  it('deve exibir mensagem de boas-vindas quando o paciente entrar com gov.br', async () => {
    const usuario = userEvent.setup()
    render(<TelaDeAcesso />)

    await usuario.click(screen.getByRole('button', { name: /entrar com gov\.br/i }))

    expect(await screen.findByText(/bem-vindo/i)).toBeInTheDocument()
  })
})
```

### 5.3. Uso de mocks

Use `vi.fn()` para verificar **interações** entre objetos (por exemplo, garantir que o Creator chamou o produto), sem depender de implementações reais:

```ts
const autenticar = vi.fn().mockReturnValue({ sucesso: true })
// ...
expect(autenticar).toHaveBeenCalledOnce()
```

---

## 6. Evolução dos Testes por Versão

Como cada integrante faz uma versão completa em sequência (modelagem, código e execução), os testes devem acompanhar essa evolução:

1. **Antes de começar**, rode `npm test` e confirme que todos os testes da versão anterior passam.
2. **Mantenha os testes anteriores**. Só altere ou remova um teste se o comportamento mudou de propósito na sua versão, e justifique isso no PR.
3. **Acrescente testes** para tudo que a sua versão adicionou ou alterou.
4. Ao terminar, **todos os testes devem passar** antes de passar a vez ao próximo integrante.

| Versão | Responsável | Foco mínimo dos testes |
| --- | --- | --- |
| V1 | Artur | Estrutura inicial: C1 e C2 para os primeiros criadores/produtos |
| V2 | Giovani | Testes da V1 + C3, C6 e testes do domínio |
| V3 | João Leles | Testes anteriores + C4, C5 e primeiro teste de interface |
| V4 | Nicole | Revisão final: todos os critérios (C1 a C6) e testes de interface do fluxo completo |

---

## 7. Como Executar

```bash
cd code/criacional
npm install
npm test            # executa todos os testes uma vez (vitest run)
npx vitest          # modo observação, executa novamente a cada alteração
npx vitest run src/padrao   # executa apenas os testes de uma pasta
```

Também é possível executar a partir da pasta `code/`:

```bash
cd code
npm run test:criacional
```

---

## 8. Registro dos Resultados

Os resultados dos testes devem ser documentados na página [Código](/3-PadroesDeProjetos/Relatórios/3.1.1.SubEquipe_01/Codigo.md) da SubEquipe 1. **Não registre testes como executados sem colar o resultado real** da execução.

Modelo de registro por versão:

```markdown
### Testes - Versão X

| Arquivo de teste | Critérios cobertos | Qtd. de testes | Resultado |
| --- | --- | --- | --- |
| `src/padrao/__tests__/CriadorDeAutenticacao.test.ts` | C1, C2, C3 | 4 | ✅ Passou |
| `src/ui/__tests__/TelaDeAcesso.test.tsx` | Interface | 1 | ✅ Passou |

Saída do `npm test`:
(colar aqui a saída do terminal ou um print)

Commit/PR: [hash](link)
```

---

## 9. Commits e Pull Requests

- Commits de testes seguem o [Padrão de Commits](/Projeto/ExtrasEntrega1/PadraoDeCommits.md) com o tipo `test` e escopo `criacional`:
  - `test(criacional): adicionar testes do CriadorGovBr`
  - `test(criacional): cobrir caso de consentimento negado`
- Quando a funcionalidade e seus testes forem feitos juntos, é aceitável um único commit `feat(criacional): ...`, desde que os testes estejam incluídos.

### Checklist antes de abrir o PR

- [ ] `npm test` executado e **todos os testes passando**
- [ ] Testes da versão anterior mantidos (ou alteração justificada no PR)
- [ ] Novos testes seguem o padrão AAA e a nomenclatura "deve ... quando ..."
- [ ] Critérios mínimos da versão (seção 6) cobertos
- [ ] Nenhum `it.only` / `it.skip` esquecido
- [ ] Nenhuma chamada a API real nos testes
- [ ] Resultados registrados na página [Código](/3-PadroesDeProjetos/Relatórios/3.1.1.SubEquipe_01/Codigo.md)

---

## 10. Referências

- GAMMA, E.; HELM, R.; JOHNSON, R.; VLISSIDES, J. **Padrões de Projeto: Soluções Reutilizáveis de Software Orientado a Objetos**. Porto Alegre: Bookman, 2000.
- FOWLER, M. **Test Pyramid**. 2012. Disponível em: <https://martinfowler.com/bliki/TestPyramid.html>.
- VITEST. **Getting Started**. Disponível em: <https://vitest.dev/guide/>.
- TESTING LIBRARY. **Guiding Principles** e **About Queries**. Disponível em: <https://testing-library.com/docs/queries/about>.
- REFACTORING GURU. **Factory Method**. Disponível em: <https://refactoring.guru/pt-br/design-patterns/factory-method>.

---

## Histórico de Versionamento

| Nome do Membro | Contribuição | Data | Commit |
| :--- | :--- | :--- | :--- |
| [Giovani Coelho](https://github.com/Gotc2607) | Criação do documento de padrão de testes | 15/10/2026 | |
