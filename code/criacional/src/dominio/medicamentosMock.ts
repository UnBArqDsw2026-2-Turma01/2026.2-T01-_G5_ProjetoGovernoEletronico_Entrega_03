/**
 * Dados simulados de dispensações e prescrições de medicamentos do cidadão na RNDS (Rede Nacional de Dados em Saúde).
 * Modelados com base nos programas de assistência farmacêutica do SUS e do Farmácia Popular para a Versão 3.
 */

export interface MedicamentoMockItem {
  id: string;
  tipoReceita: 'Dispensação' | 'Prescrição' | 'Receituário';
  programaSaude: string;
  estabelecimento: string;
  profissionalPrescritor: string;
  registroProfissional: string;
  codigoCNES: string;
  numeroReceita: string;
  statusDispensacao: 'Dispensado' | 'Pendente' | 'Cancelado' | 'Parcial';
  dataRegistro: string;
  observacoes?: string;
  itens: {
    nomeMedicamento: string;
    principioAtivo: string;
    concentracao: string;
    formaFarmaceutica: string;
    posologia: string;
    quantidade: number;
    unidade: string;
    viaAdministracao?: string;
    duracaoTratamento?: string;
  }[];
  [key: string]: unknown;
}

export const medicamentosOficiaisMock: MedicamentoMockItem[] = [
  {
    id: 'med-usr-01',
    tipoReceita: 'Dispensação',
    programaSaude: 'Farmácia Popular do Brasil',
    estabelecimento: 'Drogaria Raia - Asa Sul, Brasília/DF',
    profissionalPrescritor: 'Dr. Marcos Antônio Silva',
    registroProfissional: 'CRM 18.452/DF',
    codigoCNES: '0061234',
    numeroReceita: 'REC-2024-110589',
    statusDispensacao: 'Dispensado',
    dataRegistro: '2024-09-15T14:30:00Z',
    observacoes: 'Uso contínuo conforme orientação médica. Paciente hipertenso estágio 1.',
    itens: [
      {
        nomeMedicamento: 'Losartana Potássica 50mg',
        principioAtivo: 'Losartana Potássica',
        concentracao: '50mg',
        formaFarmaceutica: 'Comprimido',
        posologia: '1 comprimido, 1x ao dia, pela manhã',
        quantidade: 30,
        unidade: 'comprimidos',
        viaAdministracao: 'Oral',
        duracaoTratamento: '30 dias (uso contínuo)',
      },
      {
        nomeMedicamento: 'Hidroclorotiazida 25mg',
        principioAtivo: 'Hidroclorotiazida',
        concentracao: '25mg',
        formaFarmaceutica: 'Comprimido',
        posologia: '1 comprimido, 1x ao dia, pela manhã',
        quantidade: 30,
        unidade: 'comprimidos',
        viaAdministracao: 'Oral',
        duracaoTratamento: '30 dias (uso contínuo)',
      },
    ],
  },
  {
    id: 'med-usr-02',
    tipoReceita: 'Dispensação',
    programaSaude: 'Farmácia Popular do Brasil',
    estabelecimento: 'Drogasil - Taguatinga Norte, Brasília/DF',
    profissionalPrescritor: 'Dra. Ana Beatriz Ferreira',
    registroProfissional: 'CRM 22.108/DF',
    codigoCNES: '0065678',
    numeroReceita: 'REC-2024-094301',
    statusDispensacao: 'Dispensado',
    dataRegistro: '2024-07-20T10:15:00Z',
    observacoes: 'Diabetes Mellitus tipo 2 controlada. Monitoramento de glicemia capilar recomendado.',
    itens: [
      {
        nomeMedicamento: 'Metformina 850mg',
        principioAtivo: 'Cloridrato de Metformina',
        concentracao: '850mg',
        formaFarmaceutica: 'Comprimido revestido',
        posologia: '1 comprimido, 2x ao dia, após almoço e jantar',
        quantidade: 60,
        unidade: 'comprimidos',
        viaAdministracao: 'Oral',
        duracaoTratamento: '30 dias (uso contínuo)',
      },
    ],
  },
  {
    id: 'med-usr-03',
    tipoReceita: 'Dispensação',
    programaSaude: 'Componente Básico da Assistência Farmacêutica (CBAF)',
    estabelecimento: 'UBS 02 Asa Norte - Brasília/DF',
    profissionalPrescritor: 'Dr. Carlos Eduardo Ribeiro',
    registroProfissional: 'CRM 15.330/DF',
    codigoCNES: '0010456',
    numeroReceita: 'REC-2024-078120',
    statusDispensacao: 'Dispensado',
    dataRegistro: '2024-06-05T09:00:00Z',
    observacoes: 'Prescrição para tratamento de dislipidemia. Controle laboratorial em 90 dias.',
    itens: [
      {
        nomeMedicamento: 'Sinvastatina 20mg',
        principioAtivo: 'Sinvastatina',
        concentracao: '20mg',
        formaFarmaceutica: 'Comprimido',
        posologia: '1 comprimido, 1x ao dia, à noite',
        quantidade: 30,
        unidade: 'comprimidos',
        viaAdministracao: 'Oral',
        duracaoTratamento: '30 dias (uso contínuo)',
      },
    ],
  },
  {
    id: 'med-usr-04',
    tipoReceita: 'Prescrição',
    programaSaude: 'Programa Nacional de Controle da Asma (PNCA)',
    estabelecimento: 'Centro de Saúde Samambaia/DF',
    profissionalPrescritor: 'Dra. Juliana Ramos Costa',
    registroProfissional: 'CRM 19.877/DF',
    codigoCNES: '0049988',
    numeroReceita: 'REC-2024-055890',
    statusDispensacao: 'Dispensado',
    dataRegistro: '2024-03-10T16:45:00Z',
    observacoes: 'Asma persistente leve. Orientar técnica inalatória correta. Reavaliação em 3 meses.',
    itens: [
      {
        nomeMedicamento: 'Budesonida 200mcg/dose (Aerossol)',
        principioAtivo: 'Budesonida',
        concentracao: '200mcg/dose',
        formaFarmaceutica: 'Aerossol bucal',
        posologia: '1 jato, 2x ao dia (manhã e noite)',
        quantidade: 1,
        unidade: 'frasco (200 doses)',
        viaAdministracao: 'Inalatória',
        duracaoTratamento: '90 dias',
      },
      {
        nomeMedicamento: 'Salbutamol 100mcg/dose (Aerossol de Resgate)',
        principioAtivo: 'Sulfato de Salbutamol',
        concentracao: '100mcg/dose',
        formaFarmaceutica: 'Aerossol bucal',
        posologia: '1 a 2 jatos, se necessário (S.O.S.)',
        quantidade: 1,
        unidade: 'frasco (200 doses)',
        viaAdministracao: 'Inalatória',
        duracaoTratamento: 'Conforme necessidade',
      },
    ],
  },
];

export const medicamentosMock = medicamentosOficiaisMock;
