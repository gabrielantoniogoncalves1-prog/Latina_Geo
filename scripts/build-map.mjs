// Gera public/maps/latam.topo.json a partir do Natural Earth 1:50m (domínio público).
// Uso: node scripts/build-map.mjs <pasta-com-geojson-do-natural-earth>
// Arquivos esperados: ne_50m_admin_0_map_units, ne_50m_rivers_lake_centerlines,
// ne_50m_lakes e ne_50m_populated_places_simple (.geojson).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { topology } from 'topojson-server'
import { quantize } from 'topojson-client'


const dir = process.argv[2] || '/tmp/ne'
const read = (n) => JSON.parse(readFileSync(`${dir}/${n}.geojson`, 'utf8'))

const BBOX = { w: -128, e: -28, s: -60, n: 34 } // América Latina e Caribe
const CTX = { w: -128, e: -28, s: -60, n: 52 } // contexto (EUA, Canadá)

const SOVEREIGN = ['ARG','ATG','BHS','BRB','BLZ','BOL','BRA','CHL','COL','CRI','CUB','DMA','ECU','SLV','GRD','GTM','GUY','HTI','HND','JAM','MEX','NIC','PAN','PRY','PER','DOM','KNA','VCT','LCA','SUR','TTO','URY','VEN']
const NONSOV = ['PRI','VIR','AIA','CYM','VGB','TCA','MSR','ABW','CUW','SXM','BES','MTQ','GLP','GUF','MAF','BLM','FLK']
const CONTEXT = ['USA','CAN','BMU','SPM']

const idOf = (p) => {
  if (p.GU_A3 === 'ACA' || p.GU_A3 === 'ACB') return 'ATG'
  if (p.GU_A3 === 'NLY') return 'BES'
  return p.GU_A3
}
const kindOf = (id) => SOVEREIGN.includes(id) ? 'sov' : NONSOV.includes(id) ? 'dep' : CONTEXT.includes(id) ? 'ctx' : null

const inBox = (ring, b) => ring.some(([x, y]) => x >= b.w && x <= b.e && y >= b.s && y <= b.n)
function cropPolys(geom, b) {
  if (geom.type === 'Polygon') return inBox(geom.coordinates[0], b) ? geom : null
  const polys = geom.coordinates.filter((p) => inBox(p[0], b))
  return polys.length ? { type: 'MultiPolygon', coordinates: polys } : null
}

// --- países / unidades ---
const units = new Map()
for (const f of read('ne_50m_admin_0_map_units').features) {
  const id = idOf(f.properties)
  const kind = kindOf(id)
  if (!kind) continue
  const geom = cropPolys(f.geometry, kind === 'ctx' ? CTX : BBOX)
  if (!geom) continue
  const polys = geom.type === 'Polygon' ? [geom.coordinates] : geom.coordinates
  if (!units.has(id)) units.set(id, { id, kind, name: f.properties.NAME, polys: [] })
  units.get(id).polys.push(...polys)
}
const countries = [...units.values()].map((u) => ({
  type: 'Feature',
  id: u.id,
  properties: { id: u.id, kind: u.kind, name: u.name },
  geometry: { type: 'MultiPolygon', coordinates: u.polys },
}))
const missing = [...SOVEREIGN, ...NONSOV].filter((i) => !units.has(i))
if (missing.length) console.warn('Sem geometria:', missing.join(', '))

// --- rios (nomeados, escala principal) e lagos ---
const rivers = read('ne_50m_rivers_lake_centerlines').features
  .filter((f) => f.properties.featurecla === 'River' && f.properties.scalerank <= 6)
  .map((f) => ({ ...f, geometry: f.geometry }))
  .filter((f) => {
    const cs = f.geometry.type === 'LineString' ? f.geometry.coordinates : f.geometry.coordinates.flat()
    return cs.some(([x, y]) => x >= BBOX.w && x <= BBOX.e && y >= BBOX.s && y <= BBOX.n)
  })
  .map((f) => ({ type: 'Feature', properties: { name: f.properties.name_pt || f.properties.name }, geometry: f.geometry }))

const lakes = read('ne_50m_lakes').features
  .filter((f) => {
    const g = f.geometry
    const ring = g.type === 'Polygon' ? g.coordinates[0] : g.coordinates[0][0]
    return inBox(ring, BBOX) && f.properties.scalerank <= 3
  })
  .map((f) => ({ type: 'Feature', properties: { name: f.properties.name }, geometry: f.geometry }))

// --- capitais ---
const capitals = read('ne_50m_populated_places_simple').features
  .filter((f) => f.properties.featurecla === 'Admin-0 capital' && SOVEREIGN.includes(f.properties.adm0_a3))
  .map((f) => ({
    id: f.properties.adm0_a3,
    nome: f.properties.nameascii,
    lon: f.properties.longitude,
    lat: f.properties.latitude,
    pop: f.properties.pop_max,
  }))
writeFileSync('scripts/.capitals.json', JSON.stringify(capitals, null, 1))

// --- topologia, simplificação leve e quantização ---
let topo = topology({
  countries: { type: 'FeatureCollection', features: countries },
  rivers: { type: 'FeatureCollection', features: rivers },
  lakes: { type: 'FeatureCollection', features: lakes },
})
// (sem simplificação adicional: o Natural Earth 1:50m já é generalizado)

topo = quantize(topo, 1e6)
mkdirSync('public/maps', { recursive: true })
const out = JSON.stringify(topo)
writeFileSync('public/maps/latam.topo.json', out)
console.log(`latam.topo.json: ${(out.length / 1024).toFixed(0)} KB, ${countries.length} unidades, ${rivers.length} rios, ${lakes.length} lagos, ${capitals.length} capitais`)
