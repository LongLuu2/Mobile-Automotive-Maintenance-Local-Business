import React, { useRef } from 'react'

export default function PhotoGallery() {
  const fileRef = useRef(null)

  const handleClick = (e) => {
    const target = e.currentTarget
    target._active = true
    if (fileRef.current) fileRef.current.click()
  }

  const handleChange = (ev) => {
    const file = ev.target.files && ev.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const active = document.querySelector('.photo.active')
      if (active) {
        active.style.backgroundImage = `url('${reader.result}')`
        active.classList.add('has-img')
        active.classList.remove('active')
      }
    }
    reader.readAsDataURL(file)
    ev.target.value = ''
  }

  const photos = [1, 2, 3, 4]

  return (
    <aside className="photos">
      <h2>Gallery</h2>
      <p className="hint">Click any tile to add a photo (optional)</p>
      <div className="photo-area" id="photoArea">
        {photos.map(n => (
          <div
            key={n}
            className={`photo p${n}`}
            data-id={n}
            onClick={(e) => {
              // add active class to clicked tile
              document.querySelectorAll('.photo').forEach(p => p.classList.remove('active'))
              e.currentTarget.classList.add('active')
              handleClick(e)
            }}
          />
        ))}
      </div>
      <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleChange} />
    </aside>
  )
}
