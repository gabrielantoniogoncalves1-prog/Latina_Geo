/** Cadastro dos 33 países da América Latina e Caribe (critério CEPAL/CELAC), territórios não soberanos e vizinhos de contexto. */
export type Tipo = 'sov' | 'dep' | 'ctx'

export interface Pais {
  id: string
  nome: string
  oficial?: string
  capital?: string
  moeda?: string
  tipo: Tipo
  /** Para territórios: quem administra. */
  administracao?: string
  nota?: string
}

export const PAISES: Pais[] = [
  { id: 'ARG', nome: 'Argentina', oficial: 'República Argentina', capital: 'Buenos Aires', moeda: 'Peso argentino', tipo: 'sov', nota: 'Reivindica soberania sobre as Ilhas Malvinas, administradas pelo Reino Unido.' },
  { id: 'ATG', nome: 'Antígua e Barbuda', oficial: 'Antígua e Barbuda', capital: "Saint John's", moeda: 'Dólar do Caribe Oriental', tipo: 'sov' },
  { id: 'BHS', nome: 'Bahamas', oficial: 'Comunidade das Bahamas', capital: 'Nassau', moeda: 'Dólar das Bahamas', tipo: 'sov' },
  { id: 'BRB', nome: 'Barbados', oficial: 'Barbados', capital: 'Bridgetown', moeda: 'Dólar de Barbados', tipo: 'sov' },
  { id: 'BLZ', nome: 'Belize', oficial: 'Belize', capital: 'Belmopan', moeda: 'Dólar de Belize', tipo: 'sov' },
  { id: 'BOL', nome: 'Bolívia', oficial: 'Estado Plurinacional da Bolívia', capital: 'Sucre (constitucional) e La Paz (sede do governo)', moeda: 'Boliviano', tipo: 'sov' },
  { id: 'BRA', nome: 'Brasil', oficial: 'República Federativa do Brasil', capital: 'Brasília', moeda: 'Real', tipo: 'sov' },
  { id: 'CHL', nome: 'Chile', oficial: 'República do Chile', capital: 'Santiago', moeda: 'Peso chileno', tipo: 'sov' },
  { id: 'COL', nome: 'Colômbia', oficial: 'República da Colômbia', capital: 'Bogotá', moeda: 'Peso colombiano', tipo: 'sov' },
  { id: 'CRI', nome: 'Costa Rica', oficial: 'República da Costa Rica', capital: 'San José', moeda: 'Colón costarriquenho', tipo: 'sov' },
  { id: 'CUB', nome: 'Cuba', oficial: 'República de Cuba', capital: 'Havana', moeda: 'Peso cubano', tipo: 'sov' },
  { id: 'DMA', nome: 'Dominica', oficial: 'Comunidade da Dominica', capital: 'Roseau', moeda: 'Dólar do Caribe Oriental', tipo: 'sov' },
  { id: 'ECU', nome: 'Equador', oficial: 'República do Equador', capital: 'Quito', moeda: 'Dólar dos EUA', tipo: 'sov' },
  { id: 'SLV', nome: 'El Salvador', oficial: 'República de El Salvador', capital: 'San Salvador', moeda: 'Dólar dos EUA', tipo: 'sov' },
  { id: 'GRD', nome: 'Granada', oficial: 'Granada', capital: "Saint George's", moeda: 'Dólar do Caribe Oriental', tipo: 'sov' },
  { id: 'GTM', nome: 'Guatemala', oficial: 'República da Guatemala', capital: 'Cidade da Guatemala', moeda: 'Quetzal', tipo: 'sov' },
  { id: 'GUY', nome: 'Guiana', oficial: 'República Cooperativa da Guiana', capital: 'Georgetown', moeda: 'Dólar guianense', tipo: 'sov', nota: 'A Venezuela reivindica a região do Essequibo, administrada pela Guiana; o caso está na Corte Internacional de Justiça.' },
  { id: 'HTI', nome: 'Haiti', oficial: 'República do Haiti', capital: 'Porto Príncipe', moeda: 'Gourde', tipo: 'sov' },
  { id: 'HND', nome: 'Honduras', oficial: 'República de Honduras', capital: 'Tegucigalpa', moeda: 'Lempira', tipo: 'sov' },
  { id: 'JAM', nome: 'Jamaica', oficial: 'Jamaica', capital: 'Kingston', moeda: 'Dólar jamaicano', tipo: 'sov' },
  { id: 'MEX', nome: 'México', oficial: 'Estados Unidos Mexicanos', capital: 'Cidade do México', moeda: 'Peso mexicano', tipo: 'sov' },
  { id: 'NIC', nome: 'Nicarágua', oficial: 'República da Nicarágua', capital: 'Manágua', moeda: 'Córdoba', tipo: 'sov' },
  { id: 'PAN', nome: 'Panamá', oficial: 'República do Panamá', capital: 'Cidade do Panamá', moeda: 'Balboa (circula o dólar dos EUA)', tipo: 'sov' },
  { id: 'PRY', nome: 'Paraguai', oficial: 'República do Paraguai', capital: 'Assunção', moeda: 'Guarani', tipo: 'sov' },
  { id: 'PER', nome: 'Peru', oficial: 'República do Peru', capital: 'Lima', moeda: 'Sol', tipo: 'sov' },
  { id: 'DOM', nome: 'República Dominicana', oficial: 'República Dominicana', capital: 'Santo Domingo', moeda: 'Peso dominicano', tipo: 'sov' },
  { id: 'KNA', nome: 'São Cristóvão e Névis', oficial: 'Federação de São Cristóvão e Névis', capital: 'Basseterre', moeda: 'Dólar do Caribe Oriental', tipo: 'sov' },
  { id: 'VCT', nome: 'São Vicente e Granadinas', oficial: 'São Vicente e Granadinas', capital: 'Kingstown', moeda: 'Dólar do Caribe Oriental', tipo: 'sov' },
  { id: 'LCA', nome: 'Santa Lúcia', oficial: 'Santa Lúcia', capital: 'Castries', moeda: 'Dólar do Caribe Oriental', tipo: 'sov' },
  { id: 'SUR', nome: 'Suriname', oficial: 'República do Suriname', capital: 'Paramaribo', moeda: 'Dólar surinamês', tipo: 'sov' },
  { id: 'TTO', nome: 'Trinidad e Tobago', oficial: 'República de Trinidad e Tobago', capital: 'Port of Spain', moeda: 'Dólar de Trinidad e Tobago', tipo: 'sov' },
  { id: 'URY', nome: 'Uruguai', oficial: 'República Oriental do Uruguai', capital: 'Montevidéu', moeda: 'Peso uruguaio', tipo: 'sov' },
  { id: 'VEN', nome: 'Venezuela', oficial: 'República Bolivariana da Venezuela', capital: 'Caracas', moeda: 'Bolívar', tipo: 'sov', nota: 'Reivindica a região do Essequibo, hoje administrada pela Guiana.' },

  { id: 'PRI', nome: 'Porto Rico', tipo: 'dep', administracao: 'Estados Unidos (território não incorporado)' },
  { id: 'VIR', nome: 'Ilhas Virgens Americanas', tipo: 'dep', administracao: 'Estados Unidos' },
  { id: 'AIA', nome: 'Anguila', tipo: 'dep', administracao: 'Reino Unido' },
  { id: 'CYM', nome: 'Ilhas Cayman', tipo: 'dep', administracao: 'Reino Unido' },
  { id: 'VGB', nome: 'Ilhas Virgens Britânicas', tipo: 'dep', administracao: 'Reino Unido' },
  { id: 'TCA', nome: 'Ilhas Turcas e Caicos', tipo: 'dep', administracao: 'Reino Unido' },
  { id: 'MSR', nome: 'Montserrat', tipo: 'dep', administracao: 'Reino Unido' },
  { id: 'FLK', nome: 'Ilhas Malvinas (Falkland)', tipo: 'dep', administracao: 'Reino Unido', nota: 'Território disputado: a Argentina reivindica a soberania. Ver nota na legenda do mapa.' },
  { id: 'ABW', nome: 'Aruba', tipo: 'dep', administracao: 'Reino dos Países Baixos (país constituinte)' },
  { id: 'CUW', nome: 'Curaçao', tipo: 'dep', administracao: 'Reino dos Países Baixos (país constituinte)' },
  { id: 'SXM', nome: 'Sint Maarten', tipo: 'dep', administracao: 'Reino dos Países Baixos (país constituinte)' },
  { id: 'BES', nome: 'Países Baixos Caribenhos', tipo: 'dep', administracao: 'Países Baixos (Bonaire, Santo Eustáquio e Saba)' },
  { id: 'MTQ', nome: 'Martinica', tipo: 'dep', administracao: 'França' },
  { id: 'GLP', nome: 'Guadalupe', tipo: 'dep', administracao: 'França' },
  { id: 'GUF', nome: 'Guiana Francesa', tipo: 'dep', administracao: 'França' },
  { id: 'MAF', nome: 'São Martinho (parte francesa)', tipo: 'dep', administracao: 'França' },
  { id: 'BLM', nome: 'São Bartolomeu', tipo: 'dep', administracao: 'França' },

  { id: 'USA', nome: 'Estados Unidos', tipo: 'ctx' },
  { id: 'CAN', nome: 'Canadá', tipo: 'ctx' },
  { id: 'BMU', nome: 'Bermudas', tipo: 'ctx', administracao: 'Reino Unido' },
  { id: 'SPM', nome: 'São Pedro e Miquelon', tipo: 'ctx', administracao: 'França' },
]

export const PAIS_POR_ID = new Map(PAISES.map((p) => [p.id, p]))
export const SOBERANOS = PAISES.filter((p) => p.tipo === 'sov')
export const nomeDe = (id: string) => PAIS_POR_ID.get(id)?.nome ?? id
