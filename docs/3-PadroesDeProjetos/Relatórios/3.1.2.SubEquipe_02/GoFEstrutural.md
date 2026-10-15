# GoF Estrutural | Composite

## Figma / Miro Usado

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://embed.figma.com/board/kjXYSBRLXLl5yAYva4prVm/GoF-Estrutural?node-id=0-1&embed-host=share" allowfullscreen></iframe>

---

## Versão Final

![Versão final do modelo do padrão Estrutural](../assets/subequipe02-padroes/versao-final.png)

<center><strong>Legenda:</strong> [PREENCHER: legenda da imagem]</center>

---

## Participantes

| Nome do Membro |
| :--- |
| [Gustavo Fornaciari](https://github.com/GUGOFO) |
| [Ana Beatriz](https://github.com/AnnaBeatrizAraujo) |
| [Victor Leandro](https://github.com/Afrontoso) |
| [Julia Oliveira Patricio](https://github.com/juliapat18) |

---

## Fundamentação Teórica

### O que são os Padrões GoF Estruturais

Os padrões GoF (*Gang of Four*) estruturais descrevem maneiras de organizar classes e objetos para formar estruturas maiores, reduzindo o acoplamento e facilitando mudanças e manutenção. Diferenciam-se dos padrões criacionais, que tratam da criação de objetos, e dos comportamentais, que enfatizam a comunicação e a distribuição de responsabilidades entre objetos. Entre os padrões estruturais apresentados no material da disciplina estão Adapter, Bridge, Composite, Decorator, Facade, Flyweight e Proxy.

### O Padrão Escolhido

- **Nome e classificação:** Composite — GoF Estrutural.
- **Intenção:** compor objetos em estruturas hierárquicas de árvore e permitir que clientes tratem objetos individuais e composições por meio de uma interface comum.
- **Problema que resolve:** representar uma interface de dashboard com seções que contêm cartões de atalho sem precisar implementar operações de renderização e consulta de maneira independente para cada nível da hierarquia.
- **Solução proposta:** definir `ElementoDeTela` como interface comum, `CartaoDeAtalho` como folha (*Leaf*), `Secao` como composto (*Composite*) e `Dashboard` como raiz da composição.
- **Participantes:** `ElementoDeTela`, `CartaoDeAtalho`, `Secao` e `Dashboard`.
- **Consequências:** facilita percorrer e operar sobre a árvore de forma uniforme e permite acrescentar novos tipos de elementos. Em contrapartida, uma abstração muito genérica pode aumentar a complexidade e exige definir quais operações fazem sentido para folhas e compostos.
- **Quando usar:** quando a interface precisa organizar itens individuais e grupos de itens em níveis hierárquicos, tratando-os de forma uniforme.

---

## Contexto de Aplicação no Projeto

### Onde o Padrão será aplicado

O Composite será aplicado conceitualmente à **Navegação Principal e ao Dashboard Pós-Login do Meu SUS Digital**, conforme o escopo definido no template da entrega. A interface pode ser organizada em seções, como **Minha Saúde**, **Mini apps** e **Conteúdo**, com cartões de atalho dentro de cada seção.

### Rastreabilidade e Elos com Outros Artefatos

| Artefato relacionado | Link no repositório | Relação com o padrão |
| :--- | :--- | :--- |
| Rich Picture (Entrega 1) | [`RichPicture.md`](../../1-DesenhoDeSoftware/Relatórios/1.1.2.SubEquipe_02/RichPicture.md) | Contextualiza o cidadão, o Meu SUS Digital e as necessidades de acesso a serviços de saúde. Ajuda a justificar uma navegação que agrupe serviços de forma compreensível. |
| SIG / NFR Framework (Entrega 1) | [`SIG.md`](../../1-DesenhoDeSoftware/Relatórios/1.1.2.SubEquipe_02/SIG.md) | Registra preocupações de usabilidade, localização de dados, velocidade de acesso, segurança e privacidade. A organização hierárquica deve apoiar a localização de funções sem ignorar esses atributos. |
| BPMN (Entrega 1) | [`BPMN.md`](../../1-DesenhoDeSoftware/Relatórios/1.1.2.SubEquipe_02/BPMN.md) | Descreve, por engenharia reversa, o fluxo entre cidadão e sistema e os caminhos de acesso a serviços. O Composite trata da estrutura da interface que apresenta esses serviços, não substitui o fluxo BPMN. |
| Modelagem Estática — Diagrama de Pacotes (Entrega 2) | [`ModelagemEstatica.md`](../../2-Modelagem/Relatórios/2.1.2.SubEquipe_02/ModelagemEstatica.md) | Organiza o sistema em camadas de Apresentação, Aplicação, Domínio e Integração, além de um pacote transversal. A proposta Composite fica principalmente no contexto de apresentação; não altera por si só a arquitetura em camadas. |
| Modelagem Dinâmica — Diagrama de Atividades (Entrega 2) | [`ModelagemDinamica.md`](../../2-Modelagem/Relatórios/2.1.2.SubEquipe_02/ModelagemDinamica.md) | Descreve a navegação pós-login e as ações do usuário/sistema. A modelagem Composite representa a estrutura dos elementos exibidos, enquanto o diagrama de atividades representa o fluxo de comportamento. |
| Fluxograma / fluxo de interface (Entrega 3) | [`fluxograma.md`](./fluxograma.md) | Deve ligar os passos de navegação às seções e cartões correspondentes. A rastreabilidade específica dos passos será completada quando o fluxo de V1 estiver preenchido. |

---

## Modelagem

### Versão 1

![Diagrama UML de classes da V1 do Composite](../assets/subequipe02-padroes/modelagem/GoF_Composite_V1.png)

**Legenda:** Figura 1 — Diagrama UML inicial do padrão Composite aplicado conceitualmente ao Dashboard Pós-Login do Meu SUS Digital. ElementoDeTela define a interface comum; CartaoDeAtalho representa a folha (Leaf); Secao representa o composto (Composite), agrupando elementos da interface; e Dashboard organiza as seções de nível superior. As setas tracejadas indicam realização de interface e os losangos preenchidos indicam composição.

#### O que foi feito

A V1 estabelece somente os participantes essenciais do padrão: `ElementoDeTela` define operações comuns; `CartaoDeAtalho` representa uma folha; `Secao` agrupa elementos por meio de uma coleção; e `Dashboard` mantém as seções de nível superior. O diagrama utiliza interface UML, operações, atributos, relações de implementação e a relação de composição entre a seção e seus elementos.

O objetivo desta primeira versão é validar a estrutura básica e manter o modelo simples o suficiente para evoluir nas próximas iterações. Ainda não são especificados detalhes de implementação, permissões, persistência, integração com serviços externos, estados de carregamento ou regras completas de navegação. As operações `renderizar`, `contarElementos` e `buscarPorId` são propostas conceituais para ilustrar o tratamento uniforme da árvore; seus contratos e retornos deverão ser refinados junto com o código.

### Versão 2

**A desenvolver.** Registrar a revisão da V1, as mudanças feitas nas relações UML, os novos atributos/operações e a justificativa de cada alteração. Manter a rastreabilidade com os artefatos anteriores.

### Versão 3

**A desenvolver.** Refinar a modelagem conforme o feedback da V2 e a implementação inicial. Conferir se as operações recursivas e a hierarquia correspondem ao comportamento esperado.

### Versão 4

**A desenvolver.** Consolidar o modelo após validação com o código e a execução local. Documentar limitações conhecidas, decisões finais e eventuais diferenças entre a proposta conceitual e a implementação.

---

## Metodologia

A modelagem parte dos artefatos produzidos nas entregas anteriores da SubEquipe 02. O Rich Picture e o SIG ajudam a recuperar o contexto e as preocupações de qualidade; o BPMN registra os processos observados por engenharia reversa; e os diagramas de pacotes e atividades descrevem, respectivamente, a organização lógica e o fluxo de navegação.

A primeira versão foi mantida em nível conceitual, usando um diagrama de classes UML para representar os papéis do Composite. O desenho pode ser importado para o Figma e ajustado visualmente. Nas próximas versões, o grupo deverá revisar o diagrama em conjunto, relacionar as classes às telas/fluxos identificados e validar a consistência entre modelo, código e execução local. A evolução deve ser registrada por commits e Pull Requests, conforme o fluxo de trabalho discutido pela subequipe.

**Registros do trabalho em equipe:** [Ata de reunião de 14/10/2026](../../../Atas/Entrega3/AtasSub2/Ata-14-10.md). Incluir links para as conversas de IA, capturas de tela, reuniões e PRs efetivamente utilizados, quando disponíveis.

---

## Embasamento teórico para criação

1. GAMMA, Erich; HELM, Richard; JOHNSON, Ralph; VLISSIDES, John. *Design Patterns: Elements of Reusable Object-Oriented Software*. Reading: Addison-Wesley, 1995.
2. SERRANO, Milene. *Arquitetura e Desenho de Software — Aula: GoFs Estruturais*. Material de aula, Universidade de Brasília, s.d. (slides fornecidos à equipe).
3. FREEMAN, Eric et al. *Head First Design Patterns*. 2. ed. Sebastopol: O’Reilly Media, 2020.

---

## Histórico de Versionamento

| Nome do Membro | Contribuição | Data | Commit |
| :--- | :--- | :--- | :--- |
| [Gustavo Fornaciari](https://github.com/GUGOFO) | Estruturação inicial do relatório e elaboração da modelagem Composite V1 | 15/10/2026 | A preencher após o commit da V1 |
| [Victor Leandro](https://github.com/Afrontoso) | Modelagem Composite V2 | A definir | A preencher |
| [Ana Beatriz](https://github.com/AnnaBeatrizAraujo) | Modelagem Composite V3 | A definir | A preencher |
| [Julia Oliveira Patricio](https://github.com/juliapat18) | Modelagem Composite V4 | A definir | A preencher |

---

## Melhorias previstas para as próximas versões

- **V2 — consistência UML:** revisar se `Dashboard` deve implementar `ElementoDeTela` ou atuar apenas como cliente/raiz; explicitar multiplicidades e composições; definir se `Secao` pode conter outra `Secao`.
- **V2 — operações:** detalhar contratos de `adicionar`, `remover`, `renderizar`, `contarElementos` e `buscarPorId`, incluindo o comportamento de uma folha.
- **V3 — alinhamento com a interface:** relacionar os nomes das seções e cartões às telas e aos fluxos observados nas entregas anteriores; registrar evidências e limites da engenharia reversa.
- **V3 — qualidade:** discutir acessibilidade/usabilidade e como a hierarquia facilita localizar serviços, sem afirmar ganhos de desempenho sem medição.
- **V4 — validação com código:** conferir se as classes implementadas correspondem ao diagrama; documentar testes de composição, busca, remoção e renderização recursiva.
- **V4 — rastreabilidade completa:** substituir referências genéricas por links/IDs específicos de telas, passos de fluxo, requisitos ou issues; verificar os caminhos dos links no repositório.
- **Todas as versões:** registrar autor, data, commit/PR, motivação das mudanças e uma imagem exportada do Figma.
