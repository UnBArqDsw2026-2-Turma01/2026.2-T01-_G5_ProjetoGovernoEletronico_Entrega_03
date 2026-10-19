# Guia de Padrões de Projeto em JavaScript e TypeScript

Os **padrões de projeto** são soluções reutilizáveis para problemas comuns de arquitetura e organização de código. Mesmo em linguagens dinâmicas como JavaScript/TypeScript, eles ajudam a manter o código limpo, desacoplado e fácil de entender - facilitando comunicação na equipe e manutenabilidade. 

A seguir apresentamos alguns padrões emergentes e modernos para **JavaScript** e **TypeScript**, explicando o conceito, contextualizando na arquitetura de software e mostrando um passo a passo de implementação simples. Cada padrão é ilustrado com código de exemplo (JS ou TS). As referências a seguir incluem artigos técnicos e tutoriais práticos em JS/TS.

## 1. Padrões em JavaScript

### 1.1. Module Pattern (Módulo)
**O que é:** Um padrão estrutural que encapsula código em módulos isolados. Permite criar funções privadas e expor apenas uma interface pública. Em aplicações, ajuda a manter o namespace limpo e organizar funcionalidades de forma modular.

**Por que usar:** Facilita a divisão do sistema em partes independentes (por exemplo, módulos de utilitários, serviços, etc.), evitando conflitos de variáveis globais.

**Passo a passo (Implementação com IIFE):**
1. **Crie uma IIFE (Immediately Invoked Function Expression)** para criar um escopo privado:  
   ```js
   const MeuModulo = (function() {
     // Estado privado
     let count = 0;
     // Função privada
     function incrementar() {
       count++;
       console.log("Contador:", count);
     }
     // Interface pública (API do módulo)
     return {
       incrementar: incrementar
     };
   })();
   ```
2. **Use o módulo externamente:**  
   ```js
   MeuModulo.incrementar();  // Contador: 1
   MeuModulo.incrementar();  // Contador: 2
   ```
3. **Observe:** A variável `count` e a função `incrementar` são privadas dentro do módulo; apenas a função exposta (`MeuModulo.incrementar`) fica visível externamente. Assim, **outros arquivos não acessam diretamente o estado interno**, seguindo princípios de encapsulamento.

Esse padrão (e sua variação *Revealing Module Pattern*) é amplamente usado em projetos que não usam ES6 modules, ou mesmo combiná-lo com módulos nativos. Ele ajuda a estruturar o código em **camadas ou subsistemas** na arquitetura, cada módulo cuidando de uma funcionalidade específica.

### 1.2. Observer (Publicação/Inscrição)
**O que é:** Padrão comportamental em que um objeto (sujeito) mantém uma lista de dependentes (observadores) e notifica todos quando ocorre um evento. Em JS, é como usar *EventEmitter* ou `addEventListener`. Permite criar sistemas reativos e desacoplados, em que componentes se comunicam via eventos.

**Por que usar:** Ideal para implementar **arquiteturas orientadas a eventos**, como UI reativa, notificações, ou comunicação entre módulos desacoplados. O observador notifica múltiplos consumidores sobre mudanças de estado.

**Passo a passo (Exemplo simples de Event Bus):**
1. **Crie um objeto para emitir eventos:**  
   ```js
   const EventBus = {
     handlers: {},
     subscribe(eventName, handler) {
       if (!this.handlers[eventName]) {
         this.handlers[eventName] = [];
       }
       this.handlers[eventName].push(handler);
     },
     emit(eventName, ...args) {
       const list = this.handlers[eventName] || [];
       list.forEach(fn => fn(...args));
     }
   };
   ```
2. **Registre observadores (subscribers):**  
   ```js
   EventBus.subscribe("dadosCarregados", (dados) => {
     console.log("Dados recebidos:", dados);
   });
   ```
3. **Emita eventos quando algo acontecer:**  
   ```js
   // Simula carregamento de dados
   setTimeout(() => {
     const resultado = { user: "João", idade: 30 };
     EventBus.emit("dadosCarregados", resultado);
   }, 1000);
   ```
4. **Veja a saída:**  
   ```
   Dados recebidos: { user: "João", idade: 30 }
   ```
