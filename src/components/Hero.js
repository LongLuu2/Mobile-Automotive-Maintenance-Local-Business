import { el } from '../utils/dom.js'

export default function Hero({ title = 'Welcome', subtitle = '', cta = 'Schedule Service' } = {}) {
  const overlayText = el('div', { class: 'hero-content' }, [
    el('h1', { html: title }),
    subtitle ? el('p', { class: 'hero-sub', html: subtitle }) : null,
    el('a', { href: '#schedule', class: 'hero-cta' }, [cta])
  ])

  const hero = el('header', { class: 'hero' }, [overlayText])
  return hero
}
