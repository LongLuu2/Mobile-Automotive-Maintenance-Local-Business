import { el } from '../utils/dom.js'

export default function Contact() {
  const contact = el('address', { class: 'contact' }, [
    el('div', {}, [el('strong', {}, ['Phone:']), ' (781) 526-4673']),
    el('div', {}, [el('strong', {}, ['Email:']), ' stfleurceleste@yahoo.fr']),
    el('div', {}, [el('strong', {}, ['Address:']), ' High St, Everett, 02149'])
  ])

  return el('div', { class: 'card' }, [el('h2', { html: 'Contact' }), contact])
}
