export function el(tag, props = {}, children = []) {
  const node = document.createElement(tag)
  for (const k in props) {
    if (k === 'class') node.className = props[k]
    else if (k === 'html') node.innerHTML = props[k]
    else node.setAttribute(k, props[k])
  }
  children.flat().forEach(c => {
    if (c === null || c === undefined) return
    if (typeof c === 'string' || typeof c === 'number') node.appendChild(document.createTextNode(String(c)))
    else node.appendChild(c)
  })
  return node
}

export function qs(sel, ctx = document) {
  return ctx.querySelector(sel)
}
