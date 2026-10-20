# Código | GoF Comportamental

## Localização

O mini-projeto independente desta subequipe fica em [`code/comportamental/`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/tree/main/code/comportamental), fora de `docs/`. A aplicação é construída com React, Vite e TypeScript. O código do padrão Strategy está em `src/padrao/`, separado dos componentes de interface e dos dados de domínio.

A aplicação é demonstrativa: as telas utilizam dados mockados locais e não realizam chamadas a uma API real.

## Mapeamento modelo-código

- **Padrão:** Strategy.
- **Fluxos representados:** busca de redes de saúde e consulta de conteúdos.
- **Contextos:** `BuscaDeEstabelecimentos` e `BuscaDeConteudos` recebem um critério de busca, delegam a ordenação à estratégia selecionada e permitem substituir a estratégia durante a execução.

### Busca de redes de saúde

Núcleo em `src/padrao/`:

- [`CriterioDeBusca.ts`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/blob/main/code/comportamental/src/padrao/CriterioDeBusca.ts) - interface Strategy; define `ordenar(estabelecimentos)`.
- [`BuscaDeEstabelecimentos.ts`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/blob/main/code/comportamental/src/padrao/BuscaDeEstabelecimentos.ts) - papel Context; mantém o critério, permite trocá-lo com `definirCriterio` e delega a busca com `buscar`.
- [`PorNatureza.ts`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/blob/main/code/comportamental/src/padrao/PorNatureza.ts) - ordena pela prioridade municipal, estadual, pública e privada; desempata pela menor distância. A ordem pode ser configurada no construtor.
- [`PorDistancia.ts`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/blob/main/code/comportamental/src/padrao/PorDistancia.ts) - ordena pela distância crescente.
- [`PorCategoria.ts`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/blob/main/code/comportamental/src/padrao/PorCategoria.ts) - ordena alfabeticamente pela categoria, considerando a localidade `pt-BR`, e desempata pela menor distância.

As três estratégias de estabelecimentos são disponibilizadas à interface por [`criteriosDisponiveis.ts`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/blob/main/code/comportamental/src/ui/criteriosDisponiveis.ts).

### Busca de conteúdos

- [`conteudos/CriterioDeBusca.ts`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/blob/main/code/comportamental/src/padrao/conteudos/CriterioDeBusca.ts) - interface Strategy de conteúdos; define `ordenar(conteudos)`.
- [`BuscaDeConteudo.ts`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/blob/main/code/comportamental/src/padrao/BuscaDeConteudo.ts) - Context de busca de conteúdos. Exporta a classe `BuscaDeConteudos` e o alias `BuscaDeConteudo`; mantém o critério atual, oferece `definirCriterio` e delega a ordenação por `buscar`.
- [`conteudos/PorRelevancia.ts`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/blob/main/code/comportamental/src/padrao/conteudos/PorRelevancia.ts) - ordena por quantidade de acessos decrescente.
- [`conteudos/PorCategoria.ts`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/blob/main/code/comportamental/src/padrao/conteudos/PorCategoria.ts) - ordena alfabeticamente pela categoria, usando a localidade `pt-BR`.

As estratégias de conteúdo ficam no subdiretório `src/padrao/conteudos/`, pois seus contratos e critérios são distintos dos usados para estabelecimentos, apesar de alguns nomes de arquivo coincidirem.

## Domínio e dados mockados

- [`UnidadeDeSaude.ts`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/blob/main/code/comportamental/src/dominio/UnidadeDeSaude.ts) - tipo de domínio para unidades de saúde, com nome, natureza, categoria e distância; endereço, descrição, telefone e horário são campos opcionais.
- [`estabelecimentosSimulados.ts`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/blob/main/code/comportamental/src/dominio/estabelecimentosSimulados.ts) - conjunto-base de quatro unidades demonstrativas.
- [`redeDeSaudeSimulada.ts`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/blob/main/code/comportamental/src/dominio/redeDeSaudeSimulada.ts) - reúne os quatro registros-base e os complementa, formando 23 registros simulados. Os dados abrangem as 11 categorias apresentadas na interface: Médicos Especialistas, Hospital, Unidade Básica de Saúde, Maternidade, Atenção Psicossocial, Academia da Saúde, Saúde Bucal, Doenças Raras, Transplante, Serviços Hemoterápicos e Atendimento Antiveneno.
- [`Conteudo.ts`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/blob/main/code/comportamental/src/dominio/Conteudo.ts) - contrato comum de conteúdo, com texto, categoria e quantidade de acessos.
- [`ArtigoDeConteudo.ts`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/blob/main/code/comportamental/src/dominio/ArtigoDeConteudo.ts) - amplia o conteúdo com identificador, título, resumo, tema, etiquetas, imagem e texto alternativo.
- [`conteudosSimulados.ts`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/blob/main/code/comportamental/src/dominio/conteudosSimulados.ts) - contém nove artigos demonstrativos.
- `public/imagens/conteudos/` - imagens PNG e SVG utilizadas nos cartões de artigos.

Os nomes, contatos, distâncias e horários nos conjuntos simulados são demonstrativos e não devem ser considerados informações oficiais de atendimento.

## Interface e navegação

- [`App.tsx`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/blob/main/code/comportamental/src/App.tsx) - integra a sidebar, os dados simulados e as duas telas; inicia em “Minha saúde” e troca o conteúdo conforme a seção selecionada.
- [`Sidebar.tsx`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/blob/main/code/comportamental/src/ui/Sidebar.tsx) - navegação lateral inspirada no Meu SUS Digital. “Minha saúde” abre a busca de redes de saúde e “Conteúdos” abre a busca de artigos. “Início”, “Aplicações” e “Meu perfil” são opções demonstrativas desabilitadas.
- [`TelaRedeDeSaude.tsx`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/blob/main/code/comportamental/src/ui/TelaRedeDeSaude.tsx) - exibe unidades e serviços, permite pesquisar por nome, categoria, natureza, endereço, descrição, telefone e horário, filtrar pelas 11 categorias e alternar entre as estratégias de ordenação disponíveis. A pesquisa ignora diferenças entre maiúsculas, minúsculas e acentos.
- [`TelaBuscaDeConteudos.tsx`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/blob/main/code/comportamental/src/ui/TelaBuscaDeConteudos.tsx) - exibe artigos com categoria, etiquetas, resumo e imagem; permite pesquisar por título, categoria, tema, resumo, texto e etiquetas, filtrar por tema e escolher a ordenação por relevância ou categoria. A pesquisa ignora diferenças entre maiúsculas, minúsculas e acentos.
- `src/ui/Sidebar.css`, `src/ui/TelaRedeDeSaude.css`, `src/ui/TelaBuscaDeConteudos.css` e `src/App.css` - estilos da navegação, das telas e do layout responsivo.

As telas apresentam campos, categorias, cartões e estados vazios para quando não há resultados. Não existe integração com serviços externos no código do ZIP.

## Testes

O ZIP contém 11 arquivos de teste, com 50 declarações `it` distribuídas entre o núcleo Strategy, a interface e a navegação.

### Núcleo Strategy

