/**
 * composição organizada para o recorte didático deste atlas; a participação
 * institucional pode variar ao longo do tempo.
 */
export interface Bloco {
  id: string
  sigla: string
  nome: string
  descricao: string
  membros: string[]
  /** Observações de status que alteram a leitura da lista (suspensões, saídas). */
  status?: Record<string, string>
  site: string
}

export const BLOCOS: Bloco[] = [
  {
    id: 'mercosul', sigla: 'Mercosul', nome: 'Mercado Comum do Sul',
    descricao: 'União aduaneira criada pelo Tratado de Assunção (1991).',
    membros: ['ARG', 'BRA', 'PRY', 'URY', 'BOL', 'VEN'],
    status: { VEN: 'Suspensa desde 2016', BOL: 'Adesão plena em 2024' },
    site: 'mercosur.int',
  },
  {
    id: 'can', sigla: 'CAN', nome: 'Comunidade Andina',
    descricao: 'Bloco andino de integração política e comercial.',
    membros: ['BOL', 'COL', 'ECU', 'PER'],
    site: 'comunidadandina.org',
  },
  {
    id: 'alianca', sigla: 'Aliança do Pacífico', nome: 'Aliança do Pacífico',
    descricao: 'Iniciativa de integração com foco na abertura ao Pacífico.',
    membros: ['CHL', 'COL', 'MEX', 'PER'],
    site: 'alianzapacifico.net',
  },
  {
    id: 'sica', sigla: 'SICA', nome: 'Sistema da Integração Centro-Americana',
    descricao: 'Organização de integração da América Central.',
    membros: ['BLZ', 'CRI', 'SLV', 'GTM', 'HND', 'NIC', 'PAN', 'DOM'],
    site: 'sica.int',
  },
  {
    id: 'caricom', sigla: 'CARICOM', nome: 'Comunidade do Caribe',
    descricao: 'Comunidade de Estados caribenhos de integração econômica e política.',
    membros: ['ATG', 'BHS', 'BRB', 'BLZ', 'DMA', 'GRD', 'GUY', 'HTI', 'JAM', 'KNA', 'LCA', 'VCT', 'SUR', 'TTO', 'MSR'],
    status: { BHS: 'Membro da Comunidade, fora do mercado comum', MSR: 'Território britânico, membro' },
    site: 'caricom.org',
  },
  {
    id: 'celac', sigla: 'CELAC', nome: 'Comunidade de Estados Latino-Americanos e Caribenhos',
    descricao: 'Foro regional de concertação política dos 33 países, sem EUA e Canadá.',
    membros: ['ARG','ATG','BHS','BRB','BLZ','BOL','BRA','CHL','COL','CRI','CUB','DMA','ECU','SLV','GRD','GTM','GUY','HTI','HND','JAM','MEX','NIC','PAN','PRY','PER','DOM','KNA','VCT','LCA','SUR','TTO','URY','VEN'],
    site: 'celacinternational.org',
  },
  {
    id: 'oea', sigla: 'OEA', nome: 'Organização dos Estados Americanos',
    descricao: 'Organização hemisférica criada em 1948, em Bogotá; inclui os EUA e o Canadá.',
    membros: ['ARG','ATG','BHS','BRB','BLZ','BOL','BRA','CHL','COL','CRI','CUB','DMA','ECU','SLV','GRD','GTM','GUY','HTI','HND','JAM','MEX','PAN','PRY','PER','DOM','KNA','VCT','LCA','SUR','TTO','URY','VEN','USA','CAN'],
    status: {
      CUB: 'Sem participação desde a exclusão de 1962',
      VEN: 'Status contestado desde a saída anunciada em 2017',
      NIC: 'Deixou a organização em 2023 (não listada)',
    },
    site: 'oas.org',
  },
]
export const BLOCO_POR_ID = new Map(BLOCOS.map((b) => [b.id, b]))
export const blocosDe = (id: string) => BLOCOS.filter((b) => b.membros.includes(id))
