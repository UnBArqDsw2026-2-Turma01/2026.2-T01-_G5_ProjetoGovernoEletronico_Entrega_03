# Padrão de Issue — SubEquipe 1 (GoF Criacional)

Este documento descreve a iniciativa extra de **Padronização de Issues** criada para a **SubEquipe 01** no escopo da **Entrega 3 (Padrões de Projeto GoF)**. A iniciativa estabelece um fluxo uniforme e rastreável de governança, garantindo que cada membro da subequipe documente, implemente e comprove sua atuação nos três focos metodológicos obrigatórios: **Modelagem UML**, **Código no Repositório** e **Execução do Padrão**.

---

## 1. Contexto e Motivação

Durante o desenvolvimento da Entrega 3, a aplicação do padrão GoF Criacional (**Factory Method**) ao projeto Meu SUS Digital foi particionada em quatro versões incrementais (V1 - Vacinas, V2 - Exames, V3 - Medicamentos e V4 - Seletor Dinâmico e Hub Integrado). 

Para evitar descontinuidade na rastreabilidade entre commits, Pull Requests e os relatórios de documentação, foi concebido um **Issue Template específico** no GitHub, customizado para contemplar:
1. **Identificação e Papel:** Atribuição do integrante responsável, parceiro de revisão (*pair review*), prazo limite e fatia clínica do domínio.
2. **Checklist por Foco Metodológico:** Critérios de aceitação objetivos para Modelagem UML, Código e Testes, e Execução com evidências visuais.
3. **Mapeamento de Comprobatórios:** Tabela pré-formatada para que o autor registre links para commits, PRs, prints e logs antes de fechar a tarefa, alimentando diretamente o Quadro de Participações geral da entrega.

---

## 2. Template Implementado no Repositório

O template foi implementado e integrado diretamente no repositório GitHub através do arquivo:
[`/.github/ISSUE_TEMPLATE/padrao_gof(subequipe1).md`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/blob/main/.github/ISSUE_TEMPLATE/padrao_gof(subequipe1).md)

### Estrutura do Template

```markdown
---
name: "Padrão de Projeto GoF (Entrega 3)"
about: "Template para versionamento de padrões de projeto GoF contemplando os 3 focos (Modelagem UML, Código e Execução)"
title: "[SubEquipe 01 - Criacional] Factory Method - Versão X (@usuario)"
labels: "gof, criacional, entrega 3, documentacao, codigo"
assignees: ""
---

## 📌 Descrição Geral
Esta issue destina-se ao desenvolvimento da Versão [X] do padrão de projeto GoF da SubEquipe 01 (Criacional - Factory Method), aplicado ao fluxo de Autenticação, Consentimento (LGPD) e Busca de Histórico Clínico do projeto Meu SUS Digital.

Em conformidade com as diretrizes da disciplina, cada membro atua obrigatoriamente nos três focos:
1. Modelagem UML (elaboração/evolução da versão do diagrama com justificativa e literatura)
2. Código no Repositório (fatia do padrão em TypeScript/React, testes unitários e de integração)
3. Execução (teste em máquina local com clone limpo, prints/logs de evidência e gravação de trecho em vídeo)

---

## 👤 Responsável e Escopo

| Campo | Detalhe |
| :--- | :--- |
| **Integrante** | @nome_do_membro |
| **SubEquipe / Categoria** | SubEquipe 01 - GoF Criacional (Factory Method) |
| **Versão do Modelo** | Versão [X] |
| **Fatia de Código** | [Ex: Vacinas / Exames / Medicamentos / Núcleo e Seletor] |
| **Prazo Limite** | [DD/MM às HH:mm] |
| **Revisor do PR (Parceiro)** | @nome_do_revisor |

---

## 🎯 Critérios de Aceitação

### 1. Foco: Modelagem UML
- [ ] Elaboração da Versão: Produzir o diagrama correspondente no Miro/Draw.io.
- [ ] Documentação Teórica: Atualizar o documento da subequipe (GoFCriacional.md) detalhando decisões e citações da literatura.
- [ ] Export do Diagrama: Salvar a imagem exportada em assets/subequipe01-padroes/ e anexar prévia na issue.

### 2. Foco: Código e Testes
- [ ] Branch de Trabalho: Criar branch de trabalho conforme a política (feature/criacional-<fatia>).
- [ ] Implementação da Fatia: Desenvolver classes desacopladas em code/criacional/src/padrao/.
- [ ] Testes Automatizados: Implementar testes unitários em __tests__/ com Vitest.
- [ ] Pull Request e Code Review: Abrir PR e solicitar revisão de um parceiro da equipe.

### 3. Foco: Execução e Evidências
- [ ] Execução Local: Validar build limpo e testes (npm run dev e npm test).
- [ ] Evidências no Repositório: Salvar prints/logs em assets/subequipe01-padroes/execucao/ e atualizar Execucao.md.
- [ ] Gravação do Trecho em Vídeo: Gravar demonstração com a aplicação executando.

---

## 📋 Comprobatórios para o Quadro de Participações

| Foco | Evidência / Comprobatório (Link) |
| :--- | :--- |
| **Modelagem UML** | Commit / Link no GitPages (GoFCriacional.md) |
| **Código** | Commit / Link do PR mergeado em code/criacional/ |
| **Execução** | Link para print/log em Execucao.md e vídeo da demonstração |
```

---

## 3. Benefícios para a Governança do Projeto

- **Padronização Inter-equipes:** Facilita a auditoria de entregáveis, assegurando que nenhum dos três eixos obrigatórios seja negligenciado pelos membros da subequipe.
- **Rastreabilidade Bidirecional:** A issue funciona como um elo central entre o Quadro de Participações, os Pull Requests no GitHub e as seções de código e execução dos relatórios.
- **Transparência e Autonomia:** Cada integrante tem clareza prévia sobre os critérios de aceitação necessários para que sua contribuição seja validada com qualidade excelente.

---

## 4. Referências e Comprobatórios

- **Arquivo no Repositório:** [`.github/ISSUE_TEMPLATE/padrao_gof(subequipe1).md`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/blob/main/.github/ISSUE_TEMPLATE/padrao_gof(subequipe1).md)
- **Commit de Criação:** [`463a830`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/commit/463a830e10778c79448b6919f311ebda8f78cc4b)
- **Autor:** [Artur Galdino](https://github.com/ArturFGaldino)

---

## Histórico de Versionamento

| Versão | Data | Descrição / Contribuição | Autor(es) | Commit(s) |
| :---: | :---: | :--- | :--- | :--- |
| `1.0` | 15/10/2026 | Criação do Issue Template específico da SubEquipe 01 para os padrões GoF Criacionais contemplando os 3 focos | [Artur Galdino](https://github.com/ArturFGaldino) | [`463a830`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/commit/463a830e10778c79448b6919f311ebda8f78cc4b) |
| `1.1` | 18/10/2026 | Documentação formal da iniciativa extra de Padrão de Issue na Wiki/GitPages do projeto | [Artur Galdino](https://github.com/ArturFGaldino) | [`463a830`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/commit/463a830e10778c79448b6919f311ebda8f78cc4b) |
