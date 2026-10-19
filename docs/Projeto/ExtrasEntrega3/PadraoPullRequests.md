# Padrão de Pull Requests — SubEquipe 1 (GoF Criacional)

Este documento descreve a iniciativa extra de **Padronização de Pull Requests (PRs)** criada por [Nicole Jovita](https://github.com/nicolejovita) para a **SubEquipe 01** no escopo da **Entrega 3 (Padrões de Projeto GoF)**. A iniciativa estabelece um fluxo uniforme, rigoroso e auditável de governança de código, assegurando que toda integração de código e documentação atenda aos três focos metodológicos da disciplina: **Modelagem UML**, **Código no Repositório** e **Execução do Padrão**.

---

## 1. Contexto e Motivação

Durante o ciclo de desenvolvimento da Entrega 3, a equipe adotou um modelo incremental de quatro versões (V1 a V4) para a aplicação do padrão GoF Criacional (**Factory Method**) ao ecossistema do Meu SUS Digital. Com múltiplos integrantes atuando simultaneamente em fatias clínicas distintas (*Vacinas*, *Exames Laboratoriais*, *Medicamentos* e *Seletor Dinâmico com Hub Integrado*), identificou-se a necessidade de:

1. **Evitar Quebra de Integração Contínua:** Impedir a fusão de códigos sem verificação prévia de compilação estática (`tsc -b`) e suítes de testes unitários (`Vitest`).
2. **Assegurar Rastreabilidade Rígida:** Vincular explicitamente cada Pull Request à sua respectiva Issue de planejamento e listar com clareza os focos abordados.
3. **Formalizar a Revisão por Pares (*Peer Review*):** Definir revisores obrigatórios da mesma subequipe para avaliar a arquitetura orientada a objetos, os padrões GRASP e a conformidade visual com o Design System do Meu SUS Digital.
4. **Instruções Claras de Teste:** Fornecer aos revisores os comandos exatos para execução limpa da suíte de testes e inicialização do servidor de desenvolvimento.

---

## 2. Template Implementado no Repositório

O template oficial foi versionado e integrado ao GitHub no caminho:
[`/.github/pull_request_template.md`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/blob/main/.github/pull_request_template.md)

### Estrutura do Template de Pull Request

```markdown
# [SubEquipe 0X - GoF XXXXX] <Título Resumido da PR>

## Descrição
Descreva sucintamente as alterações introduzidas nesta PR (Modelagem UML, Código React/TypeScript, Testes ou Documentação do Padrão GoF).

---

## Issue Relacionada
Closes # [Número da Issue]

---

## Subequipe Responsável (Marque com 'x')
- [ ] **SubEquipe 01** - GoF Criacional (*Factory Method*)
- [ ] **SubEquipe 02** - GoF Estrutural (*Composite*)
- [ ] **SubEquipe 03** - GoF Comportamental (*Strategy*)

---

## Focos Atingidos (Marque com 'x')
- [ ] **Modelagem UML** (Diagrama de Classes V1, V2, V3, Final ou Sequência)
- [ ] **Código Fonte (React/TypeScript)** (Núcleo em `padrao/`, dados em `dominio/` ou UI em `ui/`)
- [ ] **Testes Unitários & Interface** (Suíte `Vitest` / `React Testing Library`)
- [ ] **Execução & Vídeo** (Evidências em `Execucao.md` e gravações)
- [ ] **Documentação & IA Generativa** (`Modelagem.md`, `Codigo.md`, `IA.md`, etc.)

---

## Instruções de Teste e Execução do Código

Para testar esta fatia localmente:

1. Navegue até o mini-projeto da subequipe correspondente:
```bash
# SubEquipe 01 (Criacional)
cd code/criacional

# SubEquipe 02 (Estrutural)
cd code/estrutural

# SubEquipe 03 (Comportamental)
cd code/comportamental
```

2. Instale as dependências e rode os testes unitários:
```bash
npm install
npm test
```

3. Execute o ambiente de desenvolvimento em React:
```bash
npm run dev
```

---

## Revisor Indicado (Integrante da mesma Subequipe)

#### SubEquipe 01 (Criacional)
- [ ] @ArturFGaldino
- [ ] @Gotc2607
- [ ] @joaoleless
- [ ] @nicolejovita

#### SubEquipe 02 (Estrutural)
- [ ] @GUGOFO
- [ ] @AnaBeatriz
- [ ] @VictorLeandro
- [ ] @JuliaPetrosa

#### SubEquipe 03 (Comportamental)
- [ ] @DaviUrsulino
- [ ] @GabrielMota
- [ ] @YasmimSantos
```

---

## 3. Diretrizes de Governança e Revisão

Para que uma Pull Request seja aprovada e integrada à branch principal (`main`), devem ser cumpridos os seguintes passos:

1. **Abertura:** O autor deve preencher o título seguindo a convenção `[SubEquipe 01 - Criacional] <Descrição>`, marcar a subequipe e selecionar os focos atingidos.
2. **Evidências:** Inserir no corpo da PR os links para os relatórios alterados e notas sobre testes realizados.
3. **Revisão Técnica Obrigatória:** Pelo menos um colega da mesma subequipe deve rodar a suíte localmente (`npm test`) e validar os arquivos modificados antes de aprovar.
4. **Merge sem Conflitos:** Manter a branch sincronizada com a `main` via rebase ou merge limpo.

---

## 4. Histórico de Versionamento

| Versão | Data | Descrição / Contribuição | Autor(es) | Commit(s) |
| :---: | :---: | :--- | :--- | :--- |
| `1.0` | 15/10/2026 | Criação do template padrão de Pull Request no repositório com checklists para os 3 focos e comandos de teste | [Nicole Jovita](https://github.com/nicolejovita) | [`26baca2`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/commit/26baca2) |
| `1.1` | 15/10/2026 | Refinamento da formatação visual e alinhamento de links no template de Pull Request | [Nicole Jovita](https://github.com/nicolejovita) | [`ab7509d`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/commit/ab7509d) |
| `1.2` | 18/10/2026 | Registro da iniciativa extra de padronização de PRs e governança de código | [Nicole Jovita](https://github.com/nicolejovita) | [`e8ad628`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/commit/e8ad628) |
