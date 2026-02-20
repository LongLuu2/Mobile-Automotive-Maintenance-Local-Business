import { el } from '../utils/dom.js'
import Brand from './Brand.js'
import Services from './Services.js'
import Hero from './Hero.js'

export default function Home() {
  const hero = Hero({
    title: 'SAINT MOBILE MAINTENANCE',
    subtitle: 'Certified Automotive Technician — We Come to You.',
    cta: 'Schedule Service'
  })

  const servicesCol = el('section', { class: 'info' }, [
    el('div', {}, [Services()])
  ])

  const why = el('aside', { class: 'why' }, [
    el('h2', { html: 'Why Choose Our Mobile Service' }),
    el('div', { class: 'card' }, [
      el('p', { html: 'Save money compared to dealer service — our labor rates are lower and we focus on what matters.' }),
      el('p', { html: 'Convenience — we come to your home or workplace so you don\'t lose a day waiting at the shop.' }),
      el('p', { html: 'We use high-quality, OEM-equivalent or better oils and parts to protect your vehicle.' })
    ])
  ])

  const container = el('div', {}, [hero, el('main', { class: 'page' }, [servicesCol, why])])
  return container
}
