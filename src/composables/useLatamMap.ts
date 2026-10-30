import { ref, shallowRef } from 'vue'
import { feature, mesh } from 'topojson-client'
import { geoConicEqualArea, geoGraticule, geoPath, type GeoPermissibleObjects } from 'd3-geo'
import type { Topology } from 'topojson-specification'
import capitais from '@/data/capitais.json'
import { PAIS_POR_ID } from '@/data/paises'

export const W = 1000
export const H = 1080
export const FRAME = 16

export interface Unidade {
  id: string
  kind: 'sov' | 'dep' | 'ctx'
  name: string
  d: string
  /** Posição do rótulo (coordenadas do mapa) e área projetada do maior polígono. */
  anchor: [number, number]
  area: number
  bounds: [[number, number], [number, number]]
  geometry: GeoPermissibleObjects
}

export interface Capital {
  id: string
  nome: string
  x: number
  y: number
  pop: number
}

const NOME_CAPITAL: Record<string, string> = {
  'Mexico City': 'Cidade do México', 'Bogota': 'Bogotá', 'Panama City': 'Cidade do Panamá', 'Guatemala City': 'Cidade da Guatemala',
  'Havana': 'Havana', 'Port-au-Prince': 'Porto Príncipe', 'Asuncion': 'Assunção', 'Asunción': 'Assunção', 'Montevideo': 'Montevidéu',
  'Brasilia': 'Brasília', 'Managua': 'Manágua', 'Sucre': 'Sucre', 'La Paz': 'La Paz', "Saint George's": "Saint George's",
  "Saint John's": "Saint John's", 'Port-of-Spain': 'Port of Spain',
}

// Projeção cônica equivalente de Albers, ajustada ao recorte do México à Patagônia e ao Caribe.
export const projection = geoConicEqualArea().rotate([72, 0]).parallels([-28, 8]).center([0, -10])
projection.fitExtent(
  [[FRAME + 10, FRAME + 10], [W - FRAME - 10, H - FRAME - 10]],
  { type: 'MultiPoint', coordinates: [[-118.4, 32.7], [-34.6, 5], [-34.6, -9], [-67.5, -55.9], [-75.5, -52], [-95, 14], [-60, 27]] },
)
export const path = geoPath(projection)

export const mapa = shallowRef<{
  unidades: Unidade[]
  rios: string[]
  lagos: string[]
  malha: string
  costa: string
  graticula: string
  capitais: Capital[]
} | null>(null)
export const erro = ref<string | null>(null)
let promessa: Promise<void> | null = null

function maiorPoligono(geom: any): any {
  if (geom.type === 'Polygon') return geom
  let melhor = geom.coordinates[0]
  let areaMelhor = -1
  for (const poly of geom.coordinates) {
    const a = path.area({ type: 'Polygon', coordinates: poly })
    if (a > areaMelhor) { areaMelhor = a; melhor = poly }
  }
  return { type: 'Polygon', coordinates: melhor }
}

export function carregarMapa(): Promise<void> {
  if (promessa) return promessa
  promessa = fetch(`${import.meta.env.BASE_URL}maps/latam.topo.json`)
    .then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`)
      return r.json() as Promise<Topology>
    })
    .then((topo) => {
      const paises: any = feature(topo, topo.objects.countries as any)
      const unidades: Unidade[] = paises.features.map((f: any) => {
        const maior = maiorPoligono(f.geometry)
        const area = path.area(maior)
        const c = path.centroid(maior)
        return {
          id: String(f.id),
          kind: f.properties.kind,
          name: PAIS_POR_ID.get(String(f.id))?.nome ?? f.properties.name,
          d: path(f) ?? '',
          anchor: c as [number, number],
          area,
          bounds: path.bounds(f) as [[number, number], [number, number]],
          geometry: f,
        }
      })
      const rios: any = feature(topo, topo.objects.rivers as any)
      const lagos: any = feature(topo, topo.objects.lakes as any)
      const caps: Capital[] = (capitais as any[]).map((c) => {
        const [x, y] = projection([c.lon, c.lat]) ?? [0, 0]
        return { id: c.id, nome: NOME_CAPITAL[c.nome] ?? c.nome, x, y, pop: c.pop }
      })
      mapa.value = {
        unidades,
        rios: rios.features.map((f: any) => path(f) ?? '').filter(Boolean),
        lagos: lagos.features.map((f: any) => path(f) ?? '').filter(Boolean),
        malha: path(mesh(topo, topo.objects.countries as any, (a: any, b: any) => a !== b)) ?? '',
        costa: path(mesh(topo, topo.objects.countries as any, (a: any, b: any) => a === b)) ?? '',
        graticula: path(geoGraticule().step([10, 10])()) ?? '',
        capitais: caps,
      }
    })
    .catch((e) => {
      erro.value = 'Não foi possível carregar os dados do mapa.'
      promessa = null
      console.error(e)
    })
  return promessa
}

/** Caixas de enquadramento rápido (lon/lat: oeste, sul, leste, norte). */
export const VISTAS: { id: string; nome: string; caixa: [number, number, number, number] }[] = [
  { id: 'regiao', nome: 'Região', caixa: [-118.5, -56, -34, 33] },
  { id: 'mexico', nome: 'México', caixa: [-118.5, 14, -86, 33] },
  { id: 'centro', nome: 'América Central', caixa: [-93, 7, -77, 19] },
  { id: 'caribe', nome: 'Caribe', caixa: [-87, 9.5, -58.5, 28] },
  { id: 'sul', nome: 'América do Sul', caixa: [-82, -56, -34, 13] },
  { id: 'cone', nome: 'Cone Sul', caixa: [-76, -56, -48, -17] },
]
