# GoF Criacional | Factory Method

## 1. Ambiente de Modelagem (Miro)

<iframe 
  width="768" 
  height="432" 
  src="https://miro.com/app/board/uXjVEZGI2ZU=/?share_link_id=95444474569" 
  frameborder="0" 
  scrolling="no" 
  allow="fullscreen; clipboard-read; clipboard-write" 
  allowfullscreen>
</iframe>

<center><strong>Espaço Colaborativo:</strong> Painel de modelagem UML da SubEquipe 01 no Miro.</center>

---

## 2. Versão Final do Modelo

![Versão final do modelo do padrão Criacional](../assets/subequipe01-padroes/modelagem/versao-final.png)

<center><strong>Legenda:</strong> Figura 1 - Diagrama de Classes UML consolidado (Versão Final) do padrão GoF Factory Method aplicado ao Meu SUS Digital (Autoria: SubEquipe 01 - Em breve).</center>

---

## 3. Participantes da SubEquipe 01

| Nome do Membro | Papel na Modelagem e Foco Temático |
| :--- | :--- |
| [Artur Galdino](https://github.com/ArturFGaldino) | Versão 1: Diagrama Genérico do Factory Method e Fatia de Vacinas |
| [Giovani Coelho](https://github.com/Gotc2607) | Versão 2: Diagrama Aplicado com Extensão para Exames Laboratoriais |
| [João Leles](https://github.com/joaoleless) | Versão 3: Diagrama Refinado com Extensão para Medicamentos e Farmácia Popular |
| [Nicole Jovita](https://github.com/nicolejovita) | Versão 4: Consolidação Final com Seletor Dinâmico de Histórico |

---

## 4. Fundamentação Teórica

### 4.1. O que são os Padrões GoF Criacionais

Os padrões criacionais descritos pelo *Gang of Four* (Gamma et al., 1995) abstraem o processo de instanciação de objetos. Eles tornam um sistema independente de como seus objetos são criados, compostos e representados, encapsulando o conhecimento sobre quais classes concretas o sistema utiliza e ocultando como instâncias dessas classes são criadas e combinadas.

### 4.2. O Padrão Escolhido: Factory Method

* **Nome e Classificação:** Factory Method (Método Fábrica) — Padrão GoF de Criação de Objetos.
* **Intenção:** Definir uma interface para criar um objeto, mas delegar às subclasses a decisão sobre qual classe instanciar. O Factory Method permite adiar a instanciação para as subclasses em tempo de execução.
* **Problema que Resolve:** O sistema do Meu SUS Digital consome registros de saúde providos pela Rede Nacional de Dados em Saúde (RNDS). Embora todos os itens clínicos representem dados de saúde de um mesmo cidadão, a estrutura, as validações e as peculiaridades de cada categoria (doses e lotes de vacinas, laudos e parâmetros de exames, prescrições e dosagens de medicamentos) são completamente heterogêneas. Instanciar esses objetos de maneira acoplada e dispersa na camada de aplicação geraria alta fragilidade, violando o princípio *Open/Closed* (Aberto para Extensão, Fechado para Modificação) e o princípio de Responsabilidade Única (*Single Responsibility Principle*).
* **Solução Proposta:** Instituir uma classe abstrata criadora (`BuscadorDeHistorico` / `Creator`) que estabelece o contrato do método fábrica abstrato `criarRegistroClinico()` (`factoryMethod()`). Subclasses concretas (`BuscadorDeVacinas`, `BuscadorDeExames`, `BuscadorDeMedicamentos`) estendem essa base e realizam a instanciação de seus respectivos produtos clínicos (`CartaoVacina`, etc.), todos em conformidade com uma interface comum de produto (`RegistroClinico` / `Product`).
* **Estrutura e Participantes do Padrão:**
  1. **`Product` (`RegistroClinico`):** Interface que define os métodos comuns a todos os registros de saúde exibidos no sistema (`getCategoria()`, `getResumo()`, `getDetalhes()`).
  2. **`ConcreteProduct` (`CartaoVacina`):** Implementa o contrato de `Product`, encapsulando as propriedades e regras de negócio de imunobiológicos, lotes e doses.
  3. **`Creator` (`BuscadorDeHistorico`):** Declara o Factory Method abstrato `criarRegistroClinico()` e implementa operações concretas de alto nível, como `processarRegistros()`.
  4. **`ConcreteCreator` (`BuscadorDeVacinas`):** Sobrescreve o método fábrica para instanciar e retornar objetos `CartaoVacina`.
* **Consequências (Vantagens e Desvantagens):**
  - *Vantagens:* Desacopla o processador de dados clínicos das classes concretas de cada registro; facilita a adição de novas fatias clínicas sem impacto nas fatias existentes; viabiliza testes unitários isolados e reutilização da lógica de processamento em lote.
  - *Desvantagens:* Pode aumentar a quantidade de classes no sistema, visto que para cada novo produto clínico é necessário criar uma subclasse criadora correspondente.
* **Quando Usar:** Quando uma classe não pode antecipar a classe de objetos que deve criar; quando se deseja que as subclasses especifiquem os objetos criados; e quando se deseja centralizar e isolar as responsabilidades de instanciação.

### 4.3. Senso Crítico e Alternativas Consideradas

A escolha do **Factory Method** como padrão criacional principal foi fundamentada na análise comparativa de soluções alternativas do catálogo GoF:

- **Abstract Factory:** Foi considerada para a instanciação de famílias completas de componentes por ambiente (ex.: alternar entre provedor RNDS Real em nuvem e provedor Mock Local para desenvolvimento offline). Contudo, no contexto da busca de histórico clínico individual, o foco não é criar famílias de produtos interdependentes, mas sim permitir a instanciação polimórfica de categorias heterogêneas de registros a partir da escolha do cidadão. Adotar Abstract Factory nesse estágio acrescentaria camadas extras de abstração sem benefício direto imediato.
- **Builder:** Foi analisado para o fluxo de montagem progressiva do termo de consentimento LGPD, que possui múltiplos parâmetros granulares e passos sequenciais de autorização. No entanto, os registros retornados pela RNDS (vacinas, laudos) chegam na aplicação como cargas de dados consolidadas (JSON/FHIR Bundles), onde a criação direta do produto via método fábrica é mais direta, idiomática e coesa do que uma montagem passo a passo.
- **Singleton (Crítica Técnica):** O padrão Singleton foi expressamente evitado como padrão arquitetural principal da subequipe. Embora frequentemente utilizado para gerenciamento de conexões ou caches de sessão, a literatura especializada e a comunidade de arquitetura de software apontam que o Singleton atua majoritariamente como um anti-padrão de estado global disfarçado. Ele introduz forte acoplamento entre classes, oculta dependências diretas, impede a execução de testes unitários paralelos e determinísticos (como os que implementamos no Vitest) e viola tanto o Princípio da Responsabilidade Única (SRP) quanto o Princípio Aberto/Fechado (OCP).

### 4.4. Integração com Padrões e Princípios GRASP

A modelagem e implementação do Factory Method foram diretamente enriquecidas com os princípios e padrões de atribuição de responsabilidades **GRASP** (*General Responsibility Assignment Software Patterns*, Larman, 2005):

- **Creator (Criador):** O padrão GRASP Criador define que uma classe $B$ deve criar instâncias de $A$ caso $B$ agregue, contenha ou possua os dados essenciais para inicializar $A$. No nosso desenho, `BuscadorDeVacinas` é o Criador legítimo de `CartaoVacina`, pois processa e valida a carga bruta de imunobiológicos da RNDS.
- **Low Coupling (Baixo Acoplamento):** A interface de visualização React interage exclusivamente com as abstrações `BuscadorDeHistorico` e `RegistroClinico`. Nenhuma tela ou componente de UI possui acoplamento rígido com a classe concreta `CartaoVacina`, permitindo que novas fatias sejam acopladas transparentemente.
- **High Cohesion (Alta Coesão):** As responsabilidades de negócio estão estritamente segregadas: o produto concreto foca no encapsulamento e validação dos dados de vacinação, enquanto o criador concreto foca na lógica de instanciação e mapeamento do payload.
- **Polymorphism (Polimorfismo):** A delegação da criação para subclasses substitui estruturas condicionais (`if`/`switch`) por despacho polimórfico dinâmico baseado no tipo de seção clínica.
- **Protected Variations (Variações Protegidas):** A interface `RegistroClinico` atua como uma barreira estável que protege os consumidores do sistema contra instabilidades e variações de esquemas de dados da RNDS.

---

## 5. Contexto de Aplicação no Projeto

### 5.1. Onde o Padrão foi Aplicado

O padrão foi aplicado no subsistema de **Histórico de Saúde e Emissão de Documentos Clínicos** do Meu SUS Digital. A partir da autenticação via Gov.br e da concessão de consentimento nos termos da LGPD (mapeados no fluxo da Entrega 2 em [fluxograma.md](./fluxograma.md)), a aplicação requisita os registros à RNDS. Em vez de acoplar a visualização à estrutura crua de cada resposta de API, o subsistema aciona o criador especializado que instancia o produto clínico padronizado.

### 5.2. Rastreabilidade e Elos com Outros Artefatos

| Artefato Relacionado | Referência / Link | Relação com o Padrão GoF e Princípios GRASP |
| :--- | :--- | :--- |
| **Fluxograma de Processo (Entrega 2)** | [fluxograma.md](docs/3-PadroesDeProjetos/Relatórios/3.1.1.SubEquipe_01/fluxograma.md) | O Factory Method é acionado na etapa posterior à verificação de consentimento LGPD, processando a carga de dados brutos retornada pela RNDS. |
| **Diagrama de Pacotes (Entrega 2)** | [2.1.1.DiagramaDePacotes.md](../../../2-Modelagem/Relatórios/2.1.1.SubEquipe_01/ModelagemEstatica.md) | Fundamenta a separação em camadas arquiteturais (UI, Domínio Clínico e Núcleo do Padrão), garantindo Baixo Acoplamento e Alta Coesão. |
| **Diagrama de Colaboração (Entrega 2)** | [2.1.4.DiagramaDeColaboracao.md](../../../2-Modelagem/Relatórios/2.1.1.SubEquipe_01/ModelagemDinamica.md) | Mapeia o fluxo de mensagens entre o cidadão autenticado, o controlador de histórico e a RNDS no momento da busca. |
| **Código Fonte e Pull Request** | [Codigo.md](../../../3-PadroesDeProjetos/Relatórios/3.1.1.SubEquipe_01/Codigo.md), [PR #19](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/pull/19) | Implementação executável das classes modeladas no diagrama e Pull Request da Versão 1. |
| **Execução e Testes** | [Execucao.md](../../../3-PadroesDeProjetos/Relatórios/3.1.1.SubEquipe_01/Execucao.md) | Validação da instanciação dinâmica e dos testes automatizados. |

---

## 6. Modelagem por Versões

### 6.1. Versão 1 — Diagrama de Classes Genérico (Artur Galdino)

A Versão 1 estabelece a correspondência formal entre a estrutura canônica do padrão GoF (Gang of Four) e o domínio do Meu SUS Digital, incorporando os princípios de atribuição de responsabilidades GRASP:

![Diagrama de Classes GoF Criacional - Versão 1](../assets/subequipe01-padroes/modelagem/versao-1.jpg)

<center><strong>Legenda:</strong> Figura 2 - Modelagem UML do Factory Method — Versão 1: Diagrama Genérico com papéis GoF, mapeamento para o domínio e princípios GRASP (Autoria: Artur Galdino).</center>

- **Mapeamento de Participantes:**
  - `Creator` --> `BuscadorDeHistorico`: Classe abstrata que declara o método fábrica abstrato `factoryMethod()` (`criarRegistroClinico`) e define a operação concreta de processamento em lote `anOperation()` (`processarRegistros`).
  - `Product` --> `RegistroClinico`: Interface que uniformiza o contrato dos registros de saúde exibidos no Meu SUS Digital (*Protected Variations*).
  - `ConcreteCreator` --> `BuscadorDeVacinas`: Criador concreto da fatia de Vacinas que sobrescreve o Factory Method (*GRASP Creator*).
  - `ConcreteProduct` --> `CartaoVacina`: Produto concreto que encapsula os dados e regras de negócio da imunização do cidadão.
- **Elementos e Notação UML Utilizados:**
  - Interface `<<interface>>` `Product` com métodos abstratos.
  - Classe Abstrata `{abstract}` `Creator` com método fábrica em itálico.
  - Realização (`..|>`) de `Product` por `ConcreteProduct` com ponta triangular oca.
  - Generalização/Herança (`--|>`) de `Creator` por `ConcreteCreator` com ponta triangular oca.
  - Dependência de Instanciação (`..>`) com estereótipo `<<instantiates>>` associada ao princípio *GRASP: Creator*.
  - Dependência de Uso (`..>`) com estereótipo `<<uses>>`.
- **Embasamento Teórico da Modelagem (Versão 1):**
  - **Padrão GoF Criacional Canônico (Gamma et al., 1995):** A Versão 1 fundamenta-se na estrutura clássica do *Factory Method*, cuja intenção é adiar a decisão de instanciação de objetos para subclasses. O modelo separa o *Creator* abstrato (`BuscadorDeHistorico`), que orquestra a lógica de negócio de processamento em lote (`processarRegistros()`), do *Product* abstrato (`RegistroClinico`), eliminando o acoplamento ao operador `new` na camada cliente.
  - **Padrão GRASP Creator (Larman, 2005):** A responsabilidade de instanciar `CartaoVacina` é atribuída ao `BuscadorDeVacinas` porque esta classe possui as informações e o contexto do payload bruto recebido da RNDS (doses, lotes, estabelecimentos CNES).
  - **Padrão GRASP Protected Variations:** O contrato estável `RegistroClinico` atua como barreira protetora contra divergências estruturais nos esquemas de dados de saúde.

---

### 6.2. Versão 2 — Diagrama de Classes Aplicado (Giovani Coelho)

A Versão 2 evolui o diagrama de classes UML para o **Diagrama Aplicado**, incorporando ao catálogo do Meu SUS Digital a fatia de **Exames Laboratoriais** da Rede Nacional de Dados em Saúde (RNDS) e comprovando na prática o princípio *Open/Closed* (Aberto para Extensão, Fechado para Modificação):

![Diagrama de Classes GoF Criacional - Versão 2](../assets/subequipe01-padroes/modelagem/versao-2.png)

<center><strong>Legenda:</strong> Figura 3 - Modelagem UML do Factory Method — Versão 2: Diagrama Aplicado com Vacinas e Exames Laboratoriais, estereótipos formais e princípios GRASP (Autoria: Giovani Coelho).</center>

- **Mapeamento de Participantes no Domínio Clínico:**
  - `Creator` --> `BuscadorDeHistorico`: Classe abstrata que declara o método fábrica abstrato `criarRegistroClinico()` e a operação de alto nível de processamento em lote `processarRegistros()`.
  - `Product` --> `RegistroClinico`: Interface que padroniza o contrato amigável de exibição de todos os registros de saúde no sistema (*Protected Variations*).
  - `ConcreteCreator 1` --> `BuscadorDeVacinas`: Criador concreto da fatia de Vacinas e Imunizações (V1).
  - `ConcreteProduct 1` --> `CartaoVacina`: Produto concreto que encapsula dados de doses, imunobiológicos e lotes (V1).
  - `ConcreteCreator 2` --> `BuscadorDeExames`: **Novo Criador Concreto da Versão 2**, especializado na busca de exames laboratoriais. Sobrescreve o Factory Method `criarRegistroClinico()` para converter a carga bruta de laudos em instâncias de `ResultadoExame` (*GRASP: Creator*).
  - `ConcreteProduct 2` --> `ResultadoExame`: **Novo Produto Concreto da Versão 2**, representando laudos de Patologia Clínica, Hematologia, Bioquímica e Virologia. Encapsula metadados diagnósticos, metodologia analítica, parecer técnico e a lista de parâmetros clínicos com valores de referência.
- **Elementos e Notação UML Utilizados:**
  - Interface `<<interface>>` `RegistroClinico` com métodos e atributos públicos (`+`).
  - Classe Abstrata `{abstract}` `BuscadorDeHistorico` com métodos abstratos em itálico/indicados com asterisco.
  - Generalização/Herança (`--|>`) de `BuscadorDeHistorico` por `BuscadorDeVacinas` e `BuscadorDeExames` com linha sólida e ponta triangular oca (*GRASP: Polymorphism*).
  - Realização (`..|>`) de `RegistroClinico` por `CartaoVacina` e `ResultadoExame` com linha tracejada e ponta triangular oca.
  - Dependência de Instanciação (`..>`) com estereótipo `<<instantiates>>` associada ao princípio *GRASP: Creator* conectando cada criador ao seu respectivo produto.
  - Dependência de Uso (`..>`) com estereótipo `<<uses>>` da classe base criadora para o produto abstrato.
- **Embasamento Teórico da Modelagem (Versão 2):**
  - **Princípio Aberto/Fechado (Open/Closed Principle - OCP, Meyer, 1988; Martin, 2002):** A Versão 2 comprova a extensibilidade da arquitetura sem alteração de código pré-existente. A inclusão da fatia de exames laboratoriais foi realizada puramente por adição: introduziu-se `BuscadorDeExames` e `ResultadoExame`, preservando intactos a interface `RegistroClinico` e a classe base `BuscadorDeHistorico`.
  - **Princípio da Substituição de Liskov (Liskov Substitution Principle - LSP, Liskov, 1987):** A nova classe `ResultadoExame` implementa rigorosamente o contrato de `RegistroClinico`, garantindo que qualquer consumidor do sistema possa operar polimorficamente sobre laudos laboratoriais da mesma forma que opera sobre vacinas (`getCategoria()`, `getResumo()`, `getDetalhes()`), sem efeitos colaterais ou quebra de invariantes.
  - **Padrão GRASP Polymorphism (Larman, 2005):** A modelagem substitui estruturas condicionais procedurais (`switch`/`if-else`) por despacho dinâmico na hierarquia de herança e realização UML, onde cada criador concreto responde autonomamente pela fabricação do seu tipo correspondente.
  - **Padrão GRASP Low Coupling & High Cohesion:** O acoplamento da camada de apresentação ao formato dos laudos da RNDS é zero. O criador concreto isola as especificidades dos dados laboratoriais, assegurando que componentes visuais conheçam apenas os métodos públicos abstratos.

---

### 6.3. Versão 3 — Diagrama Refinado (João Leles)

A Versão 3 refina o diagrama após a validação da implementação, incorporando a fatia de **Medicamentos e Farmácia Popular** como terceira hierarquia paralela Creator/Product:

- **`ReceitaMedicamento` «ConcreteProduct»**: realiza `RegistroClinico` (`tipo = 'MEDICAMENTO'`) e compõe `ItemMedicamento[]` (agregação 1..*).
- **`BuscadorDeMedicamentos` «ConcreteCreator»**: herda de `BuscadorDeHistorico` e sobrepõe `criarRegistroClinico()`, com dependência «create» para `ReceitaMedicamento`.
- **Cliente (`App.tsx`)**: continua dependendo apenas das abstrações, agora com três criadores concretos.

```mermaid
classDiagram
  class RegistroClinico { <<interface>> +id +dataRegistro +tipo +getCategoria() +getResumo() +getDetalhes() }
  class BuscadorDeHistorico { <<abstract>> +processarRegistros(colecaoBruta) +criarRegistroClinico(dadosBrutos)* +obterTipoSecao()* }
  class BuscadorDeMedicamentos { +criarRegistroClinico(dadosBrutos) +obterTipoSecao() }
  class ReceitaMedicamento { +itens: ItemMedicamento[] }
  class ItemMedicamento { +principioAtivo +posologia +quantidade }
  BuscadorDeHistorico <|-- BuscadorDeVacinas
  BuscadorDeHistorico <|-- BuscadorDeExames
  BuscadorDeHistorico <|-- BuscadorDeMedicamentos
  RegistroClinico <|.. CartaoVacina
  RegistroClinico <|.. ResultadoExame
  RegistroClinico <|.. ReceitaMedicamento
  ReceitaMedicamento o-- "1..*" ItemMedicamento
  BuscadorDeMedicamentos ..> ReceitaMedicamento : create
```

- **Embasamento Teórico (Versão 3):** a terceira extensão sem alteração do núcleo confirma o OCP; a substituibilidade de `ReceitaMedicamento` por `RegistroClinico` atende ao LSP; e a atribuição da criação ao `BuscadorDeMedicamentos`, que detém os dados de inicialização, segue o GRASP *Creator* (Larman, 2004).

![Diagrama de Classes GoF Criacional - Versão 3](../assets/subequipe01-padroes/modelagem/versao-3.png)

<center><strong>Legenda:</strong> Figura 4 - Modelagem UML do Factory Method — Versão 3: Diagrama Refinado com Medicamentos (Autoria: João Leles).</center>

---

### 6.4. Versão 4 — Consolidação Final com Seletor (Nicole Jovita) `[PLACEHOLDER]`

Diagrama consolidado final com a classe orquestradora `SeletorDeHistorico` e a visão completa das três fatias de produtos clínicos integrados:

![Diagrama de Classes GoF Criacional - Versão 4 / Final](../assets/subequipe01-padroes/modelagem/versao-final.png)

<center><strong>Legenda:</strong> Figura 5 - Modelagem UML consolidada com o Seletor Dinâmico de Histórico (Autoria: Nicole Jovita - Em breve).</center>

---

## 7. Metodologia

A SubEquipe 01 adotou uma metodologia iterativa e incremental de fatiamento arquitetural:
1. **Fatiamento Funcional:** Em vez de realizar todo o trabalho de forma monolítica ou dispersa, o domínio clínico do Meu SUS Digital foi particionado em fatias temáticas (Vacinas, Exames, Medicamentos e Seletor Unificador).
2. **Atuação nos Três Focos Obrigatórios:** Cada membro é diretamente responsável pelos 3 focos de sua versão: **Modelagem UML**, **Código Fonte** e **Execução/Evidências**.
3. **Padrão de Qualidade e Isolamento:** O código foi construído em repositório desacoplado (`code/criacional/`), garantindo execução offline e testes automatizados sem acoplamento a serviços externos.

Registros das atas de reunião e planejamento interno estão documentados em [Planejamento de Issues](#/3-PadroesDeProjetos/Relatórios/3.1.1.SubEquipe_01/PlanejamentoIssues).

---

## 8. Bibliografia

1. GAMMA, Erich; HELM, Richard; JOHNSON, Ralph; VLISSIDES, John. **Padrões de Projeto: Soluções Reutilizáveis de Software Orientado a Objetos**. Porto Alegre: Bookman, 2000.
2. LARMAN, Craig. **Utilizando UML e Padrões: Uma Introdução à Análise e ao Projeto Orientados a Objetos e ao Desenvolvimento Iterativo**. 3. ed. Porto Alegre: Bookman, 2005.
3. SERRANO, Milene; SERRANO, Maurício. **Material de Apoio da Disciplina Arquitetura e Desenho de Software**: Padrões GoF Criacionais. Universidade de Brasília (UnB), Faculdade do Gama (FGA), 2026.
4. FOWLER, Martin. **Refatoração: Aperfeiçoando o Design de Código Existente**. Porto Alegre: Bookman, 2020.
5. MARTIN, Robert C. **Design Principles and Design Patterns**. Clean Code Collection, 2002.
6. MEYER, Bertrand. **Object-Oriented Software Construction**. 2. ed. Upper Saddle River: Prentice Hall, 1997.
7. LISKOV, Barbara. **Data Abstraction and Hierarchy**. OOPSLA '87 Addendum to the Proceedings, 1987.
8. BRASIL. Ministério da Saúde. **Rede Nacional de Dados em Saúde (RNDS) - Especificações Técnicas de Integração**. Disponível em: <https://rnds.saude.gov.br/>. Acesso em: 15 out. 2026.

---

## 9. Histórico de Versionamento

| Versão | Data | Descrição / Contribuição | Autor(es) | Commit(s) |
| :---: | :---: | :--- | :--- | :--- |
| `0.1` | 06/10/2026 | Início do template do trabalho | [Gustavo Fornaciari](https://github.com/GUGOFO) | [`18b6195`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/commit/18b61958e419b67f95469d4a704ddcb9629b9803) |
| `0.2` | 14/10/2026 | Template mais detalhado de padrões GoF | [Gustavo Fornaciari](https://github.com/GUGOFO) | [`7c66f78`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/commit/7c66f78dc795f080bc43dc01f094e8976462d5b8) |
| `1.0` | 15/10/2026 | Elaboração completa da fundamentação teórica, contexto de aplicação no Meu SUS Digital, documentação detalhada da Versão 1 de modelagem UML (Artur Galdino) e estruturação dos placeholders formais para as Versões 2, 3 e 4 | [Artur Galdino](https://github.com/ArturFGaldino) | [`af87f42`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/commit/af87f42) |
| `1.1` | 15/10/2026 | Padronização e harmonização da numeração sequencial contínua das Figuras 1 a 5 | [Artur Galdino](https://github.com/ArturFGaldino) | [`af87f42`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/commit/af87f42) |
| `1.2` | 15/10/2026 | Enriquecimento da documentação com senso crítico de alternativas (Abstract Factory, Builder, Singleton), padrões GRASP (Creator, Low Coupling, High Cohesion, Protected Variations), rastreabilidade com Diagramas de Pacotes e Colaboração, e nomenclatura de versões (Genérico, Aplicado, Refinado) | [Artur Galdino](https://github.com/ArturFGaldino) | [`af87f42`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/commit/af87f42) |
| `2.0` | 15/10/2026 | Documentação da Versão 2 de modelagem UML (Giovani Coelho): Diagrama de Classes Aplicado com a inclusão de Exames Laboratoriais (BuscadorDeExames e ResultadoExame), mapeamento de papéis GoF, notação UML e princípios GRASP | [Giovani Coelho](https://github.com/Gotc2607) | [`775ef48`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/commit/775ef48) |
| `2.1` | 15/10/2026 | Inclusão de embasamento teórico aprofundado para as Versões 1 e 2 (Gamma et al., OCP, LSP, padrões GRASP) e expansão das referências bibliográficas | [Giovani Coelho](https://github.com/Gotc2607) | [`6eed676`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/commit/6eed676) |
| `3.0` | 16/10/2026 | Documentação da Versão 3 de modelagem UML: Diagrama Refinado com Medicamentos (BuscadorDeMedicamentos e ReceitaMedicamento) e embasamento teórico | [João Leles](https://github.com/joaoleless) | - |
