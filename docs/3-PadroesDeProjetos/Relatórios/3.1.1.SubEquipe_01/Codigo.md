# Código | GoF Criacional (Factory Method)

## 1. Visão Geral da Arquitetura do Código

O mini-projeto independente da SubEquipe 01 está localizado no diretório [`code/criacional/`](file:///code/criacional/), completamente desacoplado da pasta de documentação `docs/`. O projeto foi construído em **React com Vite e TypeScript**, garantindo tipagem estática rigorosa e separação entre o padrão de projeto arquitetural e a camada de visualização:

- [`code/criacional/src/padrao/`](file:///code/criacional/src/padrao/): **Núcleo GoF Factory Method em TypeScript puro** (sem dependências de framework ou bibliotecas de UI).
- [`code/criacional/src/dominio/`](file:///code/criacional/src/dominio/): Modelos de domínio e dados simulados (mocks) que emulam as estruturas de dados oficiais do Ministério da Saúde e da RNDS (Rede Nacional de Dados em Saúde).
- [`code/criacional/src/ui/`](file:///code/criacional/src/ui/): Componentes visuais em React com estilização CSS fiel ao design system oficial do **Meu SUS Digital** e do **Gov.br**.
- [`code/criacional/src/padrao/__tests__/`](file:///code/criacional/src/padrao/__tests__/): Suíte de testes unitários automatizados com **Vitest**.

### 1.1. Princípios GRASP Aplicados no Código

A distribuição de responsabilidades nas classes foi pautada diretamente pelos padrões **GRASP** (*General Responsibility Assignment Software Patterns*):
- **Creator:** A responsabilidade de instanciar `CartaoVacina` foi delegada exclusivamente ao criador concreto `BuscadorDeVacinas`, pois este possui o contexto dos dados brutos recebidos da RNDS para validar e compor o registro clínico.
- **Low Coupling (Baixo Acoplamento) & High Cohesion (Alta Coesão):** O núcleo em `src/padrao/` é estritamente isolado de dependências visuais, bibliotecas de terceiros ou frameworks. A camada de UI (`App.tsx`) interage somente com o contrato abstrato de alto nível, permitindo que novas categorias clínicas sejam plugadas sem modificar o cliente.
- **Protected Variations (Variações Protegidas):** A interface `RegistroClinico` atua como uma barreira protetora para o sistema contra divergências e formatos variantes de dados providos por serviços de saúde.

---

## 2. Planejamento das Versões de Código

Para atender ao critério de divisão equilibrada e trabalho individual avaliável, o desenvolvimento do código foi fatiado em 4 versões incrementais:

| Versão | Responsável | Escopo e Fatia do Domínio Clínico | Status |
| :---: | :---: | :--- | :---: |
| **V1** | [Artur Galdino](https://github.com/ArturFGaldino) | **Fatia de Vacinas**: Criação do núcleo abstrato do Factory Method (`RegistroClinico`, `BuscadorDeHistorico`), produto concreto `CartaoVacina`, criador concreto `BuscadorDeVacinas`, mocks FHIR e interface fiel da Carteira de Vacinação ([PR #19](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/pull/19)). | **Concluído** |
| **V2** | [Giovani Coelho](https://github.com/Gotc2607) | **Fatia de Exames**: Implementação do produto concreto `ResultadoExame`, do criador concreto `BuscadorDeExames`, mocks de exames laboratoriais e testes unitários. | *Planejado* |
| **V3** | [João Leles](https://github.com/joaoleless) | **Fatia de Medicamentos**: Implementação do produto concreto `ReceitaMedicamento`, do criador concreto `BuscadorDeMedicamentos`, mocks da Farmácia Popular e testes unitários. | *Planejado* |
| **V4** | [Nicole Jovita](https://github.com/nicolejovita) | **Núcleo Unificador / Seletor Dinâmico**: Implementação do `SeletorDeHistorico` para despacho dinâmico de criadores, consolidação da suíte de testes integrados e fechamento da interface unificada. | *Planejado* |

---

> **Aviso sobre as imagens do código:** Todas as figuras desta seção apresentam **apenas trechos ilustrativos e recortes parciais** do código-fonte para destacar a estrutura do padrão GoF Factory Method. O código completo, tipado e executável está disponível diretamente nos arquivos do diretório [`code/criacional/`](file:///code/criacional/).

---

## 3. Versão 1 — Fatia de Vacinas (Artur Galdino)

### 3.1. Núcleo Abstrato do Padrão GoF

A Versão 1 estabeleceu os contratos fundamentais da arquitetura do Factory Method:
- **`RegistroClinico` (*Product*)**: Interface em [`code/criacional/src/padrao/RegistroClinico.ts`](file:///code/criacional/src/padrao/RegistroClinico.ts) que padroniza os métodos `getCategoria()`, `getResumo()` e `getDetalhes()`.
- **`BuscadorDeHistorico` (*Creator*)**: Classe abstrata em [`code/criacional/src/padrao/BuscadorDeHistorico.ts`](file:///code/criacional/src/padrao/BuscadorDeHistorico.ts) que declara o método fábrica abstrato `criarRegistroClinico()` e implementa a operação de alto nível `processarRegistros()`.

![Trecho de código da interface RegistroClinico](../assets/subequipe01-padroes/codigo/v1-nucleo-abstrato1.png)

<center><strong>Legenda:</strong> Figura 1 - Trecho de código da interface RegistroClinico (Product abstrato). O código completo está disponível em `code/criacional/src/padrao/RegistroClinico.ts`. Autoria: Artur Galdino.</center>

<br>

![Trecho de código da classe abstrata BuscadorDeHistorico](../assets/subequipe01-padroes/codigo/v1-nucleo-abstrato2.png)

<center><strong>Legenda:</strong> Figura 2 - Trecho de código da classe abstrata BuscadorDeHistorico (Creator) declarando o Factory Method. O código completo está disponível em `code/criacional/src/padrao/BuscadorDeHistorico.ts`. Autoria: Artur Galdino.</center>

---

### 3.2. Implementação Concreta da Fatia de Vacinas

Na fatia de imunização:
- **`CartaoVacina` (*ConcreteProduct*)**: Classe em [`code/criacional/src/padrao/CartaoVacina.ts`](file:///code/criacional/src/padrao/CartaoVacina.ts) que encapsula regras de negócio, dados de imunobiológico, fabricante, lote, dose e estabelecimento.
- **`BuscadorDeVacinas` (*ConcreteCreator*)**: Classe em [`code/criacional/src/padrao/BuscadorDeVacinas.ts`](file:///code/criacional/src/padrao/BuscadorDeVacinas.ts) que sobrepõe o Factory Method instanciando `CartaoVacina` a partir de cargas de dados brutas da RNDS.

![Trecho de código do criador concreto BuscadorDeVacinas](../assets/subequipe01-padroes/codigo/v1-fatia-vacinas.png)

<center><strong>Legenda:</strong> Figura 3 - Trecho de código do criador concreto BuscadorDeVacinas (ConcreteCreator) sobrescrevendo o Factory Method. O código completo está disponível em `code/criacional/src/padrao/BuscadorDeVacinas.ts`. Autoria: Artur Galdino.</center>

---

### 3.3. Testes Unitários Automatizados (Vitest)

Para garantir a confiabilidade do padrão, foram desenvolvidos testes unitários cobrindo instanciação, polimorfismo, integridade de campos e tratamento de exceções:
- [`CartaoVacina.test.ts`](file:///code/criacional/src/padrao/__tests__/CartaoVacina.test.ts) (6 testes)
- [`BuscadorDeVacinas.test.ts`](file:///code/criacional/src/padrao/__tests__/BuscadorDeVacinas.test.ts) (5 testes)

![Trecho de código dos testes unitários](../assets/subequipe01-padroes/codigo/v1-testes-unitarios.png)

<center><strong>Legenda:</strong> Figura 4 - Trecho de código dos testes automatizados validando o Factory Method no Vitest. A suíte completa está disponível em `code/criacional/src/padrao/__tests__/`. Autoria: Artur Galdino.</center>

---

### 3.4. Interface Gráfica Meu SUS Digital (React)

Apresentação gráfica em [`code/criacional/src/App.tsx`](file:///code/criacional/src/App.tsx) reproduzindo a experiência visual do Meu SUS Digital, com navegação entre a visão geral de saúde e a Carteira Nacional de Vacinação Digital.

![Trecho de código da interface React no App.tsx](../assets/subequipe01-padroes/codigo/v1-interface-react.png)

<center><strong>Legenda:</strong> Figura 5 - Trecho de código do componente React integrando e acionando o Factory Method. O arquivo completo está disponível em `code/criacional/src/App.tsx`. Autoria: Artur Galdino.</center>

---

## 4. Versão 2 — Fatia de Exames Laboratoriais (Giovani Coelho) `[PLACEHOLDER]`

Esta versão expandirá o catálogo de produtos concretos e criadores para comportar resultados de exames laboratoriais (hemogramas, exames citopatológicos, painéis virais):

- `ResultadoExame.ts` (*ConcreteProduct*): Implementação do contrato `RegistroClinico` para exames clínicos.
- `BuscadorDeExames.ts` (*ConcreteCreator*): Subclasse de `BuscadorDeHistorico` instanciando exames.
- `examesMock.ts`: Mocks simulando laudos laboratoriais da RNDS.
- Suíte de testes unitários com Vitest em `src/padrao/__tests__/BuscadorDeExames.test.ts`.

![Trecho de código da fatia de Exames Laboratoriais](../assets/subequipe01-padroes/codigo/v2-fatia-exames.png)

<center><strong>Legenda:</strong> Figura 6 - Trecho de código do ConcreteProduct e ConcreteCreator de Exames (código parcial ilustrativo; Autoria: Giovani Coelho - Em breve).</center>

---

## 5. Versão 3 — Fatia de Medicamentos e Farmácia Popular (João Leles) `[PLACEHOLDER]`

Esta versão adicionará suporte à emissão e consulta de dispensações farmacêuticas e prescrições do Programa Farmácia Popular:

- `ReceitaMedicamento.ts` (*ConcreteProduct*): Implementação do contrato `RegistroClinico` para medicamentos.
- `BuscadorDeMedicamentos.ts` (*ConcreteCreator*): Subclasse de `BuscadorDeHistorico` instanciando dispensações e prescrições.
- `medicamentosMock.ts`: Mocks de dispensações registradas na RNDS.
- Suíte de testes unitários com Vitest em `src/padrao/__tests__/BuscadorDeMedicamentos.test.ts`.

![Trecho de código da fatia de Medicamentos e Farmácia Popular](../assets/subequipe01-padroes/codigo/v3-fatia-medicamentos.png)

<center><strong>Legenda:</strong> Figura 7 - Trecho de código do ConcreteProduct e ConcreteCreator de Medicamentos (código parcial ilustrativo; Autoria: João Leles - Em breve).</center>

---

## 6. Versão 4 — Unificação e Seletor Dinâmico de Histórico (Nicole Jovita) `[PLACEHOLDER]`

Esta versão consolidará a camada de despacho e consumo centralizado do padrão GoF Criacional:

- `SeletorDeHistorico.ts`: Fachada/orquestrador que seleciona o criador adequado em tempo de execução com base no tipo de registro solicitado.
- Unificação das abas clínicas na interface do Meu SUS Digital.
- Suíte integrada de testes unitários e testes de regressão do padrão completo.

![Trecho de código da unificação e seletor dinâmico](../assets/subequipe01-padroes/codigo/v4-integracao-seletor.png)

<center><strong>Legenda:</strong> Figura 8 - Trecho de código da integração consolidada e despacho dinâmico do histórico de saúde (código parcial ilustrativo; Autoria: Nicole Jovita - Em breve).</center>

---

## 7. Instruções de Reprodução e Execução

O ambiente de execução foi padronizado utilizando Node.js (v22+) e NPM. Para reproduzir e testar o código localmente:

1. Acesse o diretório do mini-projeto:
   ```bash
   cd code/criacional
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Execute a suíte de testes automatizados:
   ```bash
   npm test
   ```
4. Gere o build de produção:
   ```bash
   npm run build
   ```
5. Inicie o servidor de desenvolvimento para visualização no navegador:
   ```bash
   npm run dev
   ```

---

## 8. Histórico de Versionamento

| Versão | Data | Descrição / Contribuição | Autor(es) | Commit(s) |
| :---: | :---: | :--- | :--- | :--- |
| `0.1` | 14/10/2026 | Estruturação do template inicial de documentação de código | [Gustavo Fornaciari](https://github.com/GUGOFO) | [`7c66f78`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/commit/7c66f78dc795f080bc43dc01f094e8976462d5b8) |
| `1.0` | 15/10/2026 | Implementação da Versão 1: Núcleo abstrato do Factory Method, fatia de Vacinas, 11 testes unitários com Vitest, interface Meu SUS Digital e estruturação dos placeholders V2, V3 e V4 com fotos | [Artur Galdino](https://github.com/ArturFGaldino) | [`90df441`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/commit/90df441), [`45f29be`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/commit/45f29be), [`c605056`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/commit/c605056), [`664e603`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/commit/664e603) |
| `1.1` | 15/10/2026 | Ajuste nas legendas e notas das figuras indicando explicitamente trechos parciais de código e padronização da numeração sequencial das Figuras 1 a 8 | [Artur Galdino](https://github.com/ArturFGaldino) | [`d6cfdcd`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/commit/d6cfdcd), [`664e603`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/commit/664e603) |
| `1.2` | 15/10/2026 | Documentação dos princípios GRASP (Creator, Low Coupling, High Cohesion, Protected Variations) aplicados à arquitetura do código | [Artur Galdino](https://github.com/ArturFGaldino) | [`82f8d04`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/commit/82f8d04) |