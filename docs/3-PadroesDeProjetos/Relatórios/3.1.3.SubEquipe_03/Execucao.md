# Execução do padrão | GoF Comportamental

## Demonstração

A demonstração deve mostrar o padrão **Strategy** em execução no fluxo **Acesso à Rede de Saúde e Consulta de Conteúdo**, usando o mini-projeto independente da subequipe.

- **Execução local:** seguir as instruções de [Codigo.md](./3-PadroesDeProjetos/Relatórios/3.1.3.SubEquipe_03/Codigo.md).
- **Modo offline:** `npm run build && npm run preview` testado previamente, sem chamadas a API real (dados simulados em `dominio/`).

### Trecho de Davi — núcleo (CriterioDeBusca, BuscaDeEstabelecimentos)

Demo isolada (fora de `src/ui/`) usando `BuscaDeEstabelecimentos.definirCriterio()`/`buscar()` direto, gravada trocando o critério em tempo de execução.

<video width="640" height="400" controls>
  <source src="/3-PadroesDeProjetos/Relatórios/assets/subequipe03-padroes/execucao/v1-nucleo-strategy-troca-criterio.webm" type="video/webm">
</video>

<center><strong>Legenda:</strong> Vídeo — troca de critério (distância → natureza → categoria → distância) via <code>BuscaDeEstabelecimentos</code>, núcleo real do padrão Strategy em execução.</center>

## Evidências

Resultado da suíte de testes automatizados do núcleo (`npm test` em `code/comportamental/`), que também comprova a execução do padrão:

```
 RUN  v5.0.4 code/comportamental

 Test Files  1 passed (1)
      Tests  7 passed (7)
```

Cobre: delegação da ordenação ao critério atual, troca de estratégia em tempo de execução, não mutação da lista original, repasse exato da referência à estratégia, lista vazia, ordenação real fim a fim e uso do critério inicial do construtor. Detalhamento em [Codigo.md](./3-PadroesDeProjetos/Relatórios/3.1.3.SubEquipe_03/Codigo.md#testes).

## Histórico de Versionamento

| Nome do Membro | Contribuição | Data | Commit |
| :--- | :--- | :--- | :--- |
| [Gustavo Fornaciari](https://github.com/GUGOFO) | Teamplate mais detalhado | 14/10/2026 | [7c66f78](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/tree/7c66f78dc795f080bc43dc01f094e8976462d5b8) |