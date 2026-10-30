export interface NavItem {
  to: string
  label: string
}

/** Navegação principal: Início, Mapa, História, Fontes. */
export const NAV_ITEMS: NavItem[] = [
  { to: '/', label: 'Início' },
  { to: '/mapa', label: 'Mapa' },
  { to: '/historia', label: 'História' },
  { to: '/fontes', label: 'Fontes' },
]
