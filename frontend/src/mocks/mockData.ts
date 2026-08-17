import type { Colaborador, Workshop } from "../types"

export const colaboradoresMock: Colaborador[] = [
  { id: 1, nome: "Ana Beatriz Lima" },
  { id: 2, nome: "Bruno Carvalho" },
  { id: 3, nome: "Camila Fernandes" },
  { id: 4, nome: "Diego Martins" },
  { id: 5, nome: "Eduarda Rocha" },
  { id: 6, nome: "Felipe Andrade" },
  { id: 7, nome: "Gabriela Souza" },
  { id: 8, nome: "Henrique Oliveira" },
  { id: 9, nome: "Isabela Nunes" },
  { id: 10, nome: "João Pedro Alves" },
  { id: 11, nome: "Karina Mendes" },
  { id: 12, nome: "Lucas Ribeiro" },
]

const c = (id: number) => colaboradoresMock.find((x) => x.id === id)!

export const workshopsMock: Workshop[] = [
  {
    id: 1,
    nome: "Introdução ao React e Componentização",
    dataRealizacao: "2026-02-10T09:00:00",
    descricao:
      "Workshop introdutório sobre a biblioteca React, cobrindo JSX, componentes funcionais, props e o fluxo de renderização. Ideal para quem está iniciando no ecossistema front-end da FAST Soluções.",
    colaboradoresPresentes: [c(1), c(2), c(3), c(4), c(7), c(10)],
  },
  {
    id: 2,
    nome: "TypeScript Avançado na Prática",
    dataRealizacao: "2026-02-24T14:00:00",
    descricao:
      "Aprofundamento em tipos genéricos, utility types, discriminated unions e boas práticas de tipagem para aplicações escaláveis. Muitos exercícios hands-on ao longo do encontro.",
    colaboradoresPresentes: [c(1), c(3), c(5), c(8), c(11)],
  },
  {
    id: 3,
    nome: "Clean Architecture no Front-end",
    dataRealizacao: "2026-03-15T10:30:00",
    descricao:
      "Discussão sobre separação de responsabilidades, camadas de serviço, hooks customizados e como manter o código sustentável em times grandes. Estudo de caso com o próprio rastreador de workshops.",
    colaboradoresPresentes: [c(2), c(4), c(6), c(9), c(10), c(12), c(1)],
  },
  {
    id: 4,
    nome: "Design Systems e Acessibilidade",
    dataRealizacao: "2026-03-28T09:00:00",
    descricao:
      "Como construir uma biblioteca de componentes acessível, com foco em ARIA, contraste, navegação por teclado e tokens de design reutilizáveis em toda a organização.",
    colaboradoresPresentes: [c(3), c(5), c(7), c(9)],
  },
  {
    id: 5,
    nome: "Testes Automatizados com Vitest",
    dataRealizacao: "2026-04-12T13:00:00",
    descricao:
      "Estratégias de testes unitários e de integração no front-end, mocking, cobertura e integração com pipelines de CI/CD para garantir qualidade contínua.",
    colaboradoresPresentes: [c(2), c(6), c(8), c(10), c(11), c(12)],
  },
  {
    id: 6,
    nome: "Performance e Otimização de Bundles",
    dataRealizacao: "2026-04-26T15:00:00",
    descricao:
      "Técnicas de code splitting, lazy loading, memoização e análise de bundles para entregar aplicações rápidas e leves aos usuários finais.",
    colaboradoresPresentes: [c(1), c(4), c(6), c(8)],
  },
  {
    id: 7,
    nome: "Gerenciamento de Estado Moderno",
    dataRealizacao: "2026-05-08T09:30:00",
    descricao:
      "Comparativo entre Context API, Zustand e React Query, com foco em quando usar cada abordagem para gerenciar estado local e servidor de forma eficiente.",
    colaboradoresPresentes: [c(3), c(5), c(7), c(9), c(11), c(2)],
  },
  {
    id: 8,
    nome: "Integração com APIs REST e GraphQL",
    dataRealizacao: "2026-05-22T14:00:00",
    descricao:
      "Boas práticas de consumo de APIs, tratamento de erros, cache, retries e camadas de abstração de serviços para desacoplar a UI da fonte de dados.",
    colaboradoresPresentes: [c(4), c(6), c(10), c(12)],
  },
]
