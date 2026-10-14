# Código | GoF Criacional

## Localização

O mini-projeto independente desta subequipe ficará em `codigo/criacional/`, fora de `docs/`. Ele será desenvolvido em React com Vite e TypeScript, com núcleo do padrão separado da interface.

## Mapeamento modelo-código

- **Padrão:** Factory Method
- **Fluxo de origem:** Autenticação, Consentimento (LGPD) e Busca de Histórico Clínico
- **Núcleo:** implementar os participantes do GoF sem dependência de React.
- **Domínio:** usar dados simulados do Meu SUS Digital, sem chamadas a APIs reais.
- **Interface:** componentes React que apresentam o cenário e acionam o núcleo.

## Testes

Documentar os testes unitários das classes do padrão e pelo menos um teste de interface com React Testing Library. Não declarar testes executados antes de registrar os resultados reais.

## Como executar

```bash
cd codigo/criacional
npm install
npm run dev
npm test
npm run build
```

Registrar aqui os trechos relevantes, os resultados dos testes e o commit/PR correspondente. O código fonte permanece na pasta `codigo/`; esta página apenas documenta e aponta para ele.
