/** Linha do tempo: 20 eventos, 5 períodos. Conteúdo autoral; fontes listadas por instituição e título. */
export interface Periodo {
  id: number
  inicio: number
  fim: number
  nome: string
  resumo: string
}

export interface Fonte {
  instituicao: string
  titulo: string
  url?: string
}

export interface Evento {
  id: string
  ano: number
  data: string
  periodo: number
  titulo: string
  resumo: string
  contexto: string
  atores: string[]
  /** Países atuais usados como referência no mapa (incluindo EUA quando relevante). */
  paises: string[]
  interesses: string
  consequencias: string
  relacaoEUA: string
  /** Quando a historiografia diverge ou o evento ainda está em curso. */
  ressalva?: string
  fontes: Fonte[]
}

export const PERIODOS: Periodo[] = [
  { id: 1, inicio: 1820, fim: 1899, nome: 'Independências e expansão', resumo: 'Fim dos impérios ibéricos, Doutrina Monroe e a expansão territorial dos EUA.' },
  { id: 2, inicio: 1900, fim: 1945, nome: 'Intervenções e Boa Vizinhança', resumo: 'Canal do Panamá, ocupações militares e a mudança de método nos anos 1930.' },
  { id: 3, inicio: 1946, fim: 1991, nome: 'Guerra Fria', resumo: 'Anticomunismo, Cuba, ditaduras, guerras na América Central e crise da dívida.' },
  { id: 4, inicio: 1992, fim: 2009, nome: 'Reorganização pós-Guerra Fria', resumo: 'Livre-comércio, democratização e a disputa sobre o modelo de integração.' },
  { id: 5, inicio: 2010, fim: 2026, nome: 'Multipolaridade', resumo: 'Presença chinesa, tarifas e novas ações dos EUA na região.' },
]

