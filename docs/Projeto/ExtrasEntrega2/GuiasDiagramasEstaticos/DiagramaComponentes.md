# Guia de Diagrama de Componentes UML

## 1. Visão geral e objetivos dos Diagramas de Componentes na UML

Diagramas de componentes fornecem uma visão de alto nível da arquitetura de software, mostrando como módulos independentes (componentes) interagem por meio de interfaces padronizadas. Segundo guias, eles representam os principais módulos ou subsistemas do sistema e seus relacionamentos estáticos. A UML define o componente como “unidade modular com interfaces bem-definidas, substituível em seu ambiente”. Cada componente encapsula funcionalidade específica e pode ser composto de classes ou até de outros componentes. Objetivos típicos incluem modularidade e reuso: por meio de interfaces públicas os componentes comunicam-se, escondendo a implementação interna e permitindo que sejam trocáveis sem afetar o restante do sistema. Em projetos ágeis, diagramas de componentes ajudam a equipe a imaginar a estrutura global, identificando pontos de extensão e dependências principais.

## 2. Notação oficial (OMG) detalhada

A notação de diagramas de componentes na UML 2.x segue a especificação da OMG. Os principais elementos incluem:

- **Componente:** Representado por um retângulo (com borda grossa ou ícone interno) estereotipado como «componento». Um componente agrupa um conjunto de funcionalidades (por exemplo, um subsistema ou serviço) e é o principal bloco de modularização.
- **Interface fornecida/fornecida (provided):** Mostrada como um **círculo (“picolé”)** ligado à borda do componente. Este símbolo indica que o componente fornece a interface (serviços) representada.
- **Interface requerida (required):** Representada por um **semi-círculo (“tomada”/“soquete”)** apontando para o componente. Indica que o componente necessita desta interface (depende de serviços externos).
- **Porta:** Ponto de interação específico no limite de um componente, desenhado como um **quadrado pequeno** na lateral do retângulo. Portas servem para modular pontos de comunicação ou conectar subconjuntos de interfaces.
- **Dependência (realização/uso):** Desenhada como seta tracejada com ponta aberta, indicando que um componente ou porta _depende_ de outro elemento/interface. Em geral, _somente_ dependências de interfaces devem ser modeladas.
- **Pacote:** Bloco estilizado como uma pasta de arquivos, usado para agrupar componentes ou artefatos relacionados. Opcionalmente, pode representar namespaces ou subsistemas.
- **Artefato:** Representa recurso físico (arquivo de código, biblioteca, executável). Desenho: retângulo com canto dobrado e estereótipo «artifact». Com artefato pode-se mostrar _manifestação_ (implementation) dos componentes.
- **Nós (Nodes):** Caixas tridimensionais que representam dispositivos de hardware ou ambientes de execução (servidores, navegadores). Usados quando se quer modelar cenário de implantação do sistema.
- **Observações e estereótipos:** Notas (post-it) podem ser adicionadas para documentar detalhes. É comum usar estereótipos UML como <<component>>, <<interface>>, <<artifact>>, <<boundary>> etc., para explicitar o papel do elemento.

A notação oficial também define conectores de montagem (assembly) entre componentes ou através das interfaces: geralmente as interfaces fornecidas de um componente conectam-se às interfaces necessárias de outro por meio de linhas tracejadas. Em UML 2.5, não há diagrama específico de “manifestação”; tradicionalmente, indica-se que um artefato _implementa_ um componente por um traço de dependência de manifestação ou por empilhar diagramas de componente e de implantação.

## 3. Boas práticas e padrões de modelagem

