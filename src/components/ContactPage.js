import { el } from '../utils/dom.js'

export default function ContactPage() {
  const card = el('section', { class: 'card contact-page' }, [
    el('h2', { html: 'Contact' }),
    el('address', { class: 'contact' }, [
      el('div', {}, [el('strong', {}, ['Phone:']), ' (781) 526-4673']),
      el('div', {}, [el('strong', {}, ['Email:']), ' stfleurceleste@yahoo.fr']),
      el('div', {}, [el('strong', {}, ['Address:']), ' High St, Everett, 02149'])
    ])
  ])

  const wrap = el('main', { class: 'page' }, [card])
  return wrap
}
