# Guia dos 7 Padrões de Projeto GoF Estruturais

Os padrões estruturais do GoF ajudam a organizar classes e objetos para formar estruturas maiores, facilitando a manutenção, a reutilização de código e a integração entre diferentes partes de um sistema. Diferem dos padrões criacionais, que tratam da criação de objetos, e dos comportamentais, que tratam da comunicação e da distribuição de responsabilidades entre objetos.

Este guia apresenta os sete padrões estruturais do catálogo de Gamma et al. (1995), na ordem em que aparecem no livro. Para cada um, descreve o problema que resolve, seus principais elementos, um exemplo, as consequências de usá-lo e uma possível aplicação em um aplicativo de serviços de saúde.

## Visão geral

| Padrão | Problema que resolve | Ideia central |
| :--- | :--- | :--- |
| **Adapter** | Interfaces incompatíveis precisam trabalhar juntas. | Um intermediário traduz as chamadas de uma interface para outra. |
| **Bridge** | Uma classe varia em duas dimensões independentes. | Separa a abstração da implementação em duas hierarquias ligadas por composição. |
| **Composite** | Itens individuais e grupos de itens precisam ser tratados do mesmo modo. | Organiza objetos em árvore com uma interface comum a folhas e composições. |
| **Decorator** | É preciso acrescentar comportamento a um objeto sem alterar sua classe. | Envolve o objeto em outro que adiciona a funcionalidade. |
| **Facade** | Um subsistema com muitas classes é difícil de usar. | Oferece uma interface única e simples para o subsistema. |
| **Flyweight** | Um número muito grande de objetos semelhantes consome memória demais. | Compartilha o estado comum entre os objetos. |
| **Proxy** | O acesso a um objeto precisa ser controlado. | Um representante com a mesma interface decide quando encaminhar a chamada. |

### Como escolher

| Se o seu problema é... | Considere |
| :--- | :--- |
| "Preciso usar uma classe cuja interface não combina com a do meu sistema." | Adapter |
| "Tenho combinações demais de duas variações (por exemplo, tipo × canal)." | Bridge |
| "Tenho uma hierarquia parte-todo e não quero distinguir folha de grupo." | Composite |
| "Quero acrescentar comportamentos opcionais e combináveis a um objeto." | Decorator |
| "O cliente precisa conhecer classes demais para fazer uma tarefa simples." | Facade |
| "Crio milhares de objetos quase iguais e a memória é um problema real." | Flyweight |
| "Preciso verificar permissão, fazer cache ou adiar a criação de um objeto." | Proxy |

---

### 1. Adapter (Adaptador)

O padrão Adapter permite que duas classes com interfaces diferentes trabalhem juntas. Ele funciona como um intermediário, adaptando as chamadas de um componente para que sejam compatíveis com o restante do sistema.

**Principais elementos:**

- **Client:** utiliza o componente por meio de uma interface conhecida.
- **Target:** define a interface esperada pelo sistema.
- **Adaptee:** representa a classe existente cuja interface é incompatível.
- **Adapter:** adapta as chamadas da interface esperada para os métodos da classe existente.

**Exemplo:** imagine um sistema de controle de ponto que utiliza uma classe chamada `PointControl`. Ao integrar uma nova biblioteca, chamada `NewPointControl`, percebe-se que os métodos utilizados para registrar os horários são diferentes. Em vez de modificar todo o sistema, pode-se criar um `PointControlAdapter` para adaptar as chamadas antigas à nova biblioteca.

**Quando utilizar:** quando for necessário integrar bibliotecas externas, sistemas antigos ou componentes que oferecem funcionalidades úteis, mas possuem interfaces diferentes das esperadas.

**Consequências:** o sistema passa a depender apenas da interface esperada, e a classe original não precisa ser alterada. Em contrapartida, surge uma classe a mais e, se as interfaces forem muito diferentes, o adaptador pode ficar complexo.

**Possível uso em um aplicativo de serviços de saúde:** mini aplicativos integrados ao painel principal podem ter contratos diferentes entre si. Um adaptador para cada um permitiria que o painel os tratasse por uma interface única.

### 2. Bridge (Ponte)

O padrão Bridge separa uma abstração de sua implementação, de modo que as duas possam variar de forma independente. Em vez de uma hierarquia única que combina as duas dimensões, o padrão cria duas hierarquias ligadas por composição.

**Principais elementos:**

- **Abstraction:** define a interface de alto nível e mantém uma referência ao Implementor.
- **RefinedAbstraction:** estende a abstração com variações de comportamento.
- **Implementor:** define a interface das operações de baixo nível.
- **ConcreteImplementor:** implementa a interface do Implementor.

