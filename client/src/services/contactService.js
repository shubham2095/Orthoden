import { api } from './api'

// Sends the appointment request form to the server, which emails the clinic.
export function sendContactMessage(form) {
  return api('/contact', { method: 'POST', body: form })
}
