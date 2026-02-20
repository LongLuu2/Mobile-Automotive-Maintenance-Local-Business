import { el } from '../utils/dom.js'

export default function About() {
  const wrap = el('main', { class: 'page about-page' }, [
    el('section', { class: 'card' }, [
      el('h2', { html: 'About' }),
      el('p', { html: 'Automotive Technician' }),
      el('p', { html: 'Saint‑Fleur provides mobile automotive services including oil changes, diagnostics, and filter replacements. Qualified technician with experience servicing a wide range of vehicles.' })
    ])
  ])

  return wrap
}
