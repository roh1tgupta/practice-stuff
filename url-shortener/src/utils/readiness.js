let ready = true
let inFlight = 0

export function setReady(value) {
  ready = !!value
}

export function isReady() {
  return ready
}

export function readinessHandler(req, res) {
  if (ready) {
    return res.status(200).json({ status: 'ready' })
  }
  return res.status(503).json({ status: 'not_ready' })
}

export function incInFlight() {
  inFlight += 1
}

export function decInFlight() {
  if (inFlight > 0) inFlight -= 1
}

export function getInFlight() {
  return inFlight
}
