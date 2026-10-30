import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const css = readFileSync(new URL('../../src/styles/tokens.css', import.meta.url), 'utf8')

/** Extrai as variáveis de cor de um bloco de seletor (ex.: ":root[data-theme='dark']"). */
function tokens(selectorStart: string): Record<string, string> {
  const start = css.indexOf(selectorStart)
  const open = css.indexOf('{', start)
  const close = css.indexOf('\n}', open)
  const out: Record<string, string> = {}
  for (const m of css.slice(open, close).matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{6})/g)) out[m[1]!] = m[2]!
  return out
}

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)) as [number, number, number]
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
export function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number]
  return (hi + 0.05) / (lo + 0.05)
}

const themes = {
  claro: tokens(":root,\n:root[data-theme='light']"),
  escuro: tokens(":root[data-theme='dark']"),
}

describe('contraste WCAG nos dois temas', () => {
  it('calcula a razão de contraste corretamente', () => {
    expect(contrast('#000000', '#ffffff')).toBeCloseTo(21, 0)
    expect(contrast('#777777', '#777777')).toBeCloseTo(1, 5)
  })

  for (const [nome, t] of Object.entries(themes)) {
    describe(`tema ${nome}`, () => {
      const fundos = ['bg', 'surface', 'elevated']

      for (const fundo of fundos) {
        for (const texto of ['ink', 'ink-2', 'ink-3', 'accent-text']) {
          it(`texto --${texto} sobre --${fundo} ≥ 4,5:1`, () => {
            expect(contrast(t[texto]!, t[fundo]!)).toBeGreaterThanOrEqual(4.5)
          })
        }
        for (let i = 1; i <= 8; i++) {
          it(`série --cat-${i} sobre --${fundo} ≥ 3:1`, () => {
            expect(contrast(t[`cat-${i}`]!, t[fundo]!)).toBeGreaterThanOrEqual(3)
          })
        }
      }

      it('texto do botão (--on-accent) sobre --accent-btn ≥ 4,5:1', () => {
        expect(contrast(t['on-accent']!, t['accent-btn']!)).toBeGreaterThanOrEqual(4.5)
      })
      it('anel de foco (--focus) sobre --bg ≥ 3:1', () => {
        expect(contrast(t['focus']!, t['bg']!)).toBeGreaterThanOrEqual(3)
      })
      it('rótulo do mapa sobre oceano e terra ≥ 4,5:1', () => {
        for (const f of ['map-ocean', 'map-land', 'map-nonsovereign']) {
          expect(contrast(t['map-label']!, t[f]!)).toBeGreaterThanOrEqual(4.5)
        }
      })
      it('o tema define todas as 7 etapas sequenciais e divergentes', () => {
        for (let i = 1; i <= 7; i++) {
          expect(t[`seq-${i}`]).toBeTruthy()
          expect(t[`div-${i}`]).toBeTruthy()
        }
      })
    })
  }
})