- **Coesão:** Mantenha cada componente dedicado a uma única responsabilidade ou conjunto relacionado de funções. Componentes devem agrupar classes e funcionalidades intimamente relacionadas. Alta coesão facilita manutenção e reuso.
- **Baixo acoplamento:** Desenhe dependências mínimas entre componentes. Sempre que possível, componentes devem interagir _somente_ via interfaces bem-definidas. Não modele ligações diretas entre classes de componentes diferentes (evite “dependências de compilação”). Use interfaces fornecidas/necessárias para isolar mudanças internas de um componente.
- **Granularidade adequada:** Nem muito grosseira nem muito fina. Componentes devem refletir os módulos reais do sistema: cada componente deve conter as classes/artefatos necessários para fornecer sua funcionalidade, mas sem abranger áreas não relacionadas. Por exemplo, um componente “Segurança” pode conter autenticação/autorização, mas não deve incluir lógica de negócio. Pode-se decompor um sistema em níveis: subsistemas maiores contendo componentes menores. A granularidade costuma ser guiada por requisitos de reuso e por limites organizacionais.
- **Nomenclatura consistente:** Use nomes claros e descritivos. Prefira termos do domínio ou nomes de subsistemas reconhecíveis. Siga convenções (ex.: <Namespace>::<NomeComponente>). Evite nomes genéricos (como _Componente1_) ou ambíguos.
- **Visibilidade e abstração:** Mostre somente o necessário. Em diagramas de alto nível, não exiba classes internas, apenas o componente com suas interfaces principais. Esconder detalhes auxilia a focar a arquitetura. Se necessário, use diagramas de pacotes ou hierarquias de componentes para decompor o sistema.
- **Versionamento:** Registre revisões do diagrama (etiquetas de versão). Atribua versão ou data ao componente/artefato, se pertinente. Armazene diagramas em controle de versão (ex.: Git) associado ao código, para rastrear alterações. Use estereótipos ou notas para indicar status (ex.: <<experimental>>, <<deprecated>>).
- **Documentação:** Adicione descrições textuais sucintas (notas ou legendas) aos diagramas, explicando o propósito de cada componente ou interface-chave. Anotações ajudam o entendimento (ex.: especificar tipo de interface ou tecnologia de serviço). Não economize documentação de “por que” e “como” o componente existe. Como recomenda um guia, deve-se documentar _continuamente_ o sistema.
- **Verificação de consistência:** Confira se todos os componentes e interfaces correspondem a elementos reais no código ou no plano de arquitetura. Cada interface requerida deve ter sua contraparte fornecedora em outro componente. Evite dependências não implementadas. Em UML, segundo recomendação: “Componentes _só devem depender de interfaces_”.

## 4. Comparação de ferramentas de modelagem

| Ferramenta                 | Recursos Principais                                                                                                                                   | Suporte UML / Diagramas                                                                                                                                                                 | Colaboração & Integração                                                                                                                                                                                             | Licença / Preço                                                                                                                                       | CI/CD & Geração de Código/Artefatos                                                                                                                                                                                                   |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **PlantUML**               | Ferramenta textual de desenho de diagramas UML. Modelagem rápida via DSL legível, fácil controle de versão, extensível. Suporte a notas, iconografia. | Suporta UML nativo (componentes, classes, seqüência, casos de uso, etc.) e outros tipos (diagramas de rede, Wireframe, Gantt). Menos ênfase em colaboração gráfica.                     | Não possui GUI; diagramas escritos como texto podem ser compartilhados em repositórios. Integra-se com diversas plataformas (DokuWiki, Markdown, Visual Studio Code, Confluence, etc.).                              | Gratuito e open source (licença BSD). Pode ser executado localmente (Java) ou via servidor online.                                                    | Fácil integração CI: arquivos .puml podem ser renderizados em pipelines (ex.: gerar PNG/SVG em builds). Não gera código-fonte, mas pode exportar diagramas em PNG/SVG/PDF.                                                            |
| **Lucidchart**             | Ferramenta web intuitiva de diagramação. Boa biblioteca UML, fluxo de trabalho visual e templates prontos. Foco em colaboração multiusuário.          | Oferece formas UML e outros diagramas técnicos, mas carece de inferência de modelo ou código. Não é focado em engenharia reversa, mas em diagramas rápidos.                             | Colaboração em tempo real (vários usuários editam simultaneamente). Comentários e histórico de revisões integrados. Integrações nativas com Google Drive, Atlassian, Microsoft Office etc. Exporta para SVG/PNG/PDF. | Modelo freemium: plano gratuito limitado (documentos públicos ou com restrições de objetos). Planos pagos (Pessoal, Equipe, Empresa) por usuário/mês. | Não gera código. Permite exportar XMI/PNG/SVG e incorporar diagramas em documentação online. Pode usar APIs (Scripts) para automatizar exportação (útil em CI de documentação).                                                       |
| **draw.io (diagrams.net)** | Editor de diagramas online/offline, open-source, ultra-simple. Bibliotecas UML disponíveis. Uso totalmente gratuito sem contas obrigatórias.          | Suporta símbolos UML (componentes, classes etc.) via biblioteca. Menos refino de engenharia do que ferramentas especializadas. Ideal para diagramas rápidos integrados em documentação. | Colaboração multiusuário em Confluence/Jira (plugin oficial). Edição em tempo real com cursores compartilhados. Integrações nativas com Google Drive, GitHub, Atlassian, VS Code etc..                               | Totalmente gratuito (licença Apache 2.0). Pode ser usado em nuvem ou on-premise sem custos.                                                           | Exporta diagramas para PNG, SVG, PDF (útil em pipelines de CI). Não gera código-fonte. Em projetos ágeis, pode ser usado para geração automática de diagramas a partir de arquivos XML. Plugins disponíveis para “plantuml” e outros. |