5. **Observe:** Vários componentes podem se inscrever (subscribe) no mesmo evento e serão notificados quando `emit` for chamado. Isso implementa o padrão Observer ou Pub/Sub, permitindo que o código **reaja a mudanças** sem acoplamento direto. Em grande escala, bibliotecas como RxJS fornecem implementações avançadas de reatividade baseadas nesse padrão.

Este padrão é *onipresente* em interfaces gráficas e aplicações reativas. Por exemplo, `addEventListener` no DOM e hooks reativos do React (como `useEffect`) seguem a mesma ideia: desencadear ações quando algo muda no sistema.

### 1.3. Strategy
**O que é:** Padrão comportamental que define uma família de algoritmos ou comportamentos intercambiáveis. Em vez de usar `if/else` ou `switch` para escolher lógicas, você encapsula cada variação em uma função ou objeto separado, escolhendo dinamicamente qual usar em tempo de execução.

**Por que usar:** Facilita adicionar novos comportamentos sem alterar o código cliente. Por exemplo, calcular preços de frete, processos de pagamento, ou regras de negócio que variam por contexto. Washington Pires destaca que *“Strategy é útil para qualquer coisa que tenha múltiplas formas de fazer a mesma coisa”*, pois permite trocar a implementação sem modificar quem a consome.

**Passo a passo (Exemplo de estratégia de desconto):**
1. **Defina as estratégias como funções separadas:**  
   ```js
   function descontoBlackFriday(preco) {
     return preco * 0.5;  // 50% de desconto
   }
   function descontoNatal(preco) {
     return preco * 0.8;  // 20% de desconto
   }
   function semDesconto(preco) {
     return preco;       // 0% de desconto
   }
   ```
2. **Uma função para aplicar a estratégia desejada:**  
   ```js
   function aplicarDesconto(preco, estrategia) {
     return estrategia(preco);
   }
   ```
3. **Escolha a estratégia dinamicamente:**  
   ```js
   const precoOriginal = 100;
   const precoComDesconto = aplicarDesconto(precoOriginal, descontoBlackFriday);
   console.log(precoComDesconto); // 50
   ```
4. **Crie um “contexto” ou variável para a estratégia:**  
   ```js
   const hoje = new Date();
   let estrategia;
   if (hoje.getMonth() === 10) { // Novembro (mês 10)
     estrategia = descontoBlackFriday;
   } else {
     estrategia = semDesconto;
   }
   console.log(aplicarDesconto(200, estrategia));
   ```
5. **Observe:** Sem alterar `aplicarDesconto`, você pode trocar qual função de desconto usar. Esse padrão evita condicionais complexas no cliente e segue a ideia de “**trocar de algoritmo em tempo de execução**”. Arquiteticamente, o Strategy ajuda a manter o código aberto para extensão (novas estratégias) e fechado para modificação (não mexe em código existente).

### 1.4. Factory Method
**O que é:** Padrão criacional que fornece uma interface para criar objetos, deixando que subclasses ou funções configuráveis decidam qual classe instanciar. Em JS, geralmente é uma *factory function* ou método que retorna diferentes objetos conforme parâmetros.

**Por que usar:** Centraliza e padroniza a criação de objetos complexos ou variantes. Facilita adicionar novos tipos sem espalhar `new` pelo código e isola a lógica de construção. No artigo FreeCodeCamp observamos que o Factory “centraliza o código de criação em um único lugar, simplificando e organizando melhor nosso código”.

**Passo a passo (Exemplo simples de Factory):**
1. **Defina classes ou construtores para cada tipo de objeto:**  
   ```js
   class Carro {
     constructor(placa) {
       this.tipo = "Carro";
       this.placa = placa;
     }
   }
   class Moto {
     constructor(placa) {
       this.tipo = "Moto";
       this.placa = placa;
     }
   }
   ```
2. **Implemente a *factory function*:**  
   ```js
   function VeiculoFactory(tipo, placa) {
     if (tipo === "carro") {
       return new Carro(placa);
     } else if (tipo === "moto") {
       return new Moto(placa);
     }
     throw new Error("Tipo de veículo desconhecido");
   }
   ```
