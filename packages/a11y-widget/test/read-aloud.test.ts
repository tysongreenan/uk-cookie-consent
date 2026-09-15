// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { A11Y_TRANSLATIONS } from '../../../lib/accessibility/translations'
import { HOST_ID } from '../src/dom'
import { accessibleName, buildUtterance, readingUnit } from '../src/features/read-aloud'

const s = A11Y_TRANSLATIONS.en

describe('readingUnit', () => {
  it('prefers the paragraph inside a card-sized link, not the whole card', () => {
    document.body.innerHTML = `<a href="/x"><h2>Offer</h2><p id="blurb">Details here</p><img src="/a.png" alt="photo"></a>`
    const blurb = document.getElementById('blurb')!
    expect(readingUnit(blurb)).toBe(blurb)
    expect(readingUnit(document.querySelector('h2'))!.tagName).toBe('H2')
  })

  it('reads a plain text link as the link', () => {
    document.body.innerHTML = `<p>See <a id="t" href="/x">our prices</a> today.</p>`
    expect(readingUnit(document.getElementById('t'))!.id).toBe('t')
  })

  it('skips the widget host and aria-hidden chrome', () => {
    document.body.innerHTML = `<div id="${HOST_ID}"><p id="inside">Menu</p></div><p aria-hidden="true" id="ghost">Hidden</p><p id="ok">Visible</p>`
    expect(readingUnit(document.getElementById('inside'))).toBeNull()
    expect(readingUnit(document.getElementById('ghost'))).toBeNull()
    expect(readingUnit(document.getElementById('ok'))!.id).toBe('ok')
  })

  it('skips role=presentation and does not dump nested lists', () => {
    document.body.innerHTML = `<p role="presentation" id="deco">skip</p><ul><li id="item">Apples<ul><li>Granny Smith</li></ul></li></ul>`
    expect(readingUnit(document.getElementById('deco'))).toBeNull()
    expect(buildUtterance(document.getElementById('item')!, s)).toBe('Apples')
  })
})

describe('buildUtterance', () => {
  it('announces heading level and visible text, skipping aria-hidden bits', () => {
    document.body.innerHTML = `<h2>Our <span aria-hidden="true">★</span> services</h2>`
    expect(buildUtterance(document.querySelector('h2')!, s)).toBe('Heading 2. Our services')
  })

  it('uses the accessible name for icon buttons and labelled fields', () => {
    document.body.innerHTML = `
      <button id="search" aria-label="Search"></button>
      <label for="email">Email</label>
      <input id="email" value="a@b.c" required>
      <span id="hint">We'll never share this</span>
      <input id="bad" aria-invalid="true" aria-describedby="hint" value="x">
      <input id="opt" type="checkbox" checked>
      <label for="opt">Newsletter</label>`
    expect(buildUtterance(document.getElementById('search')!, s)).toBe('Button. Search')
    expect(buildUtterance(document.getElementById('email')!, s)).toMatch(/Email/)
    expect(buildUtterance(document.getElementById('email')!, s)).toMatch(/required/)
    expect(buildUtterance(document.getElementById('email')!, s)).toMatch(/a@b\.c/)
    expect(buildUtterance(document.getElementById('bad')!, s)).toMatch(/invalid/)
    expect(buildUtterance(document.getElementById('bad')!, s)).toMatch(/never share/)
    expect(buildUtterance(document.getElementById('opt')!, s)).toMatch(/checked/)
  })

  it('flags images with no alt and stays silent for decorative ones', () => {
    document.body.innerHTML = `<img id="missing" src="/a.png"><img id="deco" src="/b.png" alt=""><img id="ok" src="/c.png" alt="Clinic">`
    expect(buildUtterance(document.getElementById('missing')!, s)).toMatch(/No description/)
    expect(buildUtterance(document.getElementById('deco')!, s)).toBe('')
    expect(buildUtterance(document.getElementById('ok')!, s)).toBe('Image. Clinic')
  })

  it('uses figcaption when an image has no alt, and table headers for cells', () => {
    document.body.innerHTML = `
      <figure><img id="fig" src="/a.png"><figcaption>Clinic exterior</figcaption></figure>
      <table><thead><tr><th>Fee</th></tr></thead><tbody><tr><td id="cell">$80</td></tr></table>`
    expect(buildUtterance(document.getElementById('fig')!, s)).toMatch(/Clinic exterior/)
    expect(buildUtterance(document.getElementById('cell')!, s)).toMatch(/Fee/)
    expect(buildUtterance(document.getElementById('cell')!, s)).toMatch(/\$80/)
  })

  it('prefers aria-labelledby over inner text', () => {
    document.body.innerHTML = `<span id="n">Save</span><button aria-labelledby="n">✕</button>`
    expect(accessibleName(document.querySelector('button')!)).toBe('Save')
  })

  it('stays silent for an empty paragraph', () => {
    document.body.innerHTML = `<p id="empty">   </p>`
    expect(buildUtterance(document.getElementById('empty')!, s)).toBe('')
  })
})
