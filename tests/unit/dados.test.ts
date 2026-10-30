import { describe, expect, it } from 'vitest'
import { PAISES, SOBERANOS } from '../../src/data/paises'
import { BLOCOS } from '../../src/data/blocos'
import { EVENTOS, PERIODOS } from '../../src/data/timeline'

describe('dados do atlas', () => {
  it('tem 33 Estados soberanos', () => expect(SOBERANOS).toHaveLength(33))
  it('ids de países são únicos', () => expect(new Set(PAISES.map((p) => p.id)).size).toBe(PAISES.length))
  it('blocos só citam ids existentes', () => {
    const ids = new Set(PAISES.map((p) => p.id))
    for (const b of BLOCOS) for (const m of b.membros) expect(ids.has(m), `${b.id}:${m}`).toBe(true)
  })
  it('CELAC tem os 33 países', () => expect(BLOCOS.find((b) => b.id === 'celac')!.membros).toHaveLength(33))
  it('linha do tempo: 20 eventos em 5 períodos, dentro dos limites', () => {
    expect(EVENTOS).toHaveLength(20)
    expect(PERIODOS).toHaveLength(5)
    for (const e of EVENTOS) {
      const p = PERIODOS.find((x) => x.id === e.periodo)!
      expect(e.ano >= p.inicio && e.ano <= p.fim, e.id).toBe(true)
      expect(e.fontes.length, e.id).toBeGreaterThan(0)
      for (const id of e.paises) expect(PAISES.some((x) => x.id === id), `${e.id}:${id}`).toBe(true)
    }
  })
  it('eventos em ordem cronológica', () => {
    for (let i = 1; i < EVENTOS.length; i++) expect(EVENTOS[i].ano).toBeGreaterThanOrEqual(EVENTOS[i - 1].ano)
  })
})
