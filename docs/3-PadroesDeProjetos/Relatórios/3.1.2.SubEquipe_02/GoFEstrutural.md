# GoF Estrutural | Composite

## Figma / Miro Usado

<iframe 
  width="768" 
  height="432" 
  src="" 
  frameborder="0" 
  scrolling="no" 
  allow="fullscreen; clipboard-read; clipboard-write" 
  allowfullscreen>
</iframe>

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

[PREENCHER] Explique brevemente qual é o propósito dos padrões GoF Estruturais e o que os diferencia das demais categorias.

### O Padrão Escolhido

* **Nome e classificação:** Composite — GoF Estrutural.
* **Intenção:** compor objetos em estruturas de árvore e permitir que clientes tratem objetos individuais e composições de maneira uniforme.
* **Problema que resolve:** representar um dashboard com seções que contêm cartões sem duplicar a lógica de renderização e consulta.
* **Solução proposta:** definir `ElementoDeTela` como componente comum, `CartaoDeAtalho` como folha, `Secao` como composto e `Dashboard` como raiz.
* **Estrutura e participantes do padrão:** `ElementoDeTela`, `CartaoDeAtalho`, `Secao` e `Dashboard`.
* **Consequências (vantagens e desvantagens):** uniformiza operações recursivas e facilita adicionar componentes; pode tornar o desenho mais geral e exigir cuidado com operações válidas para folhas e compostos.
* **Quando usar:** quando o dashboard precisa organizar seções e cartões hierarquicamente e executar operações uniformes sobre toda a árvore.

---

## Contexto de Aplicação no Projeto

### Onde o Padrão foi Aplicado

O padrão é aplicado à Navegação Principal e ao Dashboard Pós-Login do Meu SUS Digital. O dashboard contém seções como Minha Saúde, Mini apps e Conteúdo, cada uma com cartões de atalho. A árvore permite renderizar recursivamente, contar itens e buscar cartões com uma interface comum.

### Rastreabilidade e Elos com Outros Artefatos

| Artefato relacionado | Link | Relação com o padrão |
| :--- | :--- | :--- |
| [PREENCHER: ex. diagrama de classes da Modelagem] | [PREENCHER: link](https://link) | [PREENCHER] |
| [PREENCHER: ex. requisito ou fluxo da Base] | [PREENCHER: link](https://link) | [PREENCHER] |

---

## Modelagem

### Versão 1

![Imagem Versão 1](../assets/subequipe02-padroes/versao-1.png)

<center><strong>Legenda:</strong> [PREENCHER: legenda da imagem]</center>

[PREENCHER] Explique o que foi feito e por que, quais elementos UML foram usados e como o modelo representa o padrão aplicado ao projeto.

### Versão 2

![Imagem Versão 2](../assets/subequipe02-padroes/versao-2.png)

<center><strong>Legenda:</strong> [PREENCHER: legenda da imagem]</center>

[PREENCHER] O que foi modificado e por que foi modificado.

### Versão 3

![Imagem Versão 3](../assets/subequipe02-padroes/versao-3.png)

<center><strong>Legenda:</strong> [PREENCHER: legenda da imagem]</center>

[PREENCHER] O que foi modificado e por que foi modificado.

---

## Metodologia

[PREENCHER] Explicar qual a metodologia seguida pela equipe para fazer este trabalho (modelagem, código e execução) e, caso tenha alguma particularidade, explicar ela.

"Seguindo a geral e --extra da subequipe--..."

Registros do trabalho em equipe (atas, vídeos de reuniões, checklists): [PREENCHER: links]

---

### Embasamento teórico para criação:

1. [PREENCHER: referência no padrão ABNT, ex.: GAMMA, Erich et al. Padrões de Projeto: soluções reutilizáveis de software orientado a objetos. Porto Alegre: Bookman, 2000.]
2. [PREENCHER]

---

## Histórico de Versionamento

| Nome do Membro | Contribuição | Data | Commit |
| :--- | :--- | :--- | :--- |
| [Gustavo Fornaciari](https://github.com/GUGOFO) | Inicio do Teamplate do trabalho | 06/10/2026 | [18b6195](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/tree/18b61958e419b67f95469d4a704ddcb9629b9803) |
| [Gustavo Fornaciari](https://github.com/GUGOFO) | Teamplate mais detalhado | 14/10/2026 | [7c66f78](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/tree/7c66f78dc795f080bc43dc01f094e8976462d5b8) |