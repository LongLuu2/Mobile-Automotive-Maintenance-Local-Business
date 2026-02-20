import Home from './components/Home.js'
import Nav from './components/Nav.js'
import About from './components/About.js'
import ContactPage from './components/ContactPage.js'

const root = document.getElementById('app')

function clearRoot() {
  root.innerHTML = ''
}

function render(route) {
  clearRoot()
  // always render nav
  root.appendChild(Nav())

  // content container
  const content = document.createElement('div')
  content.className = 'app-content'

  switch (route) {
    case '#home':
    case '':
    case undefined:
      content.appendChild(Home())
      break
    case '#about':
      content.appendChild(About())
      break
    case '#contact':
      content.appendChild(ContactPage())
      break
    default:
      content.appendChild(Home())
      break
  }

  root.appendChild(content)
}

export function initApp() {
  // initial render
  render(location.hash)

  // respond to hash changes
  window.addEventListener('hashchange', () => render(location.hash))
}