**Exemplo:** um sistema de notificações com `Notificacao` e `NotificacaoUrgente` (abstração) e os canais `EnvioEmail` e `EnvioSMS` (implementação). Qualquer tipo de notificação pode usar qualquer canal, sem criar uma subclasse para cada combinação.

**Quando utilizar:** quando uma classe varia em duas dimensões independentes e combiná-las por herança geraria muitas subclasses.

**Consequências:** as duas hierarquias evoluem separadamente, e a implementação pode ser trocada em tempo de execução. Em contrapartida, o projeto fica mais indireto e só compensa quando as duas dimensões realmente variam.

**Possível uso em um aplicativo de serviços de saúde (ilustração):** avisos de saúde (campanha, lembrete de vacina) que podem ser enviados por canais diferentes (notificação no aplicativo, SMS).

### 3. Composite

O padrão Composite organiza objetos em estruturas de árvore e permite que o cliente trate objetos individuais e composições da mesma forma, por meio de uma interface comum.

**Principais elementos:**

- **Component:** define a interface comum a folhas e composições.
- **Leaf:** representa o elemento sem filhos.
- **Composite:** guarda filhos do tipo Component e delega as operações a eles.
- **Client:** manipula a estrutura pela interface do Component.

**Exemplo:** em um sistema de arquivos, um arquivo é uma folha e uma pasta é um composto. Calcular o tamanho funciona do mesmo modo nos dois: o arquivo retorna o seu tamanho, e a pasta soma o tamanho dos seus filhos.

**Quando utilizar:** quando o domínio tem uma hierarquia parte-todo e o cliente não deve distinguir folhas de composições.

**Consequências:** o código do cliente fica simples e novos tipos de elemento entram sem alterar as classes existentes. Em contrapartida, a interface comum precisa definir operações que façam sentido para folhas e compostos, e é difícil restringir o que cada composto pode conter.

**Uso no projeto:** é o padrão escolhido pela SubEquipe 02, aplicado ao painel inicial de um aplicativo de serviços de saúde. `ElementoDeTela` é o componente, `CartaoDeAtalho` e `BannerInformativo` são folhas, `Secao` é o composto e `Dashboard` é o cliente que organiza as seções. Contar elementos, buscar por id e buscar por texto funcionam do mesmo modo em um cartão e em uma seção com vários níveis. Os detalhes estão em [GoF Estrutural](../../3-PadroesDeProjetos/Relatórios/3.1.2.SubEquipe_02/GoFEstrutural.md).

### 4. Decorator (Decorador)

O padrão Decorator permite adicionar funcionalidades a um objeto sem precisar modificar sua classe original. Isso é feito envolvendo o objeto com outro que acrescenta um comportamento específico.

**Principais elementos:**

- **Component:** define a interface comum aos objetos.
- **ConcreteComponent:** representa o objeto original.
- **Decorator:** mantém uma referência ao objeto que será decorado.
- **ConcreteDecorator:** adiciona uma funcionalidade específica ao objeto.

**Exemplo:** considere um sistema que exibe mapas. A classe `MapaBasico` apresenta apenas as informações essenciais. Com o uso de decoradores, é possível adicionar camadas de ruas ou de relevo por meio de classes como `MapaDecoradoComRuas` e `MapaDecoradoComRelevo`, sem alterar a implementação do mapa básico.

**Quando utilizar:** quando for necessário acrescentar funcionalidades de forma flexível, permitindo combinar diferentes comportamentos sem criar muitas subclasses.

**Consequências:** é mais flexível do que a herança, porque os comportamentos podem ser combinados em tempo de execução. Em contrapartida, aparecem muitos objetos pequenos parecidos, e a ordem em que os decoradores são aplicados pode alterar o resultado.

**Possível uso em um aplicativo de serviços de saúde (ilustração):** acrescentar a um cartão de atalho um selo de "novo" ou um contador de notificações, sem alterar a classe do cartão.

### 5. Facade (Fachada)

O padrão Facade simplifica o acesso a um subsistema que possui várias classes e operações. Em vez de exigir que o cliente conheça todos os componentes envolvidos, ele oferece uma interface única para realizar tarefas mais complexas.

**Principais elementos:**

- **Client:** solicita a execução de uma operação.
- **Facade:** centraliza e organiza as chamadas necessárias.
- **Subsystem Classes:** executam as operações específicas do subsistema.

**Exemplo:** em um sistema de viagens, o cliente poderia precisar interagir separadamente com as classes `Hotel`, `EmpresaAerea` e `PacoteExtra`. Com uma classe `AgenciaDeViagens`, essas operações podem ser reunidas em uma única chamada, simplificando a organização da reserva.

