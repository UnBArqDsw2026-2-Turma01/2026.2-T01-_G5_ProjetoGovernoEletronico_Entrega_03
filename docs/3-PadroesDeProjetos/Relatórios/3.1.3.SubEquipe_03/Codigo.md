# Código | GoF Comportamental

## Localização

O mini-projeto independente desta subequipe ficará em `codigo/comportamental/`, fora de `docs/`. Ele será desenvolvido em React com Vite e TypeScript, com núcleo do padrão separado da interface.

## Mapeamento modelo-código

- **Padrão:** Strategy
- **Fluxo de origem:** Acesso à Rede de Saúde e Consulta de Conteúdo
- **Núcleo:** implementar os participantes do GoF sem dependência de React.
- **Domínio:** usar dados simulados do Meu SUS Digital, sem chamadas a APIs reais.
- **Interface:** componentes React que apresentam o cenário e acionam o núcleo.

## Testes

Documentar os testes unitários das classes do padrão e pelo menos um teste de interface com React Testing Library. Não declarar testes executados antes de registrar os resultados reais.

## Como executar

```bash
cd codigo/comportamental
npm install
npm run dev
npm test
npm run build
```

Registrar aqui os trechos relevantes, os resultados dos testes e o commit/PR correspondente. O código fonte permanece na pasta `codigo/`; esta página apenas documenta e aponta para ele.

## Histórico de Versionamento

| Nome do Membro | Contribuição | Data | Commit |
| :--- | :--- | :--- | :--- |
| [Gustavo Fornaciari](https://github.com/GUGOFO) | Teamplate mais detalhado | 14/10/2026 | [7c66f78](https://github.com/UnBArqDsw2026-2-Turma01/2026.2-T01-_G5_ProjetoGovernoEletronico_Entrega_03/tree/7c66f78dc795f080bc43dc01f094e8976462d5b8) |