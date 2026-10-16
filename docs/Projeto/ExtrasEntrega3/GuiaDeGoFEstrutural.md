
# Guia dos 7 Padrões de Projeto GoF Estruturais

Os padrões estruturais do GoF ajudam a organizar classes e objetos para formar estruturas maiores, facilitando a manutenção, a reutilização de código e a integração entre diferentes partes de um sistema.

Cada padrão apresenta uma forma de resolver problemas comuns de organização do software. A seguir, são apresentados os sete padrões estruturais, seus principais elementos, exemplos de aplicação e situações em que podem ser utilizados.

### 1. Adapter (Adaptador)

O padrão Adapter permite que duas classes com interfaces diferentes trabalhem juntas. Ele funciona como um intermediário, adaptando as chamadas de um componente para que sejam compatíveis com o restante do sistema.

**Principais elementos:**

- **Client:** utiliza o componente por meio de uma interface conhecida.
- **Target:** define a interface esperada pelo sistema.
- **Adaptee:** representa a classe existente cuja interface é incompatível.
- **Adapter:** adapta as chamadas da interface esperada para os métodos da classe existente.

**Exemplo:** imagine um sistema de controle de ponto que utiliza uma classe chamada `PointControl`. Ao integrar uma nova biblioteca, chamada `NewPointControl`, percebe-se que os métodos utilizados para registrar os horários são diferentes. Em vez de modificar todo o sistema, pode-se criar um `PointControlAdapter` para adaptar as chamadas antigas à nova biblioteca.

**Quando utilizar:** quando for necessário integrar bibliotecas externas, sistemas antigos ou componentes que oferecem funcionalidades úteis, mas possuem interfaces diferentes das esperadas.

### 2. Decorator (Decorador)

O padrão Decorator permite adicionar funcionalidades a um objeto sem precisar modificar sua classe original. Isso é feito envolvendo o objeto com outro que acrescenta um comportamento específico.

**Principais elementos:**

- **Component:** define a interface comum aos objetos.
- **ConcreteComponent:** representa o objeto original.
- **Decorator:** mantém uma referência ao objeto que será decorado.
- **ConcreteDecorator:** adiciona uma funcionalidade específica ao objeto.

**Exemplo:** considere um sistema que exibe mapas. A classe `MapaBasico` apresenta apenas as informações essenciais. Com o uso de decoradores, é possível adicionar camadas de ruas ou de relevo por meio de classes como `MapaDecoradoComRuas` e `MapaDecoradoComRelevo`, sem alterar a implementação do mapa básico.

**Quando utilizar:** quando for necessário acrescentar funcionalidades de forma flexível, permitindo combinar diferentes comportamentos sem criar muitas subclasses.

### 3. Facade (Fachada)

O padrão Facade simplifica o acesso a um subsistema que possui várias classes e operações. Em vez de exigir que o cliente conheça todos os componentes envolvidos, ele oferece uma interface única para realizar tarefas mais complexas.

**Principais elementos:**

- **Client:** solicita a execução de uma operação.
- **Facade:** centraliza e organiza as chamadas necessárias.
- **Subsystem Classes:** executam as operações específicas do subsistema.

**Exemplo:** em um sistema de viagens, o cliente poderia precisar interagir separadamente com as classes `Hotel`, `EmpresaAerea` e `PacoteExtra`. Com uma classe `AgenciaDeViagens`, essas operações podem ser reunidas em uma única chamada, simplificando a organização da reserva.

**Quando utilizar:** quando um sistema possui muitas classes interdependentes e é desejável oferecer uma maneira mais simples de utilizar suas funcionalidades.

### 4. Proxy (Procurador)

O padrão Proxy cria um objeto intermediário que controla o acesso a outro objeto. Ele possui uma interface compatível com a do objeto real, mas pode executar verificações ou outras operações antes de encaminhar a solicitação.

**Principais elementos:**

- **Subject:** define a interface compartilhada pelo objeto real e pelo proxy.
- **RealSubject:** executa a operação principal.
- **Proxy:** controla o acesso ao objeto real e decide quando encaminhar as chamadas.

**Exemplo:** em um sistema bancário, uma classe `ContaProxy` pode verificar as permissões de acesso antes de encaminhar uma solicitação à classe `ContaPadrao`. Assim, determinadas operações só são realizadas quando as condições necessárias são atendidas.

**Quando utilizar:** quando for necessário controlar permissões, registrar chamadas, armazenar resultados em cache ou adiar a criação de objetos que consomem muitos recursos.

## Referências Bibliográficas

GAMMA, Erich; HELM, Richard; JOHNSON, Ralph; VLISSIDES, John. **Design patterns: elements of reusable object-oriented software**. Reading, MA: Addison-Wesley, 1995.

LARMAN, Craig. **Utilizando UML e padrões: uma introdução à análise e ao projeto orientados a objetos**. 3. ed. Porto Alegre: Bookman, 2007.

SERRANO, Milene. **Arquitetura e desenho de software: aula GoFs estruturais**. Universidade de Brasília, Faculdade do Gama, [s. d.]. Material didático.

## Histórico de Versionamento

| Nome do Membro | Contribuição | Data | Commit |
| :--- | :--- | :--- | :--- |
| [Ana Beatriz](https://github.com/AnnaBeatrizAraujo) | Adição do guia de GoF estrutural — Parte 1 | 16/10/2026 | |

