import './style.css'
import { initApp } from './App.js'

initApp()

if (import.meta.hot) {
  import.meta.hot.accept()
}
