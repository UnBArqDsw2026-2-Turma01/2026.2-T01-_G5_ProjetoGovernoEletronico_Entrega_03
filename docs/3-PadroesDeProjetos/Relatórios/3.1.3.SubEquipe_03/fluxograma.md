# Fluxo Selecionado para os Padrões de Projeto

---

## Participantes da SubEquipe 03

| Nome do Membro                                               |
| :----------------------------------------------------------- |
| [Davi Ursulino de Oliveira](https://github.com/DaviUrsulino) |
| [Gabriel Mota Oliveira](https://github.com/Gabro-MO)         |
| [Yasmim de Souza Santos](https://github.com/eii-yahs)        |

---

## Mapeamento do Fluxo

### Nome do Fluxo

Acesso à Rede de Saúde e Consulta de Conteúdo

### Origem e Justificativa da Escolha

O fluxo veio dos _Rich Picture_, um fluxo de Redes de Saúde e outro de Consultas de Conteúdo, que fizemos para a primeira entrega da materia.

- **Artefato de origem:**
  - [Rich Picture do Fluxo de Redes de Saúde](../../../1-DesenhoDeSoftware/Relatórios/1.1.3.SubEquipe_03/RichPicture.md#rich-picture---fluxo-rede-de-saude)
  - [Rich Picture do Fluxo de Consulta de Conteúdos](../../../1-DesenhoDeSoftware/Relatórios/1.1.3.SubEquipe_03/RichPicture.md#rich-picture---fluxo-conteudo)

- **Motivo da escolha:** Ele foi escolhido pois é o que melhor permite visualizar as estratégias concretas para o _GoF_ Comportamental, usando o padrão _Strategy_.

### Passo a Passo dos Fluxos

#### Redes de Saúde

| Nº  | Ação                          | Descrição                                                                                                                                |
| --- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Acessa o site                 | Usuário entra na plataforma Meu SUS Digital                                                                                              |
| 2   | Realiza autenticação          | Sistema encaminha o usuário para o login via gov.br, o usuário preenche os dados de login e envia                                        |
| 3   | Acessa o menu principal       | Sistema retorna o Usuário ao menu principal já autenticado                                                                               |
| 4   | Acessa redes de saúde         | Usuário navega até a seção de busca de estabelecimentos                                                                                  |
| 5   | Seleciona estrategia de busca | Usuário escolhe a estrategia (por distancia, natureza, categoria)                                                                        |
| 6   | Solicita acesso à localização | Sistema pede permissão de geolocalização e o usuário autoriza                                                                            |
| 7   | Visualiza os resultados       | Lista de estabelecimentos compatíveis é exibida                                                                                          |
| 8   | consulta detalhes             | Usuário solicita mais informações sobre uma rede e visualiza um detalhamento das especialidades/serviços oferecidos pelo estabelecimento |
| 9   | Pede para ver no mapa         | Usuário solicita visualização geográfica do local e é redireciona para o sistema/app externo, de mapas, integrado onde pode ver as rotas |

#### Consultas de Conteúdo

| Nº  | Ação                          | Descrição                                                                                         |
| --- | ----------------------------- | ------------------------------------------------------------------------------------------------- |
| 1   | Acessa o site                 | Usuário entra na plataforma Meu SUS Digital                                                       |
| 2   | Realiza autenticação          | Sistema encaminha o usuário para o login via gov.br, o usuário preenche os dados de login e envia |
| 3   | Acessa o menu principal       | Sistema retorna o Usuário ao menu principal já autenticado                                        |
| 4   | Acessa pagina de conteudos    | Usuário navega até a seção de busca de conteúdos                                                  |
| 5   | Seleciona estrategia de busca | Usuário escolhe a estrategia (por categoria, data, número de acessos, relvancia)                  |
| 6   | Visualiza os resultados       | Sistem lista os conteúdos condizentes e Usuário escolhe um                                        |

### Ponto de Aplicação do Padrão

O _GoF_ Comportamental, usando o padrão _strategy_, foi aplicado no **passo 5** de ambos os fluxos visando modelar as possiveis estratégias de busca dentro dos seus respectivos contextos.

---

## Interface do Sistema (Imagens Reais)

![Tela 1 do fluxo](../assets/subequipe03-padroes/fluxograma/tela-1.png)

<center><strong>Legenda:</strong> Figura 1 - [PREENCHER: legenda da tela]</center>

![Tela 2 do fluxo](../assets/subequipe03-padroes/fluxograma/tela-2.png)

<center><strong>Legenda:</strong> Figura 2 - [PREENCHER: legenda da tela]</center>

![Tela 3 do fluxo](../assets/subequipe03-padroes/fluxograma/tela-3.png)

<center><strong>Legenda:</strong> Figura 3 - [PREENCHER: legenda da tela]</center>

---

## Histórico de Versionamento

| Nome do Membro                                  | Contribuição                                        | Data          | Commit                                                                                                                                                 |
| :---------------------------------------------- | :-------------------------------------------------- | :------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Gustavo Fornaciari](https://github.com/GUGOFO) | Inicio do Teamplate do trabalho                     | 06/10/2026    | [d4fb78d](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/tree/d4fb78d7c3e3a9508964200cb0516a8c2914c13a) |
| [Gabriel Mota](https://github.com/Gabro-MO)     | preenchimento inicial das informaçãos do fluxograma | [Preencher]() |