- [`BuscaDeEstabelecimentos.test.ts`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/blob/main/code/comportamental/src/padrao/__tests__/BuscaDeEstabelecimentos.test.ts) - delegação à estratégia, troca do critério, lista vazia, preservação da entrada e uso de uma estratégia concreta.
- [`PorNatureza.test.ts`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/blob/main/code/comportamental/src/padrao/__tests__/PorNatureza.test.ts) - prioridade configurável das naturezas, desempate por distância, entrada vazia, preservação da lista e integração com os 23 registros simulados.
- [`PorDistancia.test.ts`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/blob/main/code/comportamental/src/padrao/__tests__/PorDistancia.test.ts) - ordenação crescente, cópia da lista e entrada vazia.
- [`PorCategoria.test.ts`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/blob/main/code/comportamental/src/padrao/__tests__/PorCategoria.test.ts) - ordenação por categoria, desempate por distância, cópia da lista e entrada vazia.
- [`BuscaDeConteudo.test.ts`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/blob/main/code/comportamental/src/padrao/__tests__/BuscaDeConteudo.test.ts) - delegação à estratégia de conteúdo, troca em tempo de execução e entrada vazia.
- `src/padrao/conteudos/__tests__/PorRelevancia.test.ts` e `src/padrao/conteudos/__tests__/PorCategoria.test.ts` - ordenação de conteúdos por acessos e por categoria.
- `src/padrao/__tests__/EstrategiasAdicionais.test.ts` - arquivo agrupado que também testa `PorDistancia`, as duas estratégias `PorCategoria`, `PorRelevancia` e o contexto `BuscaDeConteudo`. Ele permanece no ZIP além dos arquivos específicos acima, portanto há sobreposição entre alguns testes.

### Interface

- `src/__tests__/App.test.tsx` - alternância entre “Minha saúde” e “Conteúdos” pela sidebar.
- `src/ui/__tests__/TelaRedeDeSaude.test.tsx` - ordenação, filtros de categoria, pesquisa sem acentos, apresentação dos dados e presença das 11 categorias.
- `src/ui/__tests__/TelaBuscaDeConteudos.test.tsx` - listagem inicial, pesquisa sem acentos, filtro por tema, integração da estratégia `PorCategoria` e limpeza de filtros.

O ZIP inclui um cache do Vitest no qual as 11 suítes aparecem sem falhas na última execução registrada. A execução dos testes não pôde ser repetida durante esta revisão porque o `node_modules` empacotado não contém o binding nativo do Rolldown necessário no ambiente atual. Para validar em um ambiente de desenvolvimento, instale as dependências e execute os comandos da próxima seção.

## Como executar

A partir da raiz do repositório:

```bash
cd code/comportamental
npm install
npm run dev
```

Com as dependências instaladas, os comandos de verificação definidos em `package.json` são:

```bash
npm run test
npm run build
npm run lint
```

## Histórico de Versionamento

Os registros abaixo são os que já constavam no documento original.

| Nome do Membro                                               | Contribuição                                                                                                                          | Data       | Commit                                                                                                                                                   |
| :----------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ | :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Gustavo Fornaciari](https://github.com/GUGOFO)              | Template mais detalhado                                                                                                               | 14/10/2026 | [7c66f78](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/tree/7c66f78dc795f080bc43dc01f094e8976462d5b8)   |
| [Davi Ursulino de Oliveira](https://github.com/DaviUrsulino) | Implementação do núcleo do Strategy (`CriterioDeBusca`, `BuscaDeEstabelecimentos`), testes e documentação do mapeamento modelo-código | 15/10/2026 | [0403bc3](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/commit/0403bc3b776fedea710dfa2aa03967dd4a183041) |
| [Yasmim de Souza Santos](https://github.com/eii-yahs)        | Implementação da estratégia `PorNatureza`, dos dados simulados e da `TelaRedeDeSaude`, com testes | 17/10/2026 | [6aa613a](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/commit/6aa613af6223afd4744e14ebda817807fa48bc0e) |
| [Gabriel Mota](https://github.com/Gabro-MO)                  | adição das entidades do fluxo de conteúdos e modificação das outras entidades para apresentanção na pagina                            | 17/102026  | [ceb8172](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/commit/ceb8172b8cba2601aaa07f50196992adb890d75b) |
| [Gabriel Mota](https://github.com/Gabro-MO)                  | adição do codigo do fluxo de conteudos e adição das estrategias faltantes                                                             | 17/102026  | [fd62c72](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/commit/fd62c72033a30f3f37f437a0d76dbcaa79ff02e3) |
| [Gabriel Mota](https://github.com/Gabro-MO)                  | adição do frontend dos fluxos propostos                                                                                               | 17/102026  | [8287800](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/commit/828780099ec16df7de9226e303c3293974d2816d) |