3. **Use a factory para criar instâncias:**  
   ```js
   const veiculo1 = VeiculoFactory("carro", "ABC-1234");
   const veiculo2 = VeiculoFactory("moto", "XYZ-5678");
   console.log(veiculo1.tipo); // "Carro"
   console.log(veiculo2.tipo); // "Moto"
   ```
4. **Observe:** A função `VeiculoFactory` decide qual classe instanciar sem que o código cliente precise usar `new` diretamente. Novos tipos podem ser adicionados alterando só a factory, não o código que consome veículos. Isso segue o *Open/Closed Principle* - aberto para extensão (novos veículos), fechado para modificação (código cliente não muda).

### 1.5. Singleton
**O que é:** Garante que uma classe (ou objeto) tenha apenas uma única instância em toda aplicação, provendo um ponto de acesso global a essa instância. Em JS, isso pode ser feito congelando (freeze) um objeto literal ou usando um módulo/classe com lógica de instanciação única.

**Por que usar:** Útil para armazenar configurações globais, conexões únicas (como conexão de banco) ou qualquer recurso que deve existir apenas uma vez. Por exemplo, um objeto de configuração centralizado.

**Passo a passo (Exemplo com objeto congelado):**
1. **Crie o objeto único e congele-o:**  
   ```js
   const Config = {
     apiUrl: "https://api.exemplo.com",
     timeout: 5000,
     atualizarTimeout(novo) {
       this.timeout = novo;
     }
   };
   Object.freeze(Config); // impede adicionar ou modificar propriedades
   ```
2. **Use o singleton em outros módulos:**  
   ```js
   console.log(Config.apiUrl); // https://api.exemplo.com
   Config.atualizarTimeout(3000);
   console.log(Config.timeout); // 3000
   Config.name = "Teste";      // não tem efeito, pois está congelado
   console.log(Config.name);   // undefined
   ```
3. **Observe:** O objeto `Config` age como uma instância única e imutável (exceto métodos internos). Qualquer parte da aplicação que importar/usar `Config` verá a mesma instância. Como a FreeCodeCamp menciona, *“Singleton garante que uma classe tenha apenas uma instância”*. Em projetos de front-end, frameworks (Angular, React com contextos, etc.) também oferecem formas de injetar singletons.

## 2. Padrões em TypeScript

O TypeScript estende o JS com tipos e classes, permitindo aplicar os mesmos padrões de forma tipada, às vezes com sintaxe mais formal (classes, interfaces, decorators). Abaixo, alguns padrões importantes usando recursos do TS.

### 2.1. Singleton (com classe TypeScript)
Em TS, podemos implementar Singleton usando uma classe com construtor privado e um método estático. Isso reforça o padrão com a tipagem do TS.

**Passo a passo:**
1. **Defina a classe com construtor privado e instância estática:**  
   ```ts
   class Database {
     private static instance: Database;
     // Propriedades do banco de dados (ex.: conexão)
     private constructor() {
       console.log("Conectando ao banco de dados...");
     }
     public static getInstance(): Database {
       if (!Database.instance) {
         Database.instance = new Database();
       }
       return Database.instance;
     }
     public query(sql: string) {
       console.log(`Executando query: ${sql}`);
     }
   }
   ```
2. **Use o singleton no código:**  
   ```ts
   const db1 = Database.getInstance();
   const db2 = Database.getInstance();
   console.log(db1 === db2); // true (mesma instância)
   db1.query("SELECT * FROM users");
   ```
3. **Observe:** Como o construtor é `private`, não é possível usar `new Database()` externamente. A única forma de obter uma instância é pelo método `getInstance`, que garante criar apenas uma vez. Esse padrão é útil em TS para recursos globais do app, mantendo tipagem e encapsulamento de estado. Também ajuda a estabelecer um ponto único de configuração em arquiteturas maiores.

### 2.2. Factory (com interfaces)
Em TS, podemos usar *interfaces* para definir tipos e depois criar fábricas que retornam instâncias conforme a interface, reforçando a decoupling.

