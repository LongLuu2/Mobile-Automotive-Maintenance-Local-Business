import { el, qs } from '../utils/dom.js'

export default function PhotoGallery() {
  const area = el('div', { class: 'photo-area', id: 'photoArea' })

  const photos = [
    el('div', { class: 'photo p1', 'data-id': '1' }),
    el('div', { class: 'photo p2', 'data-id': '2' }),
    el('div', { class: 'photo p3', 'data-id': '3' }),
    el('div', { class: 'photo p4', 'data-id': '4' })
  ]

  photos.forEach(p => area.appendChild(p))

  // hidden file input
  const fileInput = document.createElement('input')
  fileInput.type = 'file'
  fileInput.accept = 'image/*'
  fileInput.style.display = 'none'
  document.body.appendChild(fileInput)

  let active = null
  photos.forEach(photo => {
    photo.addEventListener('click', () => {
      active = photo
      fileInput.click()
    })
  })

  fileInput.addEventListener('change', (ev) => {
    const file = ev.target.files && ev.target.files[0]
    if (!file || !active) return
    const reader = new FileReader()
    reader.onload = () => {
      active.style.backgroundImage = `url('${reader.result}')`
      active.classList.add('has-img')
    }
    reader.readAsDataURL(file)
    fileInput.value = ''
    active = null
  })

  const wrap = el('aside', { class: 'photos' }, [
    el('h2', { html: 'Gallery' }),
    el('p', { class: 'hint', html: 'Click any tile to add a photo (optional)' }),
    area
  ])

  return wrap
}
