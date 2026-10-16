/**
 * Dados simulados do histórico de vacinação do cidadão na RNDS (Rede Nacional de Dados em Saúde).
 * Extraídos com fidelidade do perfil do Meu SUS Digital.
 */

export interface VacinaMockItem {
  id: string;
  imunobiologico: string;
  dose: string;
  dataRegistro: string;
  fabricante: string;
  lote: string;
  estabelecimento: string;
  descricaoPrevisao?: string;
  vacinador?: string;
  codigoCNES?: string;
  [key: string]: unknown;
}

export const vacinasOficiaisMock: VacinaMockItem[] = [
  {
    id: 'vac-usr-01',
    imunobiologico: 'vacina influenza trivalente',
    dose: 'Única',
    dataRegistro: '2024-07-17T10:00:00Z',
    fabricante: 'INSTITUTO BUTANTAN',
    lote: '240189',
    estabelecimento: 'UBS 02 Asa Sul - Brasília/DF',
    vacinador: 'Téc. Lucas Silva',
    codigoCNES: '0010456',
  },
  {
    id: 'vac-usr-02',
    imunobiologico: 'vacina covid-19-inativada, Sinovac/Butantan (Coronavac)',
    dose: 'Reforço',
    dataRegistro: '2022-06-01T14:30:00Z',
    fabricante: 'SINOVAC/BUTANTAN',
    lote: '210123',
    estabelecimento: 'Drive-Thru Parque da Cidade - Brasília/DF',
    vacinador: 'Enf. Maria Oliveira',
    codigoCNES: '0020789',
  },
  {
    id: 'vac-usr-03',
    imunobiologico: 'vacina covid-19-RNAm, Pfizer (Comirnaty)',
    dose: '2ª Dose',
    dataRegistro: '2021-11-12T11:15:00Z',
    fabricante: 'PFIZER',
    lote: 'FL4222',
    estabelecimento: 'UBS 01 Asa Norte - Brasília/DF',
    vacinador: 'Enf. Juliana Ramos',
    codigoCNES: '0031122',
  },
  {
    id: 'vac-usr-04',
    imunobiologico: 'vacina covid-19-RNAm, Pfizer (Comirnaty)',
    dose: '1ª Dose',
    dataRegistro: '2021-09-15T09:00:00Z',
    fabricante: 'PFIZER',
    lote: 'FF5112',
    estabelecimento: 'UBS 01 Asa Norte - Brasília/DF',
    vacinador: 'Enf. Juliana Ramos',
    codigoCNES: '0031122',
  },
  {
    id: 'vac-usr-05',
    imunobiologico: 'vacina HPV quadrivalente',
    dose: '2ª Dose',
    dataRegistro: '2018-07-16T15:20:00Z',
    fabricante: 'BUTANTAN',
    lote: 'H0091',
    estabelecimento: 'Centro de Saúde Samambaia/DF',
    vacinador: 'Téc. Vanessa Dias',
    codigoCNES: '0049988',
  },
  {
    id: 'vac-usr-06',
    imunobiologico: 'vacina HPV quadrivalente',
    dose: '1ª Dose',
    dataRegistro: '2017-12-26T10:45:00Z',
    fabricante: 'MERCK',
    lote: 'M9902',
    estabelecimento: 'Centro de Saúde Samambaia/DF',
    vacinador: 'Téc. Vanessa Dias',
    codigoCNES: '0049988',
  },
  {
    id: 'vac-usr-07',
    imunobiologico: 'vacina meningo C',
    dose: 'Única',
    dataRegistro: '2017-12-26T10:50:00Z',
    fabricante: 'NOVARTIS',
    lote: 'N1234',
    estabelecimento: 'Centro de Saúde Samambaia/DF',
    vacinador: 'Téc. Vanessa Dias',
    codigoCNES: '0049988',
  },
];

// Mocks por público para a aba de histórico/cartilha
export const vacinasMockPorPublico = {
  crianca: vacinasOficiaisMock.slice(4),
  adolescente: vacinasOficiaisMock.slice(4),
  adulto: vacinasOficiaisMock.slice(0, 4),
  gestante: [vacinasOficiaisMock[0]],
};

export const vacinasMock = vacinasOficiaisMock;
