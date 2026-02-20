import { el } from '../utils/dom.js'

export default function Nav() {
  const logo = el('a', { href: '#home', class: 'nav-logo' }, ['Logo Holder'])

  const links = [
    ['Home', '#home'],
    ['About', '#about'],
    ['Contact', '#contact']
  ].map(([text, href]) => el('a', { href, class: 'nav-link' }, [text]))

  const navWrap = el('nav', { class: 'site-nav' }, [
    el('div', { class: 'nav-inner' }, [
      logo,
      el('div', { class: 'nav-links' }, links),
      el('a', { href: '#schedule', class: 'cta' }, ['Schedule Service'])
    ])
  ])

  return navWrap
}