**Passo a passo:**
1. **Crie uma interface e classes que a implementam:**  
   ```ts
   interface Animal {
     nome: string;
     falar(): void;
   }
   class Cachorro implements Animal {
     constructor(public nome: string) {}
     falar() { console.log(`${this.nome} diz: Au Au!`); }
   }
   class Gato implements Animal {
     constructor(public nome: string) {}
     falar() { console.log(`${this.nome} diz: Miau!`); }
   }
   ```
2. **Implemente a factory usando a interface:**  
   ```ts
   function animalFactory(tipo: "cachorro" | "gato", nome: string): Animal {
     if (tipo === "cachorro") {
       return new Cachorro(nome);
     } else {
       return new Gato(nome);
     }
   }
   ```
3. **Use a factory tipada:**  
   ```ts
   const pet1 = animalFactory("cachorro", "Rex");
   const pet2 = animalFactory("gato", "Whiskers");
   pet1.falar(); // "Rex diz: Au Au!"
   pet2.falar(); // "Whiskers diz: Miau!"
   ```
4. **Observe:** Mesmo com tipagem TS, a factory retorna `Animal`, abstraindo a classe concreta. O código cliente só conhece a interface `Animal`, podendo usar qualquer implementação. Esse padrão se integra bem em arquiteturas modulares, por exemplo em frameworks que injetam dependências com base em tipo.

### 2.3. Observer (usando EventEmitter)
Em TS (ou JS), podemos usar a classe `EventEmitter` do Node.js ou bibliotecas similares para o padrão Observer. Aqui mostraremos um exemplo simples com tipos.

**Passo a passo:**
1. **Crie um evento personalizado:**  
   ```ts
   type Handler = (message: string) => void;
   class Mensageiro {
     private listeners: Handler[] = [];
     subscribe(fn: Handler) {
       this.listeners.push(fn);
     }
     notify(msg: string) {
       this.listeners.forEach(fn => fn(msg));
     }
   }
   ```
2. **Registre observadores:**  
   ```ts
   const mensageiro = new Mensageiro();
   mensageiro.subscribe(msg => console.log("Receptor1 recebeu:", msg));
   mensageiro.subscribe(msg => console.log("Receptor2 recebeu:", msg));
   ```
3. **Dispare um evento (notifique):**  
   ```ts
   mensageiro.notify("Olá, mundo!");
   ```
4. **Saída esperada:**  
   ```
   Receptor1 recebeu: Olá, mundo!
   Receptor2 recebeu: Olá, mundo!
   ```
5. **Observe:** Cada função registrada em `listeners` é chamada quando `notify` é acionado. Esse é o padrão Observer clássico. Em TypeScript, a tipagem garante que todos os *listeners* recebam o tipo correto (aqui `string`). O exemplo [33] ilustra como comandos ou eventos são encapsulados e disparados em um sistema, um uso comum em arquiteturas UI ou sistemas de mensageria.

### 2.4. Decorator (com decoradores TS)
O TypeScript suporta *decoradores* (forma experimental aprovada em ES.next) para classes e métodos, que permitem adicionar comportamento de forma declarativa. Esse conceito implementa o padrão Decorator: envolver uma classe ou função com código adicional sem alterar sua lógica interna.

**Passo a passo (Exemplo de decorador de método):**
1. **Habilite `experimentalDecorators` no `tsconfig.json`.**
2. **Crie um decorator de método que registra a chamada:**  
   ```ts
   function logarExecucao(
     target: any, 
     propertyKey: string, 
     descriptor: PropertyDescriptor
   ) {
     const metodoOrig = descriptor.value;
     descriptor.value = function (...args: any[]) {
       console.log(`Chamando ${propertyKey} com`, args);
       const resultado = metodoOrig.apply(this, args);
       console.log(`Resultado de ${propertyKey}:`, resultado);
       return resultado;
     };
   }
   ```
3. **Use o decorator em uma classe:**  
   ```ts
   class Calculadora {
     @logarExecucao
     somar(a: number, b: number): number {
       return a + b;
     }
   }
   const calc = new Calculadora();
   calc.somar(5, 3);
   ```
4. **Saída:**  
   ```
   Chamando somar com [5, 3]
   Resultado de somar: 8
   ```