**Quando utilizar:** quando um sistema possui muitas classes interdependentes e é desejável oferecer uma maneira mais simples de utilizar suas funcionalidades.

**Consequências:** o cliente fica desacoplado do subsistema, que pode ser reorganizado com menos impacto. Em contrapartida, a fachada pode virar uma classe grande demais. Ela não impede o acesso direto ao subsistema, apenas oferece um caminho mais simples.

**Possível uso em um aplicativo de serviços de saúde:** um acesso simplificado à área de saúde pessoal do cidadão, reunindo vacinas, exames e medicamentos em uma única chamada.

### 6. Flyweight (Peso-Mosca)

O padrão Flyweight reduz o consumo de memória ao compartilhar objetos semelhantes, em vez de criar uma instância nova para cada uso. Ele separa o estado intrínseco (compartilhado) do estado extrínseco (fornecido pelo cliente).

**Principais elementos:**

- **Flyweight:** define a interface pela qual o objeto compartilhado recebe o estado extrínseco.
- **ConcreteFlyweight:** guarda o estado intrínseco e é compartilhado.
- **FlyweightFactory:** cria e reutiliza os flyweights.
- **Client:** mantém o estado extrínseco e obtém os objetos pela fábrica.

**Exemplo:** um editor de texto com milhares de caracteres. Cada letra reaproveita um único objeto `Caractere` (estado intrínseco: o glifo e a fonte), enquanto a posição na página (estado extrínseco) é passada em cada uso.

**Quando utilizar:** quando a aplicação precisa de um número muito grande de objetos semelhantes e o custo de memória é um problema real.

**Consequências:** reduz o uso de memória, mas torna o código mais complexo, porque o estado extrínseco precisa ser guardado e passado pelo cliente. Só vale a pena com muitos objetos, e o ganho deve ser medido.

**Possível uso em um aplicativo de serviços de saúde (ilustração):** muitos cartões poderiam compartilhar o mesmo objeto de ícone, enquanto o título e o link de cada cartão ficariam fora dele. Com poucos cartões, o padrão não se justifica.

### 7. Proxy (Procurador)

O padrão Proxy cria um objeto intermediário que controla o acesso a outro objeto. Ele possui uma interface compatível com a do objeto real, mas pode executar verificações ou outras operações antes de encaminhar a solicitação.

**Principais elementos:**

- **Subject:** define a interface compartilhada pelo objeto real e pelo proxy.
- **RealSubject:** executa a operação principal.
- **Proxy:** controla o acesso ao objeto real e decide quando encaminhar as chamadas.

**Exemplo:** em um sistema bancário, uma classe `ContaProxy` pode verificar as permissões de acesso antes de encaminhar uma solicitação à classe `ContaPadrao`. Assim, determinadas operações só são realizadas quando as condições necessárias são atendidas.

**Quando utilizar:** quando for necessário controlar permissões, registrar chamadas, armazenar resultados em cache ou adiar a criação de objetos que consomem muitos recursos.

**Consequências:** o controle de acesso fica separado do objeto real, que não precisa saber dele. Em contrapartida, cada chamada passa por um nível a mais de indireção e o sistema ganha mais uma classe.

**Possível uso em um aplicativo de serviços de saúde (ilustração):** um proxy que confere se o cidadão está autenticado e deu consentimento antes de encaminhar o pedido de histórico clínico.

---

## Referências Bibliográficas

GAMMA, Erich; HELM, Richard; JOHNSON, Ralph; VLISSIDES, John. **Design patterns: elements of reusable object-oriented software**. Reading, MA: Addison-Wesley, 1995.

LARMAN, Craig. **Utilizando UML e padrões: uma introdução à análise e ao projeto orientados a objetos**. 3. ed. Porto Alegre: Bookman, 2007.

SERRANO, Milene. **Arquitetura e desenho de software: aula GoFs estruturais**. Universidade de Brasília, Faculdade do Gama, [s. d.]. Material didático.

## Histórico de Versionamento

| Nome do Membro | Contribuição | Data | Commit |
| :--- | :--- | :--- | :--- |
| [Ana Beatriz](https://github.com/AnnaBeatrizAraujo) | Adição do guia de GoF Estrutural | 16/10/2026 | [b237eef](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/commit/b237eef) |
| [Julia Oliveira Patricio](https://github.com/juliapat18) | Inclusão de Bridge, Composite e Flyweight; tabela comparativa; consequências e exemplos de aplicação | 17/10/2026 | [484ba2e](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/commit/484ba2e) |