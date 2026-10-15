/**
 * Dados simulados do histórico de exames laboratoriais do cidadão na RNDS (Rede Nacional de Dados em Saúde).
 * Modelados com base nos padrões do DATASUS e laudos reais do Meu SUS Digital para a Versão 2 (Giovani Coelho).
 */

export interface ExameMockItem {
  id: string;
  nomeExame: string;
  categoriaExame: string;
  laboratorio: string;
  metodologia: string;
  statusResultado: 'Liberado' | 'Em Análise' | 'Concluído';
  dataRegistro: string;
  responsavelTecnico: string;
  numeroSolicitacao: string;
  codigoCNES: string;
  laudoConclusivo?: string;
  parametros: {
    nome: string;
    resultado: string;
    unidadeMedida?: string;
    valorReferencia?: string;
    situacao?: 'NORMAL' | 'ALTERADO' | 'CRITICO';
  }[];
  [key: string]: unknown;
}

export const examesOficiaisGiovaniMock: ExameMockItem[] = [
  {
    id: 'exm-giovani-01',
    nomeExame: 'Hemograma Completo com Contagem de Plaquetas',
    categoriaExame: 'Hematologia',
    laboratorio: 'Laboratório Central de Saúde Pública do DF (LACEN/DF)',
    metodologia: 'Citometria de Fluxo e Espectrofotometria Automatizada',
    statusResultado: 'Liberado',
    dataRegistro: '2024-08-10T08:30:00Z',
    responsavelTecnico: 'Dra. Camila Vasconcelos (CRBM 4589/DF)',
    numeroSolicitacao: 'SOL-2024-88412',
    codigoCNES: '0010456',
    laudoConclusivo: 'Série eritrocítica e leucocitária dentro dos limites de referência. Sem atipias.',
    parametros: [
      { nome: 'Hemácias', resultado: '4.85', unidadeMedida: 'milhões/mm³', valorReferencia: '4.30 a 5.70', situacao: 'NORMAL' },
      { nome: 'Hemoglobina', resultado: '15.2', unidadeMedida: 'g/dL', valorReferencia: '13.5 a 17.5', situacao: 'NORMAL' },
      { nome: 'Hematócrito', resultado: '44.8', unidadeMedida: '%', valorReferencia: '39.0 a 50.0', situacao: 'NORMAL' },
      { nome: 'Leucócitos Totais', resultado: '6.420', unidadeMedida: '/mm³', valorReferencia: '4.000 a 10.000', situacao: 'NORMAL' },
      { nome: 'Plaquetas', resultado: '245.000', unidadeMedida: '/mm³', valorReferencia: '150.000 a 450.000', situacao: 'NORMAL' },
    ],
  },
  {
    id: 'exm-giovani-02',
    nomeExame: 'Glicemia de Jejum',
    categoriaExame: 'Bioquímica Clínica',
    laboratorio: 'Laboratório Regional de Taguatinga - SES/DF',
    metodologia: 'Enzimático Colorimétrico (Hexoquinase)',
    statusResultado: 'Liberado',
    dataRegistro: '2024-08-10T08:30:00Z',
    responsavelTecnico: 'Dr. Roberto Meireles (CRF 3102/DF)',
    numeroSolicitacao: 'SOL-2024-88413',
    codigoCNES: '0020789',
    laudoConclusivo: 'Nível glicêmico de jejum normal.',
    parametros: [
      { nome: 'Glicose em Jejum', resultado: '86', unidadeMedida: 'mg/dL', valorReferencia: '70 a 99 mg/dL', situacao: 'NORMAL' },
    ],
  },
  {
    id: 'exm-giovani-03',
    nomeExame: 'Perfil Lipídico / Lipidograma Completo',
    categoriaExame: 'Bioquímica Clínica',
    laboratorio: 'Laboratório Regional de Taguatinga - SES/DF',
    metodologia: 'Química Seca e Colorimetria Enzimática',
    statusResultado: 'Liberado',
    dataRegistro: '2024-05-22T07:45:00Z',
    responsavelTecnico: 'Dr. Roberto Meireles (CRF 3102/DF)',
    numeroSolicitacao: 'SOL-2024-51209',
    codigoCNES: '0020789',
    laudoConclusivo: 'Frações lipídicas desejáveis com triglicerídeos controlados.',
    parametros: [
      { nome: 'Colesterol Total', resultado: '172', unidadeMedida: 'mg/dL', valorReferencia: '< 190 mg/dL', situacao: 'NORMAL' },
      { nome: 'HDL - Colesterol', resultado: '52', unidadeMedida: 'mg/dL', valorReferencia: '> 40 mg/dL', situacao: 'NORMAL' },
      { nome: 'LDL - Colesterol', resultado: '98', unidadeMedida: 'mg/dL', valorReferencia: '< 130 mg/dL', situacao: 'NORMAL' },
      { nome: 'Triglicerídeos', resultado: '110', unidadeMedida: 'mg/dL', valorReferencia: '< 150 mg/dL', situacao: 'NORMAL' },
    ],
  },
  {
    id: 'exm-giovani-04',
    nomeExame: 'Painel Molecular RT-PCR para Vírus Respiratórios',
    categoriaExame: 'Biologia Molecular / Virologia',
    laboratorio: 'Laboratório Central de Saúde Pública do DF (LACEN/DF)',
    metodologia: 'RT-qPCR em Tempo Real (Painel Multiplex)',
    statusResultado: 'Liberado',
    dataRegistro: '2023-12-18T16:00:00Z',
    responsavelTecnico: 'Dr. Fernando Albuquerque (CRBM 1892/DF)',
    numeroSolicitacao: 'SOL-2023-99104',
    codigoCNES: '0010456',
    laudoConclusivo: 'Amostra NÃO REAGENTE para SARS-CoV-2 e Vírus Influenza A/B.',
    parametros: [
      { nome: 'SARS-CoV-2 (COVID-19)', resultado: 'NÃO DETECTADO', unidadeMedida: '-', valorReferencia: 'Não Detectado', situacao: 'NORMAL' },
      { nome: 'Vírus Influenza A', resultado: 'NÃO DETECTADO', unidadeMedida: '-', valorReferencia: 'Não Detectado', situacao: 'NORMAL' },
      { nome: 'Vírus Influenza B', resultado: 'NÃO DETECTADO', unidadeMedida: '-', valorReferencia: 'Não Detectado', situacao: 'NORMAL' },
    ],
  },
];

export const examesMock = examesOficiaisGiovaniMock;
