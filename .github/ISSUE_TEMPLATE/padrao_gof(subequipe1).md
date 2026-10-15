---
name: "Padrão de Projeto GoF (Entrega 3)"
about: "Template para versionamento de padrões de projeto GoF contemplando os 3 focos (Modelagem UML, Código e Execução)"
title: "[SubEquipe 01 - Criacional] Factory Method - Versão X (@usuario)"
labels: "gof, criacional, entrega 3, documentacao, codigo"
assignees: ""
---

## 📌 Descrição Geral
Esta issue destina-se ao desenvolvimento da **Versão [X]** do padrão de projeto GoF da **SubEquipe 01 (Criacional - Factory Method)**, aplicado ao fluxo de **Autenticação, Consentimento (LGPD) e Busca de Histórico Clínico** do projeto Meu SUS Digital.

Em conformidade com as diretrizes da disciplina, cada membro atua obrigatoriamente nos **três focos**:
1. **Modelagem UML** (elaboração/evolução da versão do diagrama com justificativa e literatura)
2. **Código no Repositório** (fatia do padrão em TypeScript/React, testes unitários e de integração)
3. **Execução** (teste em máquina local com clone limpo, prints/logs de evidência e gravação de trecho em vídeo)

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
- [ ] **Elaboração da Versão:** Produzir o diagrama correspondente no Miro/Draw.io:
  - *Se V1:* Diagrama de classes genérico mapeando participantes do GoF ao domínio.
  - *Se V2:* Diagrama de classes aplicado com as classes e métodos específicos do Meu SUS Digital.
  - *Se V3:* Diagrama refinado com ajustes e correções pós-implementação de código e testes.
  - *Se V4 / Final:* Diagrama consolidado com rastreabilidade completa e diagrama dinâmico/sequência complementar.
- [ ] **Documentação Teórica:** Atualizar o documento da subequipe (`GoFCriacional.md` / `Modelagem.md`) detalhando o que foi feito, decisões tomadas e citações da literatura (Gamma et al. / slides da professora).
- [ ] **Export do Diagrama:** Salvar a imagem exportada em `assets/subequipe01-padroes/` e anexar uma prévia nos comentários desta issue.

### 2. Foco: Código e Testes
- [ ] **Branch de Trabalho:** Criar a branch de trabalho seguindo a política (`feature/criacional-<fatia>`).
- [ ] **Implementação da Fatia:** Desenvolver a classe correspondente na camada `code/criacional/src/padrao/`:
  - Não acoplar o núcleo ao React ou dependências de UI.
  - Utilizar dados simulados de `code/criacional/src/dominio/` (sem chamadas a APIs reais).
- [ ] **Testes Automatizados:** Implementar testes unitários em `__tests__/` para as classes implementadas com Vitest.
- [ ] **Pull Request e Code Review:** Abrir Pull Request apontando para a branch de desenvolvimento e solicitar revisão de um colega da subequipe.

### 3. Foco: Execução e Evidências
- [ ] **Execução Local:** Validar a execução da aplicação a partir de um clone limpo (`npm run dev` e `npm test`).
- [ ] **Evidências no Repositório:** Salvar prints ou logs reais de funcionamento da sua fatia em `assets/subequipe01-padroes/execucao/` e atualizar `Execucao.md`.
- [ ] **Gravação do Trecho em Vídeo:** Gravar o trecho individual demonstrando a sua fatia em funcionamento com o padrão rodando.

---

## 📋 Comprobatórios para o Quadro de Participações

Para garantir a pontuação individual no Quadro de Participações, preencher a tabela abaixo antes de encerrar a issue:

| Foco | Evidência / Comprobatório (Link) |
| :--- | :--- |
| **Modelagem UML** | Commit / Link no GitPages (`GoFCriacional.md`) |
| **Código** | Commit / Link do PR mergeado em `code/criacional/` |
| **Execução** | Link para print/log em `Execucao.md` e vídeo da demonstração |

---

## 🔗 Rastreabilidade e Links Úteis
- **Documento da Subequipe:** [GoFCriacional.md](../../docs/3-PadroesDeProjetos/Relatórios/3.1.1.SubEquipe_01/GoFCriacional.md)
- **Código do Projeto:** `code/criacional/`
- **Padrão de Commits:** [PadraoDeCommits.md](../../docs/Projeto/ExtrasEntrega1/PadraoDeCommits.md)
- **Política de Branches:** [PolíticaDeBranches.md](../../docs/Projeto/ExtrasEntrega1/PolíticaDeBranches.md)
