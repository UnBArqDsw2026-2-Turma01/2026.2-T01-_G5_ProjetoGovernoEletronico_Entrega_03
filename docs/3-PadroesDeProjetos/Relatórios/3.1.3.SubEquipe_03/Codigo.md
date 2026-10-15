# Código | GoF Comportamental

## Localização

O mini-projeto independente desta subequipe fica em [`code/comportamental/`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/tree/main/code/comportamental), fora de `docs/`. Desenvolvido em React com Vite e TypeScript, com núcleo do padrão separado da interface.

## Mapeamento modelo-código

- **Padrão:** Strategy
- **Fluxo de origem:** Acesso à Rede de Saúde e Consulta de Conteúdo
- **Núcleo (`src/padrao/`):** TypeScript puro, sem dependência de React.
  - [`CriterioDeBusca.ts`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/tree/main/code/comportamental/src/padrao/CriterioDeBusca.ts) — papel `Strategy`: interface com `ordenar(estabelecimentos)`.
  - [`BuscaDeEstabelecimentos.ts`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/tree/main/code/comportamental/src/padrao/BuscaDeEstabelecimentos.ts) — papel `Context`: mantém o critério atual, permite trocá-lo (`definirCriterio`) e delega a ele a ordenação (`buscar`).
  - `PorDistancia.ts`, `PorNatureza.ts`, `PorCategoria.ts` — papel `ConcreteStrategy` (responsabilidade de Gabriel e Yasmim, ver [Participacao.md](./3-PadroesDeProjetos/Relatórios/3.1.3.SubEquipe_03/Participacao.md)).
- **Domínio (`src/dominio/`):** [`UnidadeDeSaude.ts`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/tree/main/code/comportamental/src/dominio/UnidadeDeSaude.ts) (tipo do domínio) e [`estabelecimentosSimulados.ts`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/tree/main/code/comportamental/src/dominio/estabelecimentosSimulados.ts) (dados simulados, sem chamada a API real).
- **Interface (`src/ui/`):** componentes React que apresentam a lista e o seletor de critério, chamando `BuscaDeEstabelecimentos` — responsabilidade de Yasmim.

A correspondência com o diagrama V1 (ver [GoFComportamental.md](./3-PadroesDeProjetos/Relatórios/3.1.3.SubEquipe_03/GoFComportamental.md?id=versão-1)) é direta: cada classe do código tem o mesmo nome do diagrama, sem adaptação.

## Testes

Testes unitários do núcleo em [`src/padrao/__tests__/BuscaDeEstabelecimentos.test.ts`](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/tree/main/code/comportamental/src/padrao/__tests__/BuscaDeEstabelecimentos.test.ts), rodados com Vitest:

- Delegação da ordenação ao critério atual.
- Troca de estratégia em tempo de execução.
- Não mutação da lista original recebida.
- A mesma lista recebida é repassada à estratégia, sem cópia intermediária (verificado com `vi.fn()`).
- Lista vazia retorna lista vazia.
- Ordenação correta com uma estratégia concreta real (critério de distância), confirmando o comportamento fim a fim do padrão.
- Uso do critério definido no construtor antes de qualquer troca.

Resultado: **7 testes, 7 passando** (`npm test`), `tsc -b --noEmit` e `oxlint` sem erros.

## Como executar

```bash
cd code/comportamental
npm install
npm run dev
npm test
npm run build
```

Teste de interface com React Testing Library e trecho do componente `ui/` ficam a cargo de Yasmim (responsabilidade dela, ver Participacao.md). O código fonte permanece na pasta `code/`; esta página apenas documenta e aponta para ele.

## Histórico de Versionamento

| Nome do Membro | Contribuição | Data | Commit |
| :--- | :--- | :--- | :--- |
| [Gustavo Fornaciari](https://github.com/GUGOFO) | Teamplate mais detalhado | 14/10/2026 | [7c66f78](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/tree/7c66f78dc795f080bc43dc01f094e8976462d5b8) |
| [Davi Ursulino de Oliveira](https://github.com/DaviUrsulino) | Implementação do núcleo do Strategy (CriterioDeBusca, BuscaDeEstabelecimentos), testes e documentação do mapeamento modelo-código | 15/10/2026 | *(preencher no commit)* |