import { el } from '../utils/dom.js'

export default function Brand() {
  const logo = el('div', { class: 'logo' }, [''])
  // intentionally minimal — owner name removed per request
  return el('div', { class: 'brand' }, [logo])
}
