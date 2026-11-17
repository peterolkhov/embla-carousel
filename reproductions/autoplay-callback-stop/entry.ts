import EmblaCarousel from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'

const autoplay = Autoplay({ instant: true })
const api = EmblaCarousel(document.getElementById('embla'), {
  loop: true,
  resize: false,
  slideChanges: false
}, [autoplay])
const output = document.getElementById('log')!
let stopped = false
const events: object[] = []
const log = (event: string) => {
  const state = { event, selected: api.selectedSnap(), playing: autoplay.isPlaying() }
  events.push(state)
  output.textContent += JSON.stringify(state) + '\n'
}
api.on('select', () => {
  log('select')
  if (!stopped) {
    stopped = true
    autoplay.stop()
    log('after stop()')
  }
})
api.on('autoplay:play', () => log('autoplay:play'))
api.on('autoplay:stop', () => log('autoplay:stop'))
document.getElementById('start')!.addEventListener('click', () => {
  ;(document.getElementById('start') as HTMLButtonElement).disabled = true
  autoplay.play()
})
;(window as any).repro = { api, autoplay, events }
