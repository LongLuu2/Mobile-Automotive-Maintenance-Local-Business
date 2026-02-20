import { el } from '../utils/dom.js'

export default function Contact() {
  const contact = el('address', { class: 'contact' }, [
    el('div', {}, [el('strong', {}, ['Phone:']), ' (781) 526-4673']),
    el('div', {}, [el('strong', {}, ['Email:']), ' stfleurceleste@yahoo.fr']),
  ])

  return el('div', { class: 'card' }, [el('h2', { html: 'Contact' }), contact])
}