## 5. Para criar Diagramas de Componentes

- **PlantUML:** Crie um arquivo de texto (`.puml`) com as definições em DSL do PlantUML. Exemplo mínimo de diagrama de componentes:

  ```plantuml
  @startuml
    ' Define componentes com labels
    [User Interface] as UI
    [Business Logic] as BL
    [Database] as DB
    UI --> BL : requisita serviço
    BL --> DB : leitura/escrita
  @enduml
  ```

  Esse código, ao ser processado pelo PlantUML, gera o diagrama onde _UI_ depende de _BL_ e _BL_ de _DB_. Basta instalar o PlantUML (ex.: baixar `plantuml.jar`) ou usar serviço online. A simplicidade do PlantUML permite editar rapidamente o diagrama em texto e integrar ao ciclo de desenvolvimento.

- **draw.io (diagrams.net):** Acesse o editor (ex.: via Confluence, Jira ou app.diagrams.net). Selecione “Novo Diagrama” e escolha o template **UML** na galeria de formas. Arraste a forma “Componente” para a tela, clique duas vezes para renomear. Para adicionar interfaces, use os ícones de “Forma fornecida” (círculo) e “Forma requerida” (semicírculo) ou desenhe linhas com conectores de montagem. Conecte componentes com setas tracejadas (dependências). O draw.io é gratuito e permite colaboração em tempo real (vários usuários podem editar o mesmo diagrama). Após criar, use _Arquivo → Exportar_ para PNG/SVG/PDF, ou salve no repositório Git/Google Drive para controle de versão.

- **Lucidchart:** No Lucidchart, inicie um novo documento UML. Habilite a biblioteca de formas UML clicando em **Formas** e marcando _UML_. Arraste ícones de componente, porta e nó para desenhar sua arquitetura. Por exemplo, coloque um componente “WebApp” conectado a um componente “Banco de Dados” via dependência tracejada. Digite sobre cada forma para rotulá-la. O Lucidchart oferece modelos e templates prontos de diagramas de componentes; você pode começar de um modelo existente e adaptá-lo. Use guias laterais para editar propriedades (cores, fontes) e clique no botão **Compartilhar** para trabalhar em equipe. Quando terminar, exporte em PNG ou PDF.

## 10. Referências

- **Especificação UML (OMG):** _OMG Unified Modeling Language (UML) 2.5.1 Superstructure Specification_, formal (OMG, 2017). Define semântica e notação de componentes, interfaces, artefatos etc.
- **Lucidchart – Tutorial UML de Componentes (pt-BR):** Guia detalhado de símbolos, exemplos e melhores práticas para diagramas de componentes. Inclui exemplos como sistemas de biblioteca e ATM.
- **PlantUML Language Reference:** Documentação oficial do PlantUML (inclui suporte a diagramas de componente). Explica a sintaxe e filosofia textual.
- **GeeksforGeeks – _UML Component Diagram_:** Tutorial em inglês (Pratiksha Rathi) cobrindo símbolos e boas práticas resumidas. Útil para checklist básico.
- **draw.io (diagrams.net):** Documentação de características (gratuíto, open source, colaborações e integrações).
- **Artigos em Português:** _Nucleo de Architettura (NAU)_, Bruno Souza, “UML e padrões de projeto” (capítulos sobre componentes)

| Nome do Membro                              | Contribuição                              | Data       | Commit           |
| ------------------------------------------- | ----------------------------------------- | ---------- | ---------------- |
| [Gabriel Mota](https://github.com/Gabro-MO) | Adição do guia do Diagrama de Componentes | 17/09/2026 | [A por depois]() |
