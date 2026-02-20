import { el } from '../utils/dom.js'

export default function Services() {
  const items = [
    'Oil change',
    'Tire rotation',
    'Diagnostic (check engine light)',
    'Cabin & air filter',
    'Interior clean-up',
    'Snow removal'
  ]

  const ul = el('ul', { class: 'services' }, items.map(i => el('li', {}, [i])))
  const wrap = el('div', { class: 'card' }, [el('h2', { html: 'Services' }), ul])
  return wrap
}