export const EVENTOS: Evento[] = [
  {
    id: 'independencias', ano: 1821, data: '1810–1825', periodo: 1,
    titulo: 'Independências latino-americanas',
    resumo: 'Os impérios espanhol e português perdem quase todo o continente.',
    contexto: 'A invasão napoleônica da península Ibérica (1808) abalou a autoridade das metrópoles e abriu uma crise de legitimidade nas colônias. Guerras e processos políticos distintos levaram à independência da maior parte da região entre 1810 e 1825.',
    atores: ['Elites crioulas', 'Simón Bolívar', 'José de San Martín', 'Dom Pedro I', 'Reino Unido (comércio e crédito)'],
    paises: ['MEX', 'GTM', 'SLV', 'HND', 'NIC', 'CRI', 'COL', 'VEN', 'ECU', 'PER', 'BOL', 'CHL', 'ARG', 'PRY', 'URY', 'BRA', 'PAN'],
    interesses: 'Autonomia política e comercial das elites locais; fim do monopólio comercial das metrópoles; acesso ao mercado britânico.',
    consequencias: 'Surgem Estados novos, muitas vezes instáveis e com economias voltadas à exportação de matérias-primas. A América Central e a antiga Grã-Colômbia se fragmentam depois.',
    relacaoEUA: 'Os EUA reconhecem várias das novas repúblicas a partir de 1822, mas sem apoio militar direto. Eram ainda uma potência pequena diante do Reino Unido na região.',
    ressalva: 'As fronteiras atuais do mapa não existiam na época; os países são mostrados apenas como referência.',
    fontes: [
      { instituicao: 'Office of the Historian, U.S. Department of State', titulo: 'Milestones: Recognition of the Spanish American republics, 1822' },
      { instituicao: 'Bethell, Leslie (org.)', titulo: 'The Cambridge History of Latin America, vol. III (1985)' },
    ],
  },
  {
    id: 'monroe', ano: 1823, data: '2 de dezembro de 1823', periodo: 1,
    titulo: 'Doutrina Monroe',
    resumo: 'Os EUA declaram o hemisfério fora de novas colonizações europeias.',
    contexto: 'Temia-se que a Santa Aliança ajudasse a Espanha a reconquistar suas colônias. O Reino Unido, interessado no comércio livre, sugeriu uma declaração conjunta; os EUA preferiram falar sozinhos.',
    atores: ['James Monroe', 'John Quincy Adams', 'George Canning (Reino Unido)'],
    paises: ['USA', 'MEX', 'COL', 'ARG', 'CHL', 'PER', 'BRA'],
    interesses: 'Segurança continental, expansão comercial e afastamento das potências europeias do hemisfério.',
    consequencias: 'A mensagem ao Congresso ganhou peso no século XX, quando passou a ser invocada para justificar intervenções (Corolário Roosevelt) e, depois, para enquadrar a Guerra Fria na região.',
    relacaoEUA: 'No século XIX a doutrina tinha pouca força prática: quem a sustentava, de fato, era a Marinha britânica. Muitos governos latino-americanos a leram como proteção; outros, mais tarde, como pretexto para tutela.',
    fontes: [
      { instituicao: 'Office of the Historian, U.S. Department of State', titulo: 'Milestones: The Monroe Doctrine, 1823' },
      { instituicao: 'National Archives (EUA)', titulo: 'Monroe Doctrine (1823), documento de referência' },
    ],
  },
  {
    id: 'mexicano-americana', ano: 1846, data: '1846–1848', periodo: 1,
    titulo: 'Guerra Mexicano-Americana',
    resumo: 'O México perde cerca de metade do seu território para os EUA.',
    contexto: 'A anexação do Texas pelos EUA (1845) e a disputa sobre a fronteira do rio Grande levaram ao conflito. O ideal do "destino manifesto" alimentava a expansão para o oeste.',
    atores: ['Governo dos EUA (James K. Polk)', 'Governo mexicano', 'Colonos do Texas'],
    paises: ['MEX', 'USA'],
    interesses: 'Terras, acesso ao Pacífico (Califórnia) e consolidação da expansão continental dos EUA.',
    consequencias: 'Pelo Tratado de Guadalupe Hidalgo (1848), o México cedeu territórios que formam hoje Califórnia, Nevada, Utah e boa parte do Arizona e do Novo México, e os EUA pagaram uma indenização. A derrota marcou profundamente a política e a memória nacional mexicana.',
    relacaoEUA: 'É o caso mais direto de ganho territorial dos EUA à custa de um vizinho latino-americano.',
    fontes: [
      { instituicao: 'National Archives (EUA)', titulo: 'Treaty of Guadalupe Hidalgo (1848)' },
      { instituicao: 'Office of the Historian, U.S. Department of State', titulo: 'Milestones: The Mexican-American War, 1846–1848' },
    ],
  },
  {
    id: 'hispano-americana', ano: 1898, data: '1898', periodo: 1,
    titulo: 'Guerra Hispano-Americana',
    resumo: 'Os EUA derrotam a Espanha e passam a controlar Cuba e Porto Rico.',
    contexto: 'A luta pela independência de Cuba contra a Espanha se arrastava desde 1895. A explosão do encouraçado Maine, em Havana, e a pressão da opinião pública levaram os EUA à guerra.',
    atores: ['Estados Unidos', 'Espanha', 'Independentistas cubanos'],
    paises: ['CUB', 'PRI', 'USA'],
    interesses: 'Rotas marítimas do Caribe, mercado do açúcar, posições navais e projeção de poder além do continente.',
    consequencias: 'Pelo Tratado de Paris, a Espanha renunciou a Cuba e cedeu Porto Rico, Guam e Filipinas. Em Cuba, a Emenda Platt (1901) condicionou a independência ao direito de intervenção dos EUA e à base naval de Guantánamo. Porto Rico segue sob soberania dos EUA.',
    relacaoEUA: 'Marca a entrada dos EUA como potência extracontinental e inaugura o protetorado informal sobre Cuba.',
    fontes: [
      { instituicao: 'Office of the Historian, U.S. Department of State', titulo: 'Milestones: The Spanish-American War, 1898' },
      { instituicao: 'Library of Congress', titulo: 'The World of 1898: The Spanish-American War' },
    ],
  },
  {
    id: 'panama', ano: 1903, data: '3 de novembro de 1903', periodo: 2,
    titulo: 'Independência do Panamá e o Canal',
    resumo: 'O Panamá se separa da Colômbia com apoio naval dos EUA e cede a Zona do Canal.',
    contexto: 'O Senado colombiano rejeitou o tratado que permitiria aos EUA construir um canal. Em seguida, a elite panamenha organizou a separação, com navios de guerra dos EUA na costa impedindo a reação colombiana.',
    atores: ['Theodore Roosevelt', 'Philippe Bunau-Varilla', 'Elite panamenha', 'Governo colombiano'],
    paises: ['PAN', 'COL', 'USA'],
    interesses: 'Ligar o Atlântico ao Pacífico, com ganhos comerciais e militares para os EUA.',
    consequencias: 'O tratado Hay–Bunau-Varilla deu aos EUA uma zona perpétua ao longo do canal, inaugurado em 1914. A soberania panamenha sobre a área virou causa nacional até os tratados Torrijos–Carter (1977).',
    relacaoEUA: 'Exemplo de como interesses estratégicos moldaram a criação de um Estado e os termos de sua soberania.',
    fontes: [
      { instituicao: 'Office of the Historian, U.S. Department of State', titulo: 'Milestones: Building the Panama Canal, 1903–1914' },
      { instituicao: 'McCullough, David', titulo: 'The Path Between the Seas (1977)' },
    ],
  },
  {
    id: 'big-stick', ano: 1904, data: 'Dezembro de 1904', periodo: 2,
    titulo: 'Corolário Roosevelt e a política do Big Stick',
    resumo: 'Os EUA se atribuem um "poder de polícia internacional" no Caribe.',
    contexto: 'Países caribenhos endividados com credores europeus eram vistos como risco de intervenção externa. Roosevelt reinterpretou a Doutrina Monroe: se um Estado não cumprisse suas obrigações, os EUA poderiam intervir.',
    atores: ['Theodore Roosevelt', 'Fuzileiros navais dos EUA', 'Governos caribenhos e centro-americanos'],
    paises: ['DOM', 'CUB', 'HTI', 'NIC', 'PAN', 'USA'],
    interesses: 'Controlar a bacia do Caribe, proteger o canal e garantir o pagamento de dívidas e a ordem para investidores.',
    consequencias: 'Seguiram-se intervenções e ocupações: Cuba (1906–1909), Nicarágua (1912–1933, com interrupções), Haiti (1915–1934) e República Dominicana (1916–1924). A administração das alfândegas dominicanas passou aos EUA em 1905.',
    relacaoEUA: 'Período de intervenção militar mais intensa e direta na região.',
    fontes: [
      { instituicao: 'Office of the Historian, U.S. Department of State', titulo: 'Milestones: Roosevelt and the Monroe Doctrine, 1904–1905' },
      { instituicao: 'Smith, Peter H.', titulo: 'Talons of the Eagle: Latin America, the United States, and the World' },
    ],
  },
  {
    id: 'boa-vizinhanca', ano: 1933, data: '1933–1934', periodo: 2,
    titulo: 'Política da Boa Vizinhança',
    resumo: 'Os EUA trocam a intervenção direta por diplomacia, comércio e alianças.',
    contexto: 'A Grande Depressão e a antecipação da guerra na Europa tornaram caras e impopulares as ocupações. Na Conferência de Montevidéu (1933), os EUA aceitaram em princípio a não intervenção.',
    atores: ['Franklin D. Roosevelt', 'Cordell Hull', 'Governos latino-americanos'],
    paises: ['USA', 'HTI', 'CUB', 'URY', 'BRA', 'MEX'],
    interesses: 'Garantir apoio e matérias-primas diante da guerra, ampliar mercados e reduzir o custo político das ocupações.',
    consequencias: 'Retirada dos fuzileiros do Haiti (1934), fim da Emenda Platt (1934), acordos comerciais recíprocos e cooperação militar durante a Segunda Guerra.',
    relacaoEUA: 'Mudança de método, não de objetivo: os EUA mantiveram apoio a governos aliados, mesmo autoritários, como os de Somoza e Trujillo.',
    fontes: [
      { instituicao: 'Office of the Historian, U.S. Department of State', titulo: 'Milestones: The Good Neighbor Policy, 1933' },
      { instituicao: 'Sétima Conferência Internacional dos Estados Americanos', titulo: 'Convenção sobre Direitos e Deveres dos Estados (Montevidéu, 1933)' },
    ],
  },
  {
    id: 'oea', ano: 1948, data: '30 de abril de 1948', periodo: 3,
    titulo: 'Criação da OEA',
    resumo: 'A Carta de Bogotá institucionaliza a organização dos Estados americanos.',
    contexto: 'No início da Guerra Fria, os EUA buscaram alinhamento hemisférico. O Tratado do Rio (1947) criou a defesa coletiva; em Bogotá, em meio ao "Bogotazo", nasceu a OEA.',
    atores: ['Estados americanos', 'Departamento de Estado dos EUA'],
    paises: ['USA', 'COL', 'BRA', 'ARG', 'MEX', 'CHL', 'PER', 'VEN', 'CUB'],
    interesses: 'Para os EUA, alinhamento anticomunista; para os latino-americanos, regras de não intervenção e cooperação econômica.',
    consequencias: 'A Carta consagrou princípios como não intervenção e solução pacífica de controvérsias. Na prática, a OEA também serviu de foro para decisões patrocinadas pelos EUA, como a exclusão de Cuba (1962).',
    relacaoEUA: 'Instituição ambígua: limita juridicamente a intervenção e, ao mesmo tempo, dá legitimidade multilateral a posições dos EUA.',
    fontes: [
      { instituicao: 'Organização dos Estados Americanos', titulo: 'Carta da OEA e histórico da organização' },
      { instituicao: 'Office of the Historian, U.S. Department of State', titulo: 'Milestones: The Rio Treaty and the OAS, 1947–1948' },
    ],
  },
  {
    id: 'cuba-1959', ano: 1959, data: '1º de janeiro de 1959', periodo: 3,
    titulo: 'Revolução Cubana',
    resumo: 'Fidel Castro derruba Batista; Cuba rompe com os EUA e se aproxima da União Soviética.',
    contexto: 'O regime de Fulgencio Batista, aliado dos EUA, perdeu apoio interno. O governo revolucionário fez reforma agrária e nacionalizou empresas, inclusive de capital estadunidense.',
    atores: ['Fidel Castro', 'Che Guevara', 'Governo dos EUA', 'União Soviética'],
    paises: ['CUB', 'USA'],
    interesses: 'Soberania econômica e justiça social para o governo cubano; proteção de investimentos e contenção do comunismo para Washington.',
    consequencias: 'Os EUA romperam relações (1961) e adotaram embargo (1960–1962). Cuba foi excluída da OEA em 1962. Em 2014–2015 houve reaproximação, seguida de idas e vindas nas décadas seguintes.',
    relacaoEUA: 'Ponto de virada: a Guerra Fria chega ao hemisfério e a segurança regional passa a ser lida sobretudo pelo prisma do anticomunismo.',
    fontes: [
      { instituicao: 'Office of the Historian, U.S. Department of State', titulo: 'Foreign Relations of the United States, 1958–1960, Cuba' },
      { instituicao: 'Pérez, Louis A. Jr.', titulo: 'Cuba: Between Reform and Revolution' },
    ],
  },
  {
    id: 'baia-dos-porcos', ano: 1961, data: '17 de abril de 1961', periodo: 3,
    titulo: 'Invasão da Baía dos Porcos',
    resumo: 'Exilados cubanos treinados pela CIA tentam derrubar Castro e fracassam.',
    contexto: 'O plano foi preparado no governo Eisenhower e executado no de Kennedy. Cerca de 1.400 exilados desembarcaram na costa sul de Cuba esperando uma sublevação popular, que não ocorreu.',
    atores: ['CIA', 'Brigada 2506', 'John F. Kennedy', 'Forças cubanas'],
    paises: ['CUB', 'USA'],
    interesses: 'Derrubar o governo cubano antes que se consolidasse e evitar um aliado soviético a 150 km da Flórida.',
    consequencias: 'A derrota fortaleceu Castro, que declarou o caráter socialista da revolução. Ampliou a desconfiança em relação aos EUA e preparou o terreno para a crise de 1962.',
    relacaoEUA: 'Exemplo documentado de operação encoberta dos EUA contra um governo da região.',
    fontes: [
      { instituicao: 'National Security Archive (George Washington University)', titulo: 'Bay of Pigs: documentos desclassificados' },
      { instituicao: 'CIA', titulo: 'Inspector General’s Survey of the Cuban Operation (desclassificado)' },
    ],
  },
  {
    id: 'misseis', ano: 1962, data: '16 a 28 de outubro de 1962', periodo: 3,
    titulo: 'Crise dos Mísseis',
    resumo: 'Mísseis soviéticos em Cuba levam o mundo à beira de uma guerra nuclear.',
    contexto: 'Após a Baía dos Porcos e a instalação de mísseis americanos na Turquia, a União Soviética instalou mísseis nucleares em Cuba. Os EUA responderam com uma "quarentena" naval da ilha.',
    atores: ['John F. Kennedy', 'Nikita Khrushchov', 'Fidel Castro', 'Organização dos Estados Americanos'],
    paises: ['CUB', 'USA'],
    interesses: 'Equilíbrio nuclear entre as superpotências e, para Cuba, garantia de sobrevivência do regime.',
    consequencias: 'A URSS retirou os mísseis; os EUA se comprometeram publicamente a não invadir Cuba e, em acordo reservado, retiraram mísseis da Turquia. Cuba não participou das negociações finais.',
    relacaoEUA: 'Mostra que a região podia ser palco central da disputa global, e que Cuba era ao mesmo tempo objeto e agente.',
    fontes: [
      { instituicao: 'Office of the Historian, U.S. Department of State', titulo: 'Milestones: The Cuban Missile Crisis, October 1962' },
      { instituicao: 'John F. Kennedy Presidential Library', titulo: 'Cuban Missile Crisis (acervo)' },
    ],
  },
  {
    id: 'chile-1973', ano: 1973, data: '11 de setembro de 1973', periodo: 3,
    titulo: 'Golpe militar no Chile',
    resumo: 'Forças armadas derrubam Salvador Allende e instalam a ditadura de Pinochet.',
    contexto: 'Allende foi eleito em 1970 com um programa socialista, que incluiu a nacionalização do cobre. A economia entrou em crise e o país se polarizou.',
    atores: ['Salvador Allende', 'Augusto Pinochet', 'Forças armadas', 'Governo Nixon', 'CIA'],
    paises: ['CHL', 'USA'],
    interesses: 'Preservar investimentos e evitar um "novo Cuba", segundo o governo dos EUA; setores internos chilenos buscavam o fim do governo de Allende.',
    consequencias: 'Ditadura até 1990, com graves violações de direitos humanos e reformas de mercado. Entre 1975 e o início dos anos 1980, ditaduras do Cone Sul coordenaram a repressão na Operação Condor.',
    relacaoEUA: 'Documentos desclassificados mostram tentativas dos EUA de impedir a posse de Allende em 1970 e apoio à oposição depois. O grau de participação direta no golpe de 1973 segue debatido.',
    ressalva: 'A historiografia diverge sobre o peso do apoio dos EUA frente aos fatores internos do golpe.',
    fontes: [
      { instituicao: 'Senado dos EUA, Comissão Church', titulo: 'Covert Action in Chile, 1963–1973 (1975)' },
      { instituicao: 'Comisión Nacional de Verdad y Reconciliación (Chile)', titulo: 'Informe Rettig (1991)' },
    ],
  },
  {
    id: 'america-central', ano: 1979, data: '1979–1990', periodo: 3,
    titulo: 'Conflitos na América Central',
    resumo: 'Guerras civis e intervenção indireta dos EUA em Nicarágua, El Salvador e Guatemala.',
    contexto: 'Desigualdade extrema e regimes autoritários geraram guerrilhas. Em 1979, a Revolução Sandinista derrubou Somoza na Nicarágua. Os EUA do governo Reagan enxergaram o episódio como avanço soviético.',
    atores: ['Sandinistas', 'Contras', 'Forças armadas salvadorenhas e guatemaltecas', 'Governo Reagan', 'Contadora e Esquipulas II'],
    paises: ['NIC', 'SLV', 'GTM', 'HND', 'USA'],
    interesses: 'Contenção do que Washington chamava de expansão comunista e, para os atores locais, mudança social ou manutenção da ordem.',
    consequencias: 'Mais de uma centena de milhares de mortos na região. O caso Irã-Contras (1986) expôs o financiamento ilegal dos Contras. A Corte Internacional de Justiça decidiu em 1986 contra os EUA (Nicarágua v. EUA). Os acordos de paz vieram em 1987 (Esquipulas II), 1992 (El Salvador) e 1996 (Guatemala).',
    relacaoEUA: 'Apoio militar e financeiro a forças aliadas, com graves violações de direitos humanos documentadas por comissões da verdade, sobretudo por forças estatais.',
    fontes: [
      { instituicao: 'Corte Internacional de Justiça', titulo: 'Military and Paramilitary Activities in and against Nicaragua (1986)' },
      { instituicao: 'Comisión para el Esclarecimiento Histórico (Guatemala)', titulo: 'Guatemala: memoria del silencio (1999)' },
      { instituicao: 'Comissão da Verdade para El Salvador (ONU)', titulo: 'De la locura a la esperanza (1993)' },
    ],
  },
  {
    id: 'divida-1982', ano: 1982, data: 'Agosto de 1982', periodo: 3,
    titulo: 'Crise da dívida externa',
    resumo: 'O México suspende pagamentos e abre a "década perdida" na região.',
    contexto: 'Endividamento barato nos anos 1970, juros altos nos EUA a partir de 1979 e queda dos preços de commodities tornaram a dívida impagável. O México anunciou em 1982 que não poderia honrar os vencimentos.',
    atores: ['FMI', 'Bancos credores', 'Tesouro dos EUA', 'Governos latino-americanos'],
    paises: ['MEX', 'BRA', 'ARG', 'VEN', 'PER', 'CHL', 'BOL', 'ECU'],
    interesses: 'Evitar uma crise bancária global (credores) e recuperar o crescimento (devedores).',
    consequencias: 'Programas de ajuste, inflação e queda de renda. O Plano Brady (1989) trocou redução da dívida por reformas de mercado, em linha com o que John Williamson chamou de "Consenso de Washington".',
    relacaoEUA: 'Os EUA atuaram como credor, agente financeiro e formulador das condições do ajuste, via Tesouro e organismos multilaterais.',
    ressalva: 'Há debate entre economistas sobre o peso relativo dos fatores externos e das políticas internas na crise.',
    fontes: [
      { instituicao: 'Peterson Institute for International Economics', titulo: 'Williamson, J. What Washington Means by Policy Reform (1990)' },
      { instituicao: 'Banco Interamericano de Desenvolvimento', titulo: 'Thorp, R. Progress, Poverty and Exclusion (1998)' },
    ],
  },
  {
    id: 'panama-1989', ano: 1989, data: '20 de dezembro de 1989', periodo: 3,
    titulo: 'Invasão do Panamá',
    resumo: 'Os EUA invadem o Panamá e depõem o general Manuel Noriega.',
    contexto: 'Noriega, antes colaborador dos EUA, foi indiciado por tráfico de drogas em tribunais americanos e anulou eleições em 1989. Os tratados Torrijos–Carter (1977) já previam a devolução do canal ao Panamá até 1999.',
    atores: ['Governo George H. W. Bush', 'Manuel Noriega', 'Forças armadas dos EUA'],
    paises: ['PAN', 'USA'],
    interesses: 'Proteger cidadãos e instalações dos EUA, garantir a transição do canal e derrubar Noriega.',
    consequencias: 'Noriega foi preso e levado aos EUA. A Assembleia Geral da ONU deplorou a intervenção (Resolução 44/240). As estimativas de mortes civis variam bastante. O canal passou ao controle panamenho em 31 de dezembro de 1999.',
    relacaoEUA: 'Uma das últimas grandes intervenções diretas da Guerra Fria, feita já sem o argumento anticomunista central.',
    fontes: [
      { instituicao: 'Assembleia Geral da ONU', titulo: 'Resolução 44/240 (1989)' },
      { instituicao: 'Jimmy Carter Presidential Library', titulo: 'Panama Canal Treaties (1977)' },
    ],
  },
  {
    id: 'pos-guerra-fria', ano: 1992, data: '1990–1992', periodo: 4,
    titulo: 'Pós-Guerra Fria: paz e democratização',
    resumo: 'Fim das ditaduras e das guerras civis, e nova agenda de livre-comércio.',
    contexto: 'O colapso da União Soviética esvaziou a lógica anticomunista. O Chile voltou à democracia (1990), a Nicarágua teve eleições (1990), El Salvador assinou a paz (1992) e o Mercosul foi criado (1991).',
    atores: ['Governos democráticos', 'ONU (missões de paz)', 'Governo George H. W. Bush', 'Mercosul'],
    paises: ['CHL', 'NIC', 'SLV', 'ARG', 'BRA', 'PRY', 'URY', 'CUB'],
    interesses: 'Estabilidade e mercados abertos (EUA); reinserção econômica e autonomia (países latino-americanos).',
    consequencias: 'A Iniciativa para as Américas (1990) propôs comércio, investimento e alívio da dívida. Cuba perdeu o apoio soviético; os EUA endureceram o embargo (Lei Torricelli, 1992; Helms-Burton, 1996).',
    relacaoEUA: 'Redefinição: de segurança contra o comunismo para abertura econômica e democracia eleitoral.',
    fontes: [
      { instituicao: 'Organização das Nações Unidas', titulo: 'Acordos de Paz de Chapultepec (1992)' },
      { instituicao: 'Mercosul', titulo: 'Tratado de Assunção (1991)' },
    ],
  },
  {
    id: 'nafta', ano: 1994, data: '1º de janeiro de 1994', periodo: 4,
    titulo: 'NAFTA e a Cúpula de Miami',
    resumo: 'Livre-comércio entre México, EUA e Canadá, e o projeto de uma Área de Livre-Comércio das Américas.',
    contexto: 'O NAFTA entrou em vigor no mesmo dia do levante zapatista, em Chiapas. Em dezembro, a Cúpula das Américas em Miami lançou a negociação da ALCA, com meta para 2005.',
    atores: ['Governos do México, EUA e Canadá', 'Empresas', 'Movimentos sociais (zapatistas)'],
    paises: ['MEX', 'USA', 'CAN'],
    interesses: 'Integração produtiva e acesso ao mercado dos EUA (México); cadeias de suprimento e mão de obra (EUA); novos mercados (Canadá).',
    consequencias: 'Cresceu fortemente o comércio entre os três países. Os efeitos sobre emprego, salários e agricultura são avaliados de modo diferente por estudos. O acordo foi substituído pelo USMCA (T-MEC), em vigor desde 2020.',
    relacaoEUA: 'O México ficou mais integrado à economia dos EUA que qualquer outro país latino-americano, ganhando mercado e aumentando a dependência.',
    ressalva: 'Estudos divergem sobre os efeitos líquidos do NAFTA; este atlas não os resume em um único número.',
    fontes: [
      { instituicao: 'Office of the Historian, U.S. Department of State', titulo: 'Milestones: North American Free Trade Agreement' },
      { instituicao: 'Secretariado das Cúpulas das Américas (OEA)', titulo: 'Declaração de Princípios, Miami (1994)' },
    ],
  },
  {
    id: 'mar-del-plata', ano: 2005, data: '4 a 5 de novembro de 2005', periodo: 4,
    titulo: 'Rejeição à ALCA e integração sul-americana',
    resumo: 'Em Mar del Plata, a proposta de livre-comércio hemisférico fica sem consenso.',
    contexto: 'Governos de centro-esquerda eleitos na década de 2000 priorizaram a integração sul-americana. Surgiram a ALBA (2004), a UNASUL (tratado de 2008) e, depois, a CELAC (2011).',
    atores: ['Néstor Kirchner', 'Lula', 'Hugo Chávez', 'George W. Bush'],
    paises: ['ARG', 'BRA', 'URY', 'PRY', 'VEN', 'USA'],
    interesses: 'Autonomia de política econômica e comercial (Mercosul e Venezuela); abertura de mercados (EUA e países favoráveis).',
    consequencias: 'A ALCA não avançou. Os EUA passaram a negociar acordos bilaterais com Chile, América Central, Peru, Colômbia e Panamá.',
    relacaoEUA: 'Exemplo de capacidade de decisão regional: parte dos governos recusou o formato proposto pelos EUA.',
    fontes: [
      { instituicao: 'Secretariado das Cúpulas das Américas (OEA)', titulo: 'IV Cúpula das Américas, Mar del Plata (2005)' },
      { instituicao: 'União de Nações Sul-Americanas', titulo: 'Tratado Constitutivo da UNASUL (2008)' },
    ],
  },
  {
    id: 'china-2015', ano: 2015, data: '8 e 9 de janeiro de 2015', periodo: 5,
    titulo: 'A China como parceiro comercial: Fórum China–CELAC',
    resumo: 'Pequim institucionaliza sua relação com a região e se torna grande parceiro de vários países.',
    contexto: 'Com a demanda chinesa por soja, minérios e petróleo, a China passou a ser o principal parceiro comercial de países como Brasil (desde 2009) e Chile. O primeiro encontro ministerial China–CELAC ocorreu em Pequim.',
    atores: ['China', 'CELAC', 'Governos latino-americanos', 'Empresas chinesas e estatais'],
    paises: ['BRA', 'CHL', 'PER', 'ARG', 'URY', 'PAN', 'VEN', 'ECU'],
    interesses: 'Alimentos, energia e minerais para a China; mercados, investimento e financiamento para a região.',
    consequencias: 'Cresceram comércio, empréstimos e obras de infraestrutura. Em 2017 o Panamá aderiu à Iniciativa Cinturão e Rota e, em 2025, comunicou a saída.',
    relacaoEUA: 'Washington passou a tratar a presença chinesa como assunto de segurança. Para vários governos, a China ampliou opções e poder de barganha.',
    ressalva: 'A parceria é desigual: exportações de bens primários, importações de manufaturados. Concentração comercial não equivale, por si só, a perda de soberania.',
    fontes: [
      { instituicao: 'Ministério das Relações Exteriores da China', titulo: 'Fórum China–CELAC: documentos do primeiro encontro ministerial (2015)' },
      { instituicao: 'Comissão Econômica para a América Latina e o Caribe (CEPAL)', titulo: 'Relatórios sobre China e América Latina e Caribe' },
    ],
  },
  {
    id: 'recente', ano: 2025, data: '2025–2026', periodo: 5,
    titulo: 'Tarifas e ações militares dos EUA na região',
    resumo: 'Tarifas comerciais em 2025 e, em 3 de janeiro de 2026, a operação que capturou Nicolás Maduro.',
    contexto: 'Em abril de 2025, os EUA anunciaram uma tarifa-base de 10% para a maioria dos países. O Brasil teve uma sobretaxa que levou o total a 50% a partir de agosto de 2025. Em paralelo, os EUA ampliaram operações militares no Caribe contra embarcações acusadas de narcotráfico.',
    atores: ['Governo Trump', 'Governo Lula', 'Nicolás Maduro', 'Delcy Rodríguez', 'Conselho de Segurança da ONU'],
    paises: ['BRA', 'VEN', 'USA', 'COL', 'MEX'],
    interesses: 'Alegados: combate ao narcotráfico e rebalanceamento comercial (EUA). Para críticos, defesa de influência estratégica e de petróleo; para apoiadores, restauração da ordem democrática.',
    consequencias: 'Em 3 de janeiro de 2026, forças dos EUA capturaram Maduro e a esposa em Caracas; ele foi levado a Nova York e responde a acusações de narcotráfico, com julgamento marcado para 1º de junho de 2027. Delcy Rodríguez assumiu a presidência interina. Governos reagiram de formas opostas e o Conselho de Segurança da ONU se reuniu em 5 de janeiro.',
    relacaoEUA: 'O governo dos EUA afirmou que dirigiria a transição; a Venezuela e vários países da região classificaram a ação como violação de soberania, e outros saudaram a queda do governo.',
    ressalva: 'Evento recente e em desenvolvimento: confirmar datas e desdobramentos antes da apresentação.',
    fontes: [
      { instituicao: 'Poder360', titulo: 'Tarifas dos EUA entram em vigor em 3 dias (jul. 2025)', url: 'https://www.poder360.com.br/poder-internacional/tarifas-dos-eua-entram-em-vigor-em-3-dias-2/' },
      { instituicao: 'Poder360', titulo: 'Leia os infográficos do Poder360 sobre o ataque dos EUA à Venezuela (jan. 2026)', url: 'https://www.poder360.com.br/brasil/leia-os-infograficos-do-poder360-sobre-o-ataque-dos-eua-a-venezuela/' },
      { instituicao: 'Diario de Pernambuco', titulo: 'Justiça dos Estados Unidos marca julgamento de Maduro para junho de 2027 (jul. 2026)', url: 'https://www.diariodepernambuco.com.br/mundo/2026/07/11719335-justica-dos-estados-unidos-marca-julgamento-de-maduro-para-junho-de-2027.html' },
    ],
  },
]

export const EVENTO_POR_ID = new Map(EVENTOS.map((e) => [e.id, e]))
export const eventosDoPais = (id: string) => EVENTOS.filter((e) => e.paises.includes(id))