5. **Observe:** O decorador intercepta chamadas ao método `somar` e adiciona logs antes e depois da execução. Na arquitetura, isso demonstra como aplicar *cross-cutting concerns* (preocupações transversais, como logging, autorização, caches) sem modificar o corpo principal dos métodos - só envolvendo-os. Decoradores em TS são amplamente usados em frameworks (por exemplo, `@Injectable`, `@Component` no Angular) para aplicar padrões de projeto e injeção de dependência de forma declarativa.

### 2.5. Adapter / Facade
Embora não tão específicos do TS, padrões como **Adapter** (adaptador) e **Facade** (fachada) são importantes em arquiteturas JavaScript modernas, especialmente quando integrando bibliotecas ou subsistemas diversos. 

- **Adapter:** traduz uma interface existente para outra compatível. Por exemplo, adaptar uma API externa para o formato usado no seu sistema. Em TS, isso pode ser feito implementando uma interface comum e internamente usando a API externa.
- **Facade:** expõe uma interface simplificada sobre um subsistema complexo. Por exemplo, criar um objeto que encapsula chamadas a vários micro-serviços ou módulos, expondo apenas os métodos de alto nível que seu app precisa.

**Como aplicar:** Identifique partes do sistema que são complexas ou mudam frequentemente. Implemente classes intermediárias (com tipos TS claros) que sirvam de ponte entre o código da aplicação e esses subsistemas. Isso isola mudanças e simplifica o uso.

## Conclusão e Recomendações

- **Use padrões quando fizer sentido real:** Não adote um padrão só por ser "existe" - observe problemas recorrentes (por exemplo, necessidade de notificar vários componentes, de trocar comportamento, de centralizar criação de objetos) e então aplique o padrão apropriado. 
- **Mantenha o código simples:** Padrões são ferramentas de arquitetura, não obrigações. Evite encher demais o projeto com padrãos desnecessarios. 
- **Decupagem e manutenibilidade:** Em projetos grandes, padrões como **Observer**, **Strategy** e **Factory** ajudam a separar responsabilidades e facilitar testes. Por exemplo, o uso de Observer permite uma arquitetura reativa, enquanto Strategy desacopla regras de negócio voláteis.
- **Em TypeScript, aproveite a tipagem:** Use interfaces, classes abstratas e genéricos para reforçar os contratos dos padrões (por exemplo, uma interface `Command` ou `Observer`). Decoradores e injeção de dependência (por exemplo, em NestJS) são implementações modernas de padrões clássicos.

Em resumo, entender esses padrões e saber **quando e como aplicá-los** torna sua arquitetura mais robusta e comunica melhor as intenções do código. Os exemplos acima fornecem um ponto de partida para implementar cada um, mas explore as referências para aprofundar os detalhes e adaptações que sua aplicação específica exigir.

## Referências

COCCA, German. **JavaScript Design Patterns – Explained with Examples**. *freeCodeCamp*, 22 jun. 2022. Disponível em: https://www.freecodecamp.org/news/javascript-design-patterns-explained/. Acesso em: 18 out. 2026.

OSMANI, Addy. **Aprendendo padrões de projeto JavaScript**. Tradução de Eric Oliveira. *GitHub*, [s. d.]. Disponível em: https://github.com/fhferreira/aprendendo-padroes-de-projeto-javascript. Acesso em: 18 out. 2026.

PATEL, Devan. **JavaScript Design Patterns**. *DigitalOcean*, [s. d.]. Série de tutoriais. Disponível em: https://www.digitalocean.com/community/tutorial_series/javascript-design-patterns. Acesso em: 18 out. 2026.

REFACTORING.GURU. **Command in TypeScript: Design Patterns**. [S. l.], [s. d.]. Disponível em: https://refactoring.guru/design-patterns/command/typescript/example. Acesso em: 18 out. 2026.

REFACTORING.GURU. **Design Patterns in TypeScript**. [S. l.], [s. d.]. Disponível em: https://refactoring.guru/design-patterns/typescript. Acesso em: 18 out. 2026.

| [Gabriel Mota](https://github.com/Gabro-MO)     | Adição da iniciativa extra de Padrões de Projeto em JavaScript e TypeScript | 18/10/2026 | [a01933c](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/commit/a01933c5524a4cbc09c8857078f9a6e221a2ae9d) |